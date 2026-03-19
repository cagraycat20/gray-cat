import { dateUtils, UsiSavedMeal } from '../shared';
import {
  UserSettingsView,
  UsiBodyWeightPoint,
  UsiBodyWeightUnit,
  UsiFavorite,
  UsiFlags,
  UsiHiddenHint,
  UsiMeal,
  UsiNutrientsDisplay,
  UsiPrice,
  UsiPriceSuffix,
  UsiShowNutrients,
  UsiUnion,
} from '../shared/types';

export const defaultSettingItems: Array<UsiUnion> = [
  {kind: 'bodyWeightUnit', value: 'kg'},
  {kind: 'priceSuffix', value: '$'},
  {kind: 'showNutrients', value: false},
  {kind: 'meal', id: (9  * 60).toString(), value: 9  * 60},
  {kind: 'meal', id: (12 * 60).toString(), value: 12 * 60},
  {kind: 'meal', id: (15 * 60).toString(), value: 15 * 60},
  {kind: 'meal', id: (18 * 60).toString(), value: 18 * 60},
  {
    kind: 'nutrientsDisplay',
    value: {
      protein: ['value', 'percents'],
      fat: ['value', 'percents'],
      carbs: ['value', 'percents'],
      calories: ['value', 'perKg'],
    },
  },
  {
    kind: 'flags',
    value: {
      daySummaryIsShowed: false,
      introIsShowed: false,
    },
  },
];

const getItems = <T extends UsiUnion>(kind: T['kind']) => (items: Array<UsiUnion>) => {
  return items
    .filter((item) => item.kind === kind && !item.deleted)
    .sort((a, b) => ((a.sortOrder || 0) - (b.sortOrder || 0)))
    .map((item) => item.value) as Array<unknown> as Array<T['value']>;
};

const getItem = <T extends UsiUnion>(kind: T['kind']) => (items: Array<UsiUnion>) => {
  const result = items.find((item) => item.kind === kind) ||
    defaultSettingItems.find((item) => item.kind === kind);
  if (result) {
    return result.value as T['value'];
  } else {
    throw new Error(`UserSettingsUtils.getItem: item of kind ${kind} not found`);
  }
};

type GetId<T> = (value: T) => string;

const setItem = <T extends UsiUnion>(kind: T['kind'], getId: GetId<T['value']>, deleted: T['deleted']) =>
  (value: T['value']) => [{kind, id: getId(value), deleted, value} as T];

const valueToStr = (value: UsiUnion['value']) => String(value);
const emptyId = () => '';

class UserSettingsUtils {
  public addFavorite = setItem<UsiFavorite>('favorite', valueToStr, false);
  public deleteFavorite = setItem<UsiFavorite>('favorite', valueToStr, true);

  public addPrice = setItem<UsiPrice>('price', (price) => price.productId, false);
  public deletePrice = setItem<UsiPrice>('price', (price) => price.productId, true);

  public addMeal = setItem<UsiMeal>('meal', valueToStr, false);
  public deleteMeal = setItem<UsiMeal>('meal', valueToStr, true);

  public addSavedMeal = setItem<UsiSavedMeal>('savedMeal', (meal) => meal.id, false);
  public deleteSavedMeal = setItem<UsiSavedMeal>('savedMeal', (meal) => meal.id, true);

  public addBodyWeightPoint = setItem<UsiBodyWeightPoint>('bodyWeightPoint', (point) => point.date, undefined);
  public deleteBodyWeightPoint = setItem<UsiBodyWeightPoint>('bodyWeightPoint', (point) => point.date, undefined);

  public setShowNutrients = setItem<UsiShowNutrients>('showNutrients', emptyId, undefined);

  public setBodyWeightUnit = setItem<UsiBodyWeightUnit>('bodyWeightUnit', emptyId, undefined);

  public setNutrientsDisplay = setItem<UsiNutrientsDisplay>('nutrientsDisplay', emptyId, undefined);

  public setPriceSuffix = setItem<UsiPriceSuffix>('priceSuffix', emptyId, undefined);

  public setFlags = setItem<UsiFlags>('flags', emptyId, undefined);

  public addHiddenHint = setItem<UsiHiddenHint>('hiddenHint', valueToStr, undefined);

  private getFavorites = getItems<UsiFavorite>('favorite');
  private getPrices = getItems<UsiPrice>('price');
  private getMeals = getItems<UsiMeal>('meal');
  private getBodyWeightPoints = getItems<UsiBodyWeightPoint>('bodyWeightPoint');
  private getShowNutrients = getItem<UsiShowNutrients>('showNutrients');
  private getBodyWeightUnit = getItem<UsiBodyWeightUnit>('bodyWeightUnit');
  private getNutrientsDisplay = getItem<UsiNutrientsDisplay>('nutrientsDisplay');
  private getPriceSuffix = getItem<UsiPriceSuffix>('priceSuffix');
  private getFlags = getItem<UsiFlags>('flags');
  private getHiddenHints = getItems<UsiHiddenHint>('hiddenHint');
  private getSavedMeals = getItems<UsiSavedMeal>('savedMeal');

  public sortFavorites(productId: string, targetProductId: string, items: Array<UsiUnion>): Array<UsiUnion> {
    const sorted = this.getFavorites(items).reduce(
      (acc, iter) => {
        if (iter === targetProductId) {
          acc.push(productId);
        }
        if (iter !== productId) {
          acc.push(iter);
        }
        return acc;
      },
      [] as Array<UsiFavorite['value']>,
    );

    return items.map((item) => {
      if (item.kind === 'favorite' && !item.deleted) {
        return {
          ...item,
          sortOrder: sorted.indexOf(item.value) + 1, // one based index
          lastModified: Date.now(),
        };
      } else {
        return item;
      }
    });
  }

  public setPartialFlags(changes: Partial<UsiFlags['value']>, items: Array<UsiUnion>): Array<UsiUnion> {
    return this.setFlags({
      ...this.getFlags(items),
      ...changes,
    });
  }

  public setPartialBodyWeight(
    point: UsiBodyWeightPoint['value'], items: Array<UsiUnion>,
  ): Array<UsiUnion> {
    const oldPoint = this.getBodyWeightPoints(items).find((item) => item.date === point.date);

    const newPoint = oldPoint ? {
      date: point.date,
      bodyWeight: point.bodyWeight !== undefined ? point.bodyWeight : oldPoint.bodyWeight,
      desiredBodyWeight: point.desiredBodyWeight !== undefined ? point.desiredBodyWeight : oldPoint.desiredBodyWeight,
    } : point;

    return this.addBodyWeightPoint(newPoint);
  }

  public getView(items: Array<UsiUnion>): UserSettingsView {
    return {
      favorites: this.getFavorites(items),
      prices: this.getPrices(items),
      meals: this.getMeals(items),
      bodyWeightPoints: this.getBodyWeightPoints(items).sort(
        (first, second) => dateUtils.getDateDifference(dateUtils.getDate(first.date), dateUtils.getDate(second.date)),
      ),
      showNutrients: this.getShowNutrients(items),
      bodyWeightUnit: this.getBodyWeightUnit(items),
      nutrientsDisplay: this.getNutrientsDisplay(items),
      priceSuffix: this.getPriceSuffix(items),
      flags: this.getFlags(items),
      hiddenHints: this.getHiddenHints(items),
      savedMeals: this.getSavedMeals(items),
    };
  }
}

export const usu = new UserSettingsUtils();
