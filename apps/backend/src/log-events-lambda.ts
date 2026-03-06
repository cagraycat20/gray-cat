// import { config } from './lib/config';
import { dateUtils } from '../../web-ui/src/shared';
import { db } from './lib/db-client';
import { createHandler } from './lib/lambda-handler';
import { putLogEvent, scanLogEvents } from './lib/util';
import { DBLogEvent, LogEvent } from './types';

const TTL = 90 * 86400; // 90 days

export const logEventsHandler = createHandler<LogEvent>({required: true, adminOnly: true}, {
  get: async () => {
    return await scanLogEvents(db);
  },
});

export const leHandler = createHandler<LogEvent>({}, {
  get: async ({ query }) => {
    if (query.id && query.ct && query.ev) {

    const logEvent: DBLogEvent = {
      id: query.id,
      creationTime: Number.parseInt(query.ct, 10),
      expirationDate: dateUtils.getCurrentUnixTime() + TTL,
      event: query.ev,
    };

    await putLogEvent(db, logEvent);
  }
    return [];
  },
});
