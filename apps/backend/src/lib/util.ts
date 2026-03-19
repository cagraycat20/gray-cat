import { DBDayInfo, DBFeedback, DBProduct, DBSystemItem, DBUser } from '../types';
import { DBClient } from './db-client';

export const {
  USERS_TABLE = '',
  DAYS_TABLE = '',
  PRODUCTS_TABLE = '',
  SYSTEM_TABLE = '',
} = process.env;

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message?: string,
  ) {
    super(message);
  }
}

export const putUser = (db: DBClient, user: DBUser) =>
  db.put<DBUser>({
    TableName: USERS_TABLE,
    Item: user,
  });

export const getUser = (db: DBClient, keys: { userId: string }) =>
  db.get<DBUser>({
    TableName: USERS_TABLE,
    Key: keys,
  });

export const scanUsers = (db: DBClient) =>
  db.scan<DBUser>({
    TableName: USERS_TABLE,
  });

export const queryDays = (db: DBClient, keys: { userId: string; from: number; to: number }) =>
  db.query<DBDayInfo>({
    TableName: DAYS_TABLE,
    ExpressionAttributeNames: {
      '#date': 'date',
    },
    ExpressionAttributeValues: {
      ':userId': keys.userId,
      ':from': keys.from,
      ':to': keys.to,
    },
    KeyConditionExpression: 'userId = :userId AND #date BETWEEN :from AND :to',
  });

export const putDay = (db: DBClient, day: DBDayInfo) =>
  db.put<DBDayInfo>({
    TableName: DAYS_TABLE,
    Item: day,
  });

export const getDay = (db: DBClient, keys: { userId: string; date: number }) =>
  db.get<DBDayInfo>({
    TableName: DAYS_TABLE,
    Key: { userId: keys.userId, date: keys.date },
  });

export const deleteDay = (db: DBClient, keys: { userId: string; date: number }) =>
  db.delete({
    TableName: DAYS_TABLE,
    Key: { userId: keys.userId, date: keys.date },
  });

export const queryProducts = (db: DBClient, keys: { userId: string; since: number }) =>
  db.query<DBProduct>({
    TableName: PRODUCTS_TABLE,
    ExpressionAttributeValues: {
      ':userId': keys.userId,
      ':since': keys.since ? keys.since : undefined,
    },
    KeyConditionExpression: 'userId = :userId',
    FilterExpression: keys.since ? 'lastModified >= :since' : undefined,
  });

export const putProduct = (db: DBClient, product: DBProduct) =>
  db.put<DBProduct>({
    TableName: PRODUCTS_TABLE,
    Item: product,
  });

export const getProduct = (db: DBClient, keys: { userId: string; id: string }) =>
  db.get<DBProduct>({
    TableName: PRODUCTS_TABLE,
    Key: keys,
  });

export const deleteProduct = (db: DBClient, keys: { userId: string; id: string }) =>
  db.delete({
    TableName: PRODUCTS_TABLE,
    Key: keys,
  });

export const putSystemItem = <T>(db: DBClient, systemItem: DBSystemItem<T>) =>
  db.put<DBSystemItem<T>>({
    TableName: SYSTEM_TABLE,
    Item: systemItem,
  });

export const getSystemItem = <T>(db: DBClient, keys: { id: string }) =>
  db.get<DBSystemItem<T>>({
    TableName: SYSTEM_TABLE,
    Key: keys,
  });
