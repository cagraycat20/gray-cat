import { PopupMessage } from '../..';
import { Product } from '../..';

export interface OwnProps {
  expanded: boolean;
}

export interface ReduxStateProps {
  products: Array<Product>;
}

export interface ReduxDispatchProps {
  removeProduct: (product: Product) => void;
  importProducts: (product: Array<Product>) => void;
  onEditProduct: (product: Product) => void;
  showPopupMessage: (message: PopupMessage) => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
