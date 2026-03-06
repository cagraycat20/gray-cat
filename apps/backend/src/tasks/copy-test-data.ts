import { db } from '../lib/db-client';
import { getUser, putDay, putProduct, putUser, queryDays, queryProducts } from '../lib/util';

const fromUser = 'thebiktop@gmail.com';
const toUser = 'evgsil@gmail.com';

export async function copyTestData(): Promise<[number, number]> {

  const products = (await queryProducts(db, { userId: fromUser, since: 0 }));

  const productsCopied = (await Promise.all(products.map(async (prod) => {
    prod.userId = toUser;
    prod.lastModified = Date.now();
    return putProduct(db, prod);
  }))).length;

  const days = (await queryDays(db, { userId: fromUser, from: 0, to: 2000000000 }));

  const daysCopied = (await Promise.all(days.map(async (day) => {
    day.userId = toUser;
    day.lastModified = Date.now();
    return putDay(db, day);
  }))).length;

  const user = await getUser(db, {userId: fromUser});
  if (user) {
    user.userId = toUser;
    await putUser(db, user);
  }
  return [productsCopied, daysCopied];
}
