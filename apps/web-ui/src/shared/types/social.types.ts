import { Product } from '..';
import { Consumed } from '../../types';

export interface SocialPage {
  date: string;
  image: string;
  imageSize: {
    w: number,
    h: number,
  };
  pageUrl: string;
  products: Array<{
    product: Product,
    time: number;
    productWeight: number;
    collageImages: Array<string>;
  }>;
}

export interface ConsumedProductsSummarySocialPage {
  dateFrom: Date;
  dateTo: Date;
  image: string;
  imageSize: {
    w: number,
    h: number,
  };
  pageUrl: string;
  totalConsumed: Consumed;
  products: Array<{
    product: Product,
    productWeight: number;
    collageImages: Array<string>;
  }>;
}
