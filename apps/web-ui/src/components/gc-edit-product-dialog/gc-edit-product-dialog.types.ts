import {
  LocalSettings,
  Product,
  StoreState,
} from '..';

export interface ReduxStateProps {
  product: LocalSettings['editingProduct'];
  products: StoreState['products'];
  isAdmin: StoreState['remoteSettings']['isAdmin'];
  mobileLayout: boolean;
}

export interface ReduxDispatchPropsHoc {
  onClose: () => void;
  onPostProductComplete: (product: Product) => void;
  onCopyProduct: (product: Product) => void;
  onError: (message: string) => void;
}

export interface ReduxDispatchPropsView extends ReduxDispatchPropsHoc {
  onSubmit: (product: Product, complete: () => void) => void;
}

export type Props = ReduxStateProps & ReduxDispatchPropsView;

export type HocProps = ReduxStateProps & ReduxDispatchPropsHoc;
