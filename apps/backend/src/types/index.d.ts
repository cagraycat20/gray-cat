import { DayInfo, Feedback, LogEvent, Product, RemoteSettings, User, UsiUnion } from '../../../web-ui/src/shared/types';
export * from '../../../web-ui/src/shared/types';
export { ExtTheme, WithStylesAndTheme } from '../../../web-ui/src/shared/theme';

export type Diff<T extends string, U extends string> =
  ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
// @ts-ignore
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export interface DBUser extends User {
}

export interface DBDayInfo extends Omit<DayInfo, 'date'> {
  date: number;
  userId: string;
}

export interface DBProduct extends Product {
  userId: string;
}

export type SystemId = 'popular_products';

export interface DBSystemItem<T> {
  id: SystemId;
  value: T;
}

export interface DBFeedback extends Feedback {
}

export interface DBLogEvent extends LogEvent {
  expirationDate: number;
}

export interface ProductPageData {
  product: Product;
  similarProducts: Array<Product>;
}

export interface ProductListPageData {
  pageNum: integer;
  pageSize: integer;
  pageCount: integer;
  searchString: string;
  products: Array<Product>;
}

export interface CaloriesFromNutrients {
  protein: number;
  fat: number;
  carbs: number;
}
