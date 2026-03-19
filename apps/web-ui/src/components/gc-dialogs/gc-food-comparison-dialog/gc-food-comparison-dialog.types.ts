import {
  LocalSettings,
  StoreState,
  UserSettingsView,
} from '../..';
import { Product } from '../../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  products: StoreState['products'];
  settings: LocalSettings['foodComparisonDialog'];
  favorites: UserSettingsView['favorites'];
  prices: UserSettingsView['prices'];
  currency: string;
}

export interface ReduxDispatchProps {
  onChangeSettings: (settings: LocalSettings['foodComparisonDialog']) => void;
  onShowPricesDialog: (productId: Product['id']) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
