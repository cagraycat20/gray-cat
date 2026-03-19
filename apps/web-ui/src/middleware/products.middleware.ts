import { from } from 'rxjs';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';

import {
  GcEpic,
  IMPORT_PRODUCTS,
  ImportProducts,
  LOAD_PRODUCTS,
  LoadProducts,
  removeProductComplete,
  setError,
} from '../actions';
import { loadProductsComplete } from '../actions';
import { postProductComplete, REMOVE_PRODUCT, RemoveProduct } from '../actions';
import { productHelper } from '../components/index';
import { Product } from '../shared';
import { apiDelete, apiGet, apiPost } from '../utils/request.utils';

const normalizeProduct = (product: Product) => ({
  ...product,
  name: product.name.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()),
});

export const loadProductsEpic: GcEpic = (action$) => action$
  .ofType<LoadProducts>(LOAD_PRODUCTS)
  .pipe(switchMap(({since}) =>
    apiGet('products', since ? {since: String(since)} : undefined)(
      (products: Array<Product>) => loadProductsComplete(products, Date.now()),
      (error) => setError(error),
    )),
  );

export const removeProductEpic: GcEpic = (action$) => action$
  .ofType<RemoveProduct>(REMOVE_PRODUCT)
  .pipe(switchMap(({id}) =>
    apiDelete('products', {id})(
      (result: Product) => removeProductComplete(result),
      (error) => setError(error),
    )),
  );

export const importProductsEpic: GcEpic = (action$, $state) => action$
  .ofType<ImportProducts>(IMPORT_PRODUCTS)
  .pipe(
    concatMap(({products}) => from(products)),
    filter((product) => Boolean(product)),
    map(({id, ...rest}) => {
      const existingProduct = $state.value.products.find((prod) => prod.id === id);
      return productHelper.mergeProduct(existingProduct, rest);
    }),
    concatMap((product: Product) =>
      apiPost('products', normalizeProduct(product))(
        (result: Product) => postProductComplete(result),
        (error) => setError(error),
    )),
  );
