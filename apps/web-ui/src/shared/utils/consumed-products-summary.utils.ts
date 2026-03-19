import { Consumed, ConsumedProductSummary, dateUtils, DayInfo, Product, ProductPrice } from '..';
import { ConsumedProduct, SortBy } from '../types';
import { SortDirection } from '../types/sort-selector.types';
import { mathUtils } from './math.utils';
import { productUtils as pu } from './product.utils';

export function getConsumedProductsSummary(
  products: Array<Product>,
  prices: Array<ProductPrice>,
  days: Array<DayInfo>,
  dateFrom: Date,
  dateTo: Date,
): Array<ConsumedProductSummary> {
  const finalProducts: Array<ConsumedProductSummary> = [];

  getConsumedProducts(days, dateFrom, dateTo).forEach((consumedProduct) => {
    const nutrients = pu.addUpNutrients([consumedProduct], products);
    const foundProduct = products.find((product) => product.id === consumedProduct.productId);
    const foundPrice = prices.find((price) => price.productId === consumedProduct.productId);

    finalProducts.push({
      id: consumedProduct.productId,
      name: foundProduct ? foundProduct.name : '',
      image: foundProduct ? foundProduct.image : undefined,
      thumb: foundProduct ? foundProduct.thumb : undefined,
      weight: consumedProduct.productWeight,
      moneySpent: foundPrice
          ? mathUtils.round(foundPrice.price / foundPrice.productWeight * consumedProduct.productWeight)
          : null,
      moneySpentPercentage: 0,
      calories: nutrients.calories,
      caloriesPercentage: 0,
      fat: nutrients.fat,
      fatPercentage: 0,
      carbs: nutrients.carbs,
      carbsPercentage: 0,
      protein: nutrients.protein,
      proteinPercentage: 0,
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
  products: Array<ConsumedProductSummary>,
  sortBy: SortBy,
  sortDirection: SortDirection,
) {
  products.sort((a, b) => {
    const sortField1 = a[sortBy] || 0;
    const sortField2 = b[sortBy] || 0;

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

export function calculateTotalConsumedNutrients(products: Array<ConsumedProductSummary>): Consumed {
  const result = {
    weight: 0,
    moneySpent: 0,
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  };

  products.forEach((product) => {
    result.weight += product.weight;
    result.moneySpent += product.moneySpent ? product.moneySpent : 0;
    result.calories += product.calories;
    result.fat += product.fat;
    result.carbs += product.carbs;
    result.protein += product.protein;
  });

  products.forEach((product) => {
    product.moneySpentPercentage = product.moneySpent
      ? mathUtils.round(product.moneySpent / result.moneySpent * 100)
      : 0;
    product.caloriesPercentage = product.calories / result.calories * 100;
    product.fatPercentage = product.fat / result.fat * 100;
    product.carbsPercentage = product.carbs / result.carbs * 100;
    product.proteinPercentage = product.protein / result.protein * 100;
  });

  return result;
}

function getConsumedProducts(days: Array<DayInfo>, dateFrom: Date, dateTo: Date): Array<ConsumedProduct> {
  const consumedProducts: Array<ConsumedProduct> = [];

  days.filter((value) => {
    const result = dateUtils.isSameOrAfter(value.date, dateFrom) && dateUtils.isSameOrBefore(value.date, dateTo);

    if (result) {
      value.consumed.forEach((consumedProduct) => {
        const product = consumedProducts.find((p) => p.productId === consumedProduct.productId);
        if (product) {
          product.productWeight += consumedProduct.productWeight;
        } else {
          consumedProducts.push({ ...consumedProduct });
        }
      });
    }

    return result;
  });

  return consumedProducts;
}
