import SvgIcon from '@material-ui/core/SvgIcon';
import { Action } from 'redux';
import {
  DayInfo,
  DndProduct,
  Product,
 } from '.';
import { ConsumedProduct, ProductWeight } from '../shared';
import { SortBy } from '../shared/types/intake-sugar.types';
import { SortDirection } from '../shared/types/sort-selector.types';
import { Hint } from '../types';
import {
  NutrientPropName,
  RemoteSettings,
  UserSettingsView,
} from '../types';

export interface ProductInfo {
  productId: Product['id'];
  mealTime: number;
}

export interface ProductList {
  mode: 'all' | 'favorites' | 'popular';
  filter: {
    protein: boolean;
    fat: boolean;
    carbs: boolean;
  };
}

interface DaysHistory {
  [key: string]: Array<DayInfo['consumed']>;
}

export interface PricesDialog {
  open: boolean;
  sortBy: NutrientPropName | 'totalPrice' | 'none';
  sortDirection: SortDirection;
  productId?: Product['id'];
}

export interface IntakeSugarDialog {
  open: boolean;
  sortBy: SortBy;
  sortDirection: SortDirection;
}

export interface FoodComparisonDialog {
  open: boolean;
  product1: Product | null;
  product2: Product | null;
}

export interface AddSavedMeal {
  date: string;
  time: number;
  consumedProducts: Array<ConsumedProduct>;
  productId?: Product['id'];
}

export interface LocalSettings {
  selectedDate: string;
  productList: ProductList; // left panel
  productListDialog: ProductList; // dialog (well, obviously)
  unlockedDates: Array<string>;
  editingProduct?: Product | null;
  productToScrollTo?: {
    mealTime: number;
    productId: Product['id'];
    showWeightInput?: boolean;
  };
  lastProductsRequest: number;
  daysHistory: DaysHistory;
  pricesDialog: PricesDialog;
  intakeSugarDialog: IntakeSugarDialog;
  nutrSumSetDialog: boolean;
  canInstallApp: boolean;
  notLoggedInWarning: boolean;
  notLoggedInFeatureDenial: boolean;
  hint?: Hint | null;
  mealItemsToSave: Array<ProductWeight>;
  addSavedMeal: AddSavedMeal | null;
  foodComparisonDialog: FoodComparisonDialog;
}

export type AllSettings = UserSettingsView & LocalSettings;

export interface DndState {
  dndProduct: DndProduct | undefined | null;
}

export interface NetworkState {
  online: boolean;
}

export interface PopupMessage {
  attentionIcon?: {
    icon: typeof SvgIcon;
    hoverDayOnly?: boolean;
  };
  text: string;
  autoHideDuration?: number;
  actionButton?: {
    actions?: Array<Action>; // either this
    onClick?: () => void; // or this
    caption: string;
  };
}

interface WindowSize {
  height: number;
  width: number;
}

export interface StoreState {
  products: Array<Product>;
  days: Array<DayInfo>;
  remoteSettings: RemoteSettings;
  localSettings: LocalSettings;
  error: string;
  popupMessages: Array<PopupMessage>;
  dndState: DndState;
  network: NetworkState;
  windowSize: WindowSize;
  // INSERT HERE
}
