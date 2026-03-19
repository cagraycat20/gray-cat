import {
  LocalSettings,
  Product,
  StoreState,
} from '..';

export interface OwnProps {
}

export interface ReduxStateProps {
  products: StoreState['products'];
  editingProduct: LocalSettings['editingProduct'];
}

export interface ReduxDispatchProps {
  onPostProductComplete: (product: Product) => void;
  onClose: () => void;
  onError: (message: string) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
