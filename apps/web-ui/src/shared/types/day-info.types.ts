import { ProductWeight } from './product.types';

export interface ConsumedProduct extends ProductWeight {
  time?: number; // in minutes
}

export interface DayInfo {
  date: string;
  consumed: Array<ConsumedProduct>;
  consumedHistory?: Array<Array<ConsumedProduct>>;
  dirty?: boolean;
  lastModified?: number;
}
