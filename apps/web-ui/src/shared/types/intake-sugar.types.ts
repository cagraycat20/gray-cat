import { SortOption } from './sort-selector.types';

export interface ConsumedProduct {
  id: string;
  name: string;
  image?: string;
  thumb?: string;
  weight: number;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export const PRODUCT_NAME = 'name';
export const PROTEIN = 'protein';
export const FAT = 'fat';
export const CARBS = 'carbs';
export const CALORIES = 'calories';
export const SUGAR = 'sugar';
export type SortBy = typeof PRODUCT_NAME | typeof PROTEIN | typeof FAT | typeof CARBS | typeof CALORIES | typeof SUGAR;

export const SortOptions: Array<SortOption> = [
  {key: PRODUCT_NAME, title: 'Product name'},
  {key: PROTEIN, title: 'Protein'},
  {key: FAT, title: 'Fat'},
  {key: CARBS, title: 'Carbs'},
  {key: CALORIES, title: 'Calories'},
  {key: SUGAR, title: 'Sugar'},
];
