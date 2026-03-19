import {
  LOAD_PRODUCTS_COMPLETE,
  LoadProductsComplete,
  POST_PRODUCT_COMPLETE,
  PostProductComplete,
  REMOVE_PRODUCT_COMPLETE,
  RemoveProductComplete,
} from '../actions';
import { Product, StoreState } from '../types';

type State = StoreState['products'];

type ProductsAction = LoadProductsComplete | PostProductComplete | RemoveProductComplete;

function mergeProducts(state: State, actionProducts: Array<Product>): State {
  if (actionProducts && actionProducts.length > 0) {
    return state
      .filter((stateProd) => !actionProducts.find((actionProd) => stateProd.id === actionProd.id))
      .concat(actionProducts)
      .sort((product1, product2) => product1.name.localeCompare(product2.name));
  } else {
    return state;
  }
}

function removeProduct(state: State, actionProduct: Product): State {
  return state.filter((stateProduct) => stateProduct.id !== actionProduct.id);
}

export function products(state: State = [], action: ProductsAction): State {
  switch (action.type) {

    case LOAD_PRODUCTS_COMPLETE:
      return mergeProducts(state, action.products);

    case POST_PRODUCT_COMPLETE:
      return mergeProducts(state, [action.product]);

    case REMOVE_PRODUCT_COMPLETE:
      return removeProduct(state, action.product);

    default:
      return state;
  }
}
