import {
  Product,
  ProductList,
  StoreState,
} from '../..';
import { UserSettingsView } from '../../../types';

export interface OwnProps {
  dialog?: boolean;
  productList: ProductList;
  onStartDrag?: (props: object) => object;
  onEndDrag?: () => void;
  onChangeProductList: (newProductList: ProductList) => void;
  onRenderMenuItems: (
    productId: Product['id'] | undefined,
    closeMenu: () => void,
  ) => JSX.Element;
  onGetMenuHeaderText: (productName: string) => string;
}

export interface ReduxStateProps {
  favorites: UserSettingsView['favorites'];
  products: StoreState['products'];
  windowHeight: number; // just for the re-render if height change
  loggedIn: boolean;
}

export interface ReduxDispatchProps {
  onRemoveFromFavorites: (productId: Product['id'], productName: string) => void;
  onAddToFavorites: (productId: Product['id'], productName: string) => void;
  onEditProduct: (product: Product) => void;
  onChangeFavoriteSortOrder: (productId: string, targetProductId: string) => void;
  onShowLoginOfferDialog: () => void;
}

export type Props =  OwnProps & ReduxStateProps & ReduxDispatchProps;
