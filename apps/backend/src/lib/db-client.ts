import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { BatchWriteItemOutput } from 'aws-sdk/clients/dynamodb';
import { DocumentClient as DC } from 'aws-sdk/lib/dynamodb/document_client';

export class DBClient {
  public documentClient: DC;

  constructor(options: DC.DocumentClientOptions & DynamoDB.Types.ClientConfiguration) {
      this.documentClient = new DynamoDB.DocumentClient({...options, convertEmptyValues: true});
  }

  public query<T>(params: DC.QueryInput): Promise<Array<T>> {
    return new Promise((resolve, reject) => this.documentClient.query(
      params,
      (err, data) => err ? reject(err) : resolve((data.Items as Array<T>) || []),
    ));
  }

  public scan<T>(params: DC.ScanInput): Promise<Array<T>> {
    return new Promise((resolve, reject) => this.documentClient.scan(
      params,
      (err, data) => err ? reject(err) : resolve((data.Items as Array<T>) || []),
    ));
  }

  public put<T>(params: DC.PutItemInput): Promise<T> {
    return new Promise((resolve, reject) => this.documentClient.put(
      params,
      (err, data) => err ? reject(err) : resolve(params.Item as T),
    ));
  }

  public get<T>(params: DC.GetItemInput): Promise<T|undefined> {
    return new Promise((resolve, reject) => this.documentClient.get(
      params,
      (err, data) => err ? reject(err) : resolve(data.Item as T),
    ));
  }

  public delete(params: DC.DeleteItemInput): Promise<void> {
    return new Promise((resolve, reject) => this.documentClient.delete(
      params,
      (err, data) => err ? reject(err) : resolve(),
    ));
  }

  public batchWrite(params: DC.BatchWriteItemInput): Promise<BatchWriteItemOutput> {
    return new Promise((resolve, reject) => this.documentClient.batchWrite(
      params,
      (err, data) => err ? reject(err) : resolve(data),
    ));
  }
}

const {IS_OFFLINE, LOCAL_DB_URL} = process.env;

const dbOptions = IS_OFFLINE
  ? {region: 'localhost', endpoint: LOCAL_DB_URL}
  : {};
export const db = new DBClient(dbOptions);
