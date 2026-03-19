import {
  Product,
 } from '../..';
import { UserSettingsView } from '../../../types';

export interface OwnProps {
  open: boolean;
  onClose: () => void;
}

export interface ReduxStateProps {
  products: Array<Product>;
  prices: UserSettingsView['prices'];
  currency: string;
}

export interface ReduxDispatchProps {
  onShowPricesDialog: (productId: Product['id']) => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
