import { Product } from '../types';

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export interface RemoveProduct {
  type: typeof REMOVE_PRODUCT;
  id: Product['id'];
}

export function removeProduct(id: Product['id']): RemoveProduct {
  return {
    type: REMOVE_PRODUCT,
    id,
  };
}

export const REMOVE_PRODUCT_COMPLETE = 'REMOVE_PRODUCT_COMPLETE';
export interface RemoveProductComplete {
  type: typeof REMOVE_PRODUCT_COMPLETE;
  product: Product;
}

export function removeProductComplete(product: Product): RemoveProductComplete {
  return {
    type: REMOVE_PRODUCT_COMPLETE,
    product,
  };
}

export const POST_PRODUCT_COMPLETE = 'POST_PRODUCT_COMPLETE';
export interface PostProductComplete {
  type: typeof POST_PRODUCT_COMPLETE;
  product: Product;
}

export function postProductComplete(product: Product): PostProductComplete {
  return {
    type: POST_PRODUCT_COMPLETE,
    product,
  };
}

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export interface LoadProducts {
  type: typeof LOAD_PRODUCTS;
  since: number;
}

export function loadProducts(since: number): LoadProducts {
  return {
    type: LOAD_PRODUCTS,
    since,
  };
}

export const LOAD_PRODUCTS_COMPLETE = 'LOAD_PRODUCTS_COMPLETE';
export interface LoadProductsComplete {
  type: typeof LOAD_PRODUCTS_COMPLETE;
  products: Array<Product>;
  lastProductsRequest: number;
}

export function loadProductsComplete(products: Array<Product>, lastProductsRequest: number): LoadProductsComplete {
  return {
    type: LOAD_PRODUCTS_COMPLETE,
    products,
    lastProductsRequest,
  };
}

export const IMPORT_PRODUCTS = 'IMPORT_PRODUCTS';
export interface ImportProducts {
  type: typeof IMPORT_PRODUCTS;
  products: Array<Product>;
}

export function importProducts(products: Array<Product>): ImportProducts {
  return {
    type: IMPORT_PRODUCTS,
    products,
  };
}
