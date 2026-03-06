import { dateUtils } from '../../../web-ui/src/shared';
import { config } from '../lib/config';
import { db } from '../lib/db-client';
import { queryDays, queryProducts, scanUsers } from '../lib/util';
import { DBDayInfo, DBProduct, NutrientName } from '../types';

const dateRange = 90; // calculating data from last 3 months
const popularAmount = 6;

function getMainNutrient(product: DBProduct): NutrientName {
    const {protein, fat, carbs} = product;
    if ((protein > fat) && (protein >= carbs)) {
      return 'protein';
    } else if ((carbs > fat) && (carbs > protein)) {
      return 'carbs';
    } else {
      return 'fat';
    }
  }

type Usage = Map<string, number>;

interface UsageInfoItem {
  id: string;
  usage: number;
  mainNut: NutrientName;
}

async function getUsedProducts(userId: string): Promise<Usage> {
  const result: Usage = new Map();

  const days: Array<DBDayInfo> = (await queryDays(db, {
    userId,
    from: dateUtils.getUnixTime(dateUtils.subtractDays(dateUtils.getCurrentDate(), dateRange)),
    to: dateUtils.getCurrentUnixTime(),
  }));

  days.forEach((day) => {
    const ids = day.consumed.reduce((acc, {productId}) => acc.add(productId), new Set<string>());
    ids.forEach((id) => result.set(id, (result.get(id) || 0) + 1));
  });

  return result;
}

export async function calcPopularProducts(): Promise<Array<string>> {

  const products = await queryProducts(db, {userId: config.rootUserName, since: 0});
  const prodMainNutMap = products.reduce(
    (acc, prod) => acc.set(prod.id, getMainNutrient(prod)),
    new Map<string, NutrientName>(),
  );

  const users = await scanUsers(db);
  const usageByUser = await Promise.all(users.map(({userId}) => getUsedProducts(userId)));

  const globalUsage: Usage = new Map();
  usageByUser.forEach((usage) => usage.forEach((value, id) =>
    globalUsage.set(id, (globalUsage.get(id) || 0) + value),
  ));

  const usageInfos: Array<UsageInfoItem> = Array.from(globalUsage.entries())
    .map(([id, usage]) => ({id, usage, mainNut: prodMainNutMap.get(id) as NutrientName}))
    .sort((a, b) => b.usage - a.usage);

  const byNut = (nutName: NutrientName) =>
    ({mainNut}: UsageInfoItem) => mainNut === nutName;

  const getId = ({id}: UsageInfoItem) => id;

  return [
    ...usageInfos.filter(byNut('protein')).slice(0, popularAmount).map(getId),
    ...usageInfos.filter(byNut('carbs')).slice(0, popularAmount).map(getId),
    ...usageInfos.filter(byNut('fat')).slice(0, popularAmount).map(getId),
  ];
}
