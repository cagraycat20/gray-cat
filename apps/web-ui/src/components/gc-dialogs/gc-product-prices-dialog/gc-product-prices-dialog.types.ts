import {
  LocalSettings,
  StoreState,
  UserSettingsView,
} from '../..';
import { ProductPrice } from '../../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  products: StoreState['products'];
  prices: UserSettingsView['prices'];
  settings: LocalSettings['pricesDialog'];
  favorites: UserSettingsView['favorites'];
  priceSuffix: UserSettingsView['priceSuffix'];
}

export type ProductPriceChange = ProductPrice & {deleted?: boolean};

export interface ReduxDispatchProps {
  onUpdateProductPrices: (changes: Array<ProductPriceChange>) => void;
  onChangeSettings: (settings: LocalSettings['pricesDialog']) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
