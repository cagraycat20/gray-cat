import { SortOption } from './sort-selector.types';

export interface ConsumedProductSummary extends Consumed {
  id: string;
  name: string;
  image?: string;
  thumb?: string;
  moneySpentPercentage: number;
  caloriesPercentage: number;
  fatPercentage: number;
  carbsPercentage: number;
  proteinPercentage: number;
}

export interface Consumed {
  weight: number;
  moneySpent: number | null;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export const PRODUCT_NAME = 'name';
export const WEIGHT = 'weight';
export const PROTEIN = 'protein';
export const FAT = 'fat';
export const CARBS = 'carbs';
export const CALORIES = 'calories';
export const MONEY_SPENT = 'moneySpent';
export type SortBy = typeof PRODUCT_NAME | typeof WEIGHT | typeof PROTEIN | typeof FAT | typeof CARBS
  | typeof CALORIES | typeof MONEY_SPENT;

export const SortOptions: Array<SortOption> = [
  {key: PRODUCT_NAME, title: 'Product name'},
  {key: WEIGHT, title: 'Weight'},
  {key: PROTEIN, title: 'Protein'},
  {key: FAT, title: 'Fat'},
  {key: CARBS, title: 'Carbs'},
  {key: CALORIES, title: 'Calories'},
  {key: MONEY_SPENT, title: 'Money spent'},
];
