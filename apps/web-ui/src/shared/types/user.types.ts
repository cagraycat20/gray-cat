import {
  NutrientName,
  ProductWeight,
} from '.';
import { Hint } from '../../types';

export type NutrientDisplayOptionBase<T = string> = 'value' | 'perKg' | T;
export type NutrientDisplayOption = NutrientDisplayOptionBase<
  'percents' | 'calories' | 'fromNutrientBased' | 'fromNutrientBasedPerKg'>;
export type CaloriesDisplayOption = NutrientDisplayOptionBase<
  'fromProtein' | 'fromFat' | 'fromCarbs' |
  'fromProteinCarbs' | 'fromProteinFat' | 'fromFatCarbs'
>;
export type NutrientDisplayOptionGen = NutrientDisplayOption | CaloriesDisplayOption;
export type BodyWeightUnit = 'kg' | 'lb';

type NutrientsDisplay =
  {[K in NutrientName]: Array<NutrientDisplayOption>} &
  {calories: Array<CaloriesDisplayOption>};

export interface BodyWeightPoint {
  date: string;
  bodyWeight?: number;
  desiredBodyWeight?: number;
}

export interface Flags {
  daySummaryIsShowed: boolean;
  introIsShowed: boolean;
}

export interface ProductPrice extends ProductWeight {
  price: number;
}

export interface SavedMeal {
  id: string;
  name: string;
  items: Array<ProductWeight>;
}

export type UserSettingsKind =
    'favorite'
  | 'price'
  | 'meal'
  | 'showNutrients'
  | 'bodyWeightUnit'
  | 'nutrientsDisplay'
  | 'bodyWeightPoint'
  | 'priceSuffix'
  | 'flags'
  | 'hiddenHint'
  | 'savedMeal'
  ;

interface UserSettingsItem<K extends UserSettingsKind, T> {
  kind: K;
  value: T;
  id?: string;
  sortOrder?: number;
  lastModified?: number;
  deleted?: boolean;
}

export type UsiFavorite = UserSettingsItem<'favorite', string>;
export type UsiPrice = UserSettingsItem<'price', ProductPrice>;
export type UsiMeal = UserSettingsItem<'meal', number>;
export type UsiShowNutrients = UserSettingsItem<'showNutrients', boolean>;
export type UsiBodyWeightUnit = UserSettingsItem<'bodyWeightUnit', BodyWeightUnit>;
export type UsiNutrientsDisplay = UserSettingsItem<'nutrientsDisplay', NutrientsDisplay>;
export type UsiBodyWeightPoint = UserSettingsItem<'bodyWeightPoint', BodyWeightPoint>;
export type UsiPriceSuffix = UserSettingsItem<'priceSuffix', string>;
export type UsiFlags = UserSettingsItem<'flags', Flags>;
export type UsiHiddenHint = UserSettingsItem<'hiddenHint', Hint['id']>;
export type UsiSavedMeal = UserSettingsItem<'savedMeal', SavedMeal>;

export type UsiUnion =
    UsiFavorite
  | UsiPrice
  | UsiMeal
  | UsiShowNutrients
  | UsiBodyWeightUnit
  | UsiNutrientsDisplay
  | UsiBodyWeightPoint
  | UsiPriceSuffix
  | UsiFlags
  | UsiHiddenHint
  | UsiSavedMeal
  ;

export interface RemoteSettings {
  view: UserSettingsView;
  items: Array<UsiUnion>;
  isAdmin?: boolean;
  newUser?: boolean;
}

export interface UserSettingsView {
  favorites: Array<UsiFavorite['value']>;
  prices: Array<UsiPrice['value']>;
  meals: Array<UsiMeal['value']>; // day time in minutes
  bodyWeightPoints: Array<UsiBodyWeightPoint['value']>;

  showNutrients: UsiShowNutrients['value'];
  bodyWeightUnit: UsiBodyWeightUnit['value'];
  nutrientsDisplay: UsiNutrientsDisplay['value'];
  priceSuffix: UsiPriceSuffix['value'];
  flags: UsiFlags['value'];
  hiddenHints: Array<UsiHiddenHint['value']>;
  savedMeals: Array<UsiSavedMeal['value']>;
}

export interface User {
  userId: string;
  settingItems: Array<UsiUnion>;
  isAdmin: boolean;
  creationTime: number;
  lastUpdateTime: number;
}
