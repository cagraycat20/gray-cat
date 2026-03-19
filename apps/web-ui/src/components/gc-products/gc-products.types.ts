import { StyledComponentProps } from '@material-ui/core/styles/withStyles';
import {
  DndProduct,
  Product,
  StoreState,
  UserSettingsView,
} from '..';
import { ClassKey } from './gc-products.styles';

export interface OwnProps {
  dialogMode?: boolean;
  afterAddProductToMeal?: () => void;
}

export interface ReduxStateProps {
  favorites: UserSettingsView['favorites'];
  products: StoreState['products'];
  dndProduct: StoreState['dndState']['dndProduct'];
  date: StoreState['localSettings']['selectedDate'];
  productList: StoreState['localSettings']['productList'];
  windowHeight: number; // just for the re-render if height change
  loggedIn: boolean;
}

export interface ReduxHocStateProps extends ReduxStateProps {
  days: StoreState['days'];
  meals: UserSettingsView['meals'];
}

export interface ReduxViewStateProps extends ReduxStateProps {
  onGetMeals: () => Array<number>;
}

export interface ReduxDispatchProps {
  onStartDrag: (dndProduct: DndProduct) => void;
  onEndDrag: () => void;
  onAddProductToMeal: (params: {
    productId: Product['id'],
    productWeight: number,
    date: string,
    mealTime: number,
    showWeightInput?: boolean,
  }) => void;
  onRemoveProductFromMeal: (
    productId: Product['id'],
    date: string,
    mealTime: number,
  ) => void;
  onRemoveFromFavorites: (productId: Product['id'], productName: string) => void;
  onAddToFavorites: (productId: Product['id'], productName: string) => void;
  onEditProduct: (product: Product) => void;
  onChangeProductList: (
    productList: ReduxStateProps['productList'],
    dialogMode?: boolean,
  ) => void;
  onChangeFavoriteSortOrder: (productId: string, targetProductId: string) => void;
  onShowLoginOfferDialog: () => void;
}

export type Props =  OwnProps & ReduxViewStateProps & ReduxDispatchProps;

export type HocProps =  OwnProps & ReduxHocStateProps &
  ReduxDispatchProps & StyledComponentProps<ClassKey>;
