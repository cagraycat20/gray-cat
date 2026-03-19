import {
  CaloriesDisplayOption,
  NutrientDisplayOption,
  NutrientDisplayOptionBase,
  NutrientPropName,
  UserSettingsView,
} from '..';
import { BodyWeightUnit } from '../../shared/types';

export interface OptionInfo<T extends NutrientDisplayOptionBase
  = NutrientDisplayOptionBase> {
  getName: (nutrient: NutrientPropName) => string;
  option: T;
  getDescription?: (nutrient: NutrientPropName) => string;
}

export type OptionsInfo<T extends NutrientDisplayOptionBase =
  NutrientDisplayOptionBase> = Array<OptionInfo<T>>;

const nutrientOptions: { [key in BodyWeightUnit]?: OptionsInfo<NutrientDisplayOption>} = {};

export function getNutrientOptions(bodyWeightUnit: BodyWeightUnit): OptionsInfo<NutrientDisplayOption> {
  if (!nutrientOptions[bodyWeightUnit]) {
    nutrientOptions[bodyWeightUnit] = [
      {
        getName: () => 'Weight (grams)',
        option: 'value',
        getDescription: (nutrient) => `Weight of ${nutrient} in grams`,
      },
      {
        getName: () => 'Percentage of calories',
        option: 'percents',
        getDescription: (nutrient) => `Percentage of calories retrieved from ${nutrient}`,
      },
      {
        getName: (nutrient) => `Weight (grams) of ${nutrient} per ${bodyWeightUnit} of body weight`,
        option: 'perKg',
        getDescription: (nutrient) => `Weight (grams) of ${nutrient} per ${
          bodyWeightUnit} of desirable (or current if desirable is not set) body weight`,
      },
      {
        getName: () => 'Calories (kcal)',
        option: 'calories',
        getDescription: (nutrient) => `Number of kilocalories retrieved from ${nutrient}`,
      },
      {
        getName: (nutrient) => `Weight (grams) of ${nutrient} from ${nutrient}-based food`,
        option: 'fromNutrientBased',
        getDescription: (nutrient) => `Weight (grams) of ${nutrient} from food that contain more ${
          nutrient} than other nutrients (useful if the source of ${nutrient} is important)`,
      },
      {
        getName: (nutrient) =>
          `Weight (grams) of ${nutrient} from ${nutrient}-based food per ${
            bodyWeightUnit} of body weight`,
        option: 'fromNutrientBasedPerKg',
        getDescription: (nutrient) => `Weight (grams) of ${nutrient} from food that contain more ${
          nutrient} than other nutrients, per ${
          bodyWeightUnit} of desirable (or current if desirable is not set) body weight ` +
          `(useful if the source of ${nutrient} is important)`,
      },
    ];
  }
  return nutrientOptions[bodyWeightUnit] as OptionsInfo<NutrientDisplayOption>;
}

const caloriesOptions: { [key in BodyWeightUnit]?: OptionsInfo<CaloriesDisplayOption>} = {};

export function getCaloriesOptions(bodyWeightUnit: BodyWeightUnit): OptionsInfo<CaloriesDisplayOption> {
  if (!caloriesOptions[bodyWeightUnit]) {
    caloriesOptions[bodyWeightUnit] = [
      {getName: () => 'Number of Calories (kcal)', option: 'value'},
      {getName: () => `Calories (kcal) per ${bodyWeightUnit} of body weight`, option: 'perKg'},
      {getName: () => 'Calories (kcal) from carbs', option: 'fromCarbs'},
      {getName: () => 'Calories (kcal) from fat', option: 'fromFat'},
      {getName: () => 'Calories (kcal) from protein', option: 'fromProtein'},
      {getName: () => 'Calories (kcal) from fat & carbs', option: 'fromFatCarbs'},
      {getName: () => 'Calories (kcal) from protein & fat', option: 'fromProteinFat'},
      {getName: () => 'Calories (kcal) from protein & carbs', option: 'fromProteinCarbs'},
    ];
  }
  return caloriesOptions[bodyWeightUnit] as OptionsInfo<CaloriesDisplayOption>;
}

export const nutrientsDisplayDefault: UserSettingsView['nutrientsDisplay'] = {
  protein: ['value'], fat: ['value'], carbs: ['value'],  calories: ['value'],
};

export function presets(bodyWeightUnit: BodyWeightUnit): Array<{
  caption: string;
  name: string;
  nutrientsDisplay: UserSettingsView['nutrientsDisplay'];
}> {
  return [
    {
      caption: 'Amount',
      name: 'Number of nutrients/calories',
      nutrientsDisplay: {
        protein: ['value'],
        fat: ['value'],
        carbs: ['value'],
        calories: ['value'],
      },
    },
    {
      caption: 'Percentage',
      name: 'Percentage of nutrients',
      nutrientsDisplay: {
        protein: ['percents'],
        fat: ['percents'],
        carbs: ['percents'],
        calories: ['value'],
      },
    },
    {
      caption: `Per ${bodyWeightUnit}`,
      name: `Nutrients/calories per ${bodyWeightUnit === 'kg' ? 'kilogram' : 'pound'} of body weight`,
      nutrientsDisplay: {
        protein: ['perKg'],
        fat: ['perKg'],
        carbs: ['perKg'],
        calories: ['perKg'],
      },
    },
    {
      caption: 'Calories',
      name: 'Number of calories from nutrients',
      nutrientsDisplay: {
        protein: ['calories'],
        fat: ['calories'],
        carbs: ['calories'],
        calories: ['value'],
      },
    },
  ];
}
