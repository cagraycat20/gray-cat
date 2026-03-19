import { DayInfo, Product } from '..';
import { productHelper as ph } from '../../utils';
import { CARBS, ConsumedProduct, SortBy, SUGAR } from '../types/intake-sugar.types';
import { SortDirection } from '../types/sort-selector.types';
import { mathUtils } from './math.utils';
import { productUtils as pu } from './product.utils';

export function getConsumedProducts(
  products: Array<Product>,
  days: Array<DayInfo>,
  dateFrom: Date,
  dateTo: Date,
): Array<ConsumedProduct> {
  const finalProducts: Array<ConsumedProduct> = [];

  ph.getConsumedProducts(days, dateFrom, dateTo).forEach((consumedProduct) => {
    const nutrients = pu.addUpNutrients([consumedProduct], products);
    const foundProduct = products.find((product) => product.id === consumedProduct.productId);

    finalProducts.push({
      id: consumedProduct.productId,
      name: foundProduct ? foundProduct.name : '',
      image: foundProduct ? foundProduct.image : undefined,
      thumb: foundProduct ? foundProduct.thumb : undefined,
      weight: consumedProduct.productWeight,
      calories: nutrients.calories,
      fat: nutrients.fat,
      carbs: nutrients.carbs,
      protein: nutrients.protein,
    });
  });

  return finalProducts;
}

export function formatValue(value: number): number | string {
  if (value < 0.005) {
    return mathUtils.round(value, 3);
  } else if (value < 0.05) {
    return mathUtils.round(value, 2);
  }

  return pu.formatNutrientValue(value);
}

export function sortConsumedProducts(
  products: Array<ConsumedProduct>,
  sortBy: SortBy,
  sortDirection: SortDirection,
) {
  products.sort((a, b) => {
    const sortField1 = a[sortBy === SUGAR ? CARBS : sortBy] || 0;
    const sortField2 = b[sortBy === SUGAR ? CARBS : sortBy] || 0;

    if (typeof(sortField1) === 'string' && typeof(sortField2) === 'string') {
      return sortDirection === 'desc'
      ? sortField2.toUpperCase().localeCompare(sortField1.toUpperCase())
      : sortField1.toUpperCase().localeCompare(sortField2.toUpperCase());
    }

    if (typeof(sortField1) === 'number' && typeof(sortField2) === 'number') {
      return sortDirection === 'desc' ? sortField2 - sortField1 : sortField1 - sortField2;
    }

    return sortDirection === 'desc'
      ? sortField2 < sortField1 ? -1 : 1
      : sortField1 < sortField2 ? -1 : 1;
  });
}

export function formattedAmountOfSugar(carbs: number): string {
  if (carbs < 1000) {
    return mathUtils.round(carbs) + ' g';
  }
  return mathUtils.round(carbs / 1000) + ' kg';
}

export function formattedWeight(weight: number): string {
  if (weight < 1000) {
    return mathUtils.round(weight) + ' g';
  }
  return mathUtils.round(weight / 1000) + ' kg';
}

export function percentageOfSugar(carbs: number, weight: number): number {
  return mathUtils.round(carbs * 100 / weight);
}
