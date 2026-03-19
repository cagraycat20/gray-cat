import {
  LocalSettings,
  Product,
  StoreState,
} from '../..';
import { UserSettingsView } from '../../../types';

export interface OwnProps {
  productList: LocalSettings['productList'];
  filterText: string;
  favorites: UserSettingsView['favorites'];
  populars: Array<string>;
  products: StoreState['products'];
  windowHeight: number; // just for the re-render if height change
  onStartDrag?: (props: object) => object;
  onEndDrag?: () => void;
  onOpenCardMenu: (element: HTMLElement, productId: Product['id']) => void;
  onChangeFavoriteSortOrder: (productId: string, targetProductId: string) => void;
}

export type Props = OwnProps;
