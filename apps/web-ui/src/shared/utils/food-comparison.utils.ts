import { Product, ProductPrice } from '..';
import { mathUtils } from './math.utils';

export function hasProductPrice(productId: Product['id'], prices: Array<ProductPrice>): boolean {
  return prices.findIndex((value) => value.productId === productId) > -1;
}

export function getProductPrice(productId: Product['id'], prices: Array<ProductPrice>): number {
  const found = prices.find((value) => value.productId === productId);
  return found ? found.price : 0;
}

export function formatPriceValue(value: number): number | string {
  if (value < 0.005) {
    return mathUtils.round(value, 4);
  } else if (value < 0.05) {
    return mathUtils.round(value, 3);
  }

  return mathUtils.round(value, 2);
}

export function formatValue(value: number): number | string {
  if (value < 0.005) {
    return mathUtils.round(value, 3);
  } else if (value < 0.05) {
    return mathUtils.round(value, 2);
  }

  return mathUtils.round(value, 1);
}
