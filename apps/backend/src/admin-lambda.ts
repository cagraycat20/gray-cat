import { Handler, ScheduledHandler } from 'aws-lambda';
import { config } from './lib/config';
import { db } from './lib/db-client';
import { generateBatchWrite } from './lib/db.utils';
import { createHandler } from './lib/lambda-handler';
import { PRODUCTS_TABLE, putSystemItem, putUser, scanUsers } from './lib/util';
import { products } from './mocks/products.mock';
import { users } from './mocks/users.mock';
import { calcPopularProducts } from './tasks/calc-popular-products.task';
import { copyTestData } from './tasks/copy-test-data';
import { generateMissingThumbnails } from './tasks/generate-missing-thumbnails';
import { User } from './types';

interface OperationResult {
  message: string;
}

export const initHandler = createHandler<OperationResult>({}, {
  get: async () => {
    const existingUsers = await scanUsers(db);
    if (existingUsers.length > 0) {
      return {message: 'Already initialized'}; // If we already have users we skip init
    }

    await Promise.all(
      generateBatchWrite(PRODUCTS_TABLE, products.map((prod) => ({userId: config.rootUserName, ...prod}))).map(
        (batchParams) => new Promise(
          (resolve, reject) => db.documentClient.batchWrite(
            batchParams,  // todo handling of unprocessed items
            (error, data) => resolve(error || data),
          ),
        ),
      ),
    );

    await Promise.all(users.map((user) => putUser(db, user)));
    return {message: 'Ok'};
  },
});

export const calcPopularHandler = createHandler<Array<string>>({required: true, adminOnly: true}, {
  get: async () => {
    const value = await calcPopularProducts();
    await putSystemItem(db, {id: 'popular_products', value});
    return value;
  },
});

export const calcPopularScheduledHandler: ScheduledHandler = async (event) => {
  const value = await calcPopularProducts();
  await putSystemItem(db, {id: 'popular_products', value});
};

export const generateMissingThumbnailsHandler: Handler<{}, string> = async (event) => {
  const value = await generateMissingThumbnails();
  return `Generatated thumbnails: ${value}`;
};

export const copyTestDataHandler: Handler<{}, string> = async (event) => {
  const value = await copyTestData();
  return `Products copied: ${value[0]}, days copied: ${value[1]}`;
};

export const adminGetUsers = createHandler<User>({required: true, adminOnly: true}, {
  get: async () => scanUsers(db),
});
