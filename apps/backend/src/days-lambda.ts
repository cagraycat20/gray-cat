import { isFreshOrEqual } from '../../web-ui/src/shared/utils/merge.utils';
import { db, DBClient } from './lib/db-client';
import { stringToTimeStamp, timeStampToISOString } from './lib/db.utils';
import { createHandler } from './lib/lambda-handler';
import { getDay, HttpError, putDay, queryDays } from './lib/util';
import { DayInfo, DBDayInfo } from './types';

function convertToDB(day: DayInfo, userId: string): DBDayInfo {
  const {date: dayStr, ...rest} = day;
  return {
    date: stringToTimeStamp(dayStr),
    userId,
    ...rest,
  };
}

function convertFromDB(day: DBDayInfo): DayInfo {
  const {date: timeStamp, userId, ...rest} = day;
  return {
    date: timeStampToISOString(timeStamp),
    ...rest,
  };
}

async function putDayInfo(dbClient: DBClient, userId: string, day: DayInfo): Promise<DayInfo> {
  const newDynamoDay = convertToDB(day, userId);
  const oldDynamoDay = await getDay(dbClient, {userId, date: stringToTimeStamp(day.date)});

  let result: DBDayInfo;
  if (oldDynamoDay && !isFreshOrEqual(newDynamoDay, oldDynamoDay)) {
    result = oldDynamoDay;
  } else {
    result = await putDay(dbClient, newDynamoDay);
  }

  return convertFromDB(result);
}

export const handler = createHandler<DayInfo>({required: true}, {
  get: async ({userId, query: {from, to}}) => {
    if (!from || !to) {
      throw new HttpError(400, 'from/to params are not specified');
    }

    const days = await queryDays(db, {
      userId,
      from: stringToTimeStamp(from),
      to: stringToTimeStamp(to),
    });

    return days.map(convertFromDB);
  },

  put: async ({userId, body}) => {
    if (!Array.isArray(body)) {
      throw new HttpError(400, 'Expected array of days');
    }

    return Promise.all(
      (body as Array<DayInfo>).map((day) => putDayInfo(db, userId, day)),
    );
  },
});
