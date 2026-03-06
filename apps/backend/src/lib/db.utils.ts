import { DocumentClient as DC } from 'aws-sdk/lib/dynamodb/document_client';
import { dateUtils } from '../../../web-ui/src/shared';

const MAX_BATCH_ITEMS = 25;

function chunkArray<T>(myArray: Array<T>, chunkSize: number): Array<Array<T>> {
  const results: Array<Array<T>> = [];
  while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
  }
  return results;
}

export const generateBatchWrite = <T>(tableName: string, items: Array<T>): Array<DC.BatchWriteItemInput> =>
  chunkArray(items.map((Item) => ({PutRequest: {Item}})), MAX_BATCH_ITEMS)
    .map(
      (requests) => ({RequestItems: {[tableName]: requests}}),
    );

export function stringToTimeStamp(str: string): number {
  return dateUtils.getUnixTime(dateUtils.getDate(str));
}

export function timeStampToISOString(timeStamp: number): string {
  return dateUtils.timestampToIsoString(timeStamp);
}
