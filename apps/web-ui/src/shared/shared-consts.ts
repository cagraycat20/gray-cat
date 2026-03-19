import {
  NutrientName,
  NutrientPropName,
} from './types';

export const MAX_PRODUCT_WEIGHT = 10000; // in grams

export const NUTRIENT_ONLY_PROPS: Array<NutrientName> = [
  'protein',
  'fat',
  'carbs',
];

export const NUTRIENT_PROPS: Array<NutrientPropName> = [
  ...NUTRIENT_ONLY_PROPS,
  'calories',
];

export const NUTRIENT_CAPTIONS = {
  protein: 'Protein',
  fat: 'Fat',
  carbs: 'Carbs',
  calories: 'Calories (kcal)',
};

export const NUTRIENT_CAPTIONS_SHORT = {
  ...NUTRIENT_CAPTIONS,
  calories: 'Calories',
};

// path
const articlesPrefix = 'article-';

export const pagePath = {
  welcome: '',
  pointlessCalculations: articlesPrefix + 'pointless-calculations',
  realStrategy: articlesPrefix + 'real-strategy',
  danger: articlesPrefix + 'danger',
  howNotToGiveUp: articlesPrefix + 'how-not-to-give-up',
  productList: 'food',
  cookies: 'cookies',
  privacy: 'privacy',
  terms: 'terms',
};

export const siteName = 'ProtoMeal';
export const siteUrl = 'https://protomeal.com';
export const siteEmail = 'support@protomeal.com';
