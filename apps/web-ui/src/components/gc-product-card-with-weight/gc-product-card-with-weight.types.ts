import SvgIcon from '@material-ui/core/SvgIcon';
import {
  Product,
  ProductWeight,
} from '..';

export interface OwnProps {
  productId: string;
  productWeight: number;
  onMoveProduct?: (productId: Product['id'], newMealTime: number) => void;
  onNeedShowWeightInput?: (productId: Product['id']) => boolean;
  onChangeWeight?: (productId: string, newWeight: number) => void;
  onRootAnimationEnd?: (productId: Product['id']) => void;
  // animations
  onGetAppearanceType?: (productId: Product['id']) => 'add' | 'emerge' | null;
  onNeedScrollToProduct?: (productId: Product['id']) => boolean;
  weightIsChanging?: boolean; // for animation
  previewMode?: boolean;
  locked?: boolean;
  onGetTopRightButton?: (
    productId: ProductWeight['productId'],
    productWeight: ProductWeight['productWeight'],
  ) => {
    icon: typeof SvgIcon;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  };
}

export interface ReduxStateProps {
  product: Product;
  inFavorites?: boolean;
  showNutrients: boolean;
}

export interface ReduxDispatchProps {
  onAddToFavorites?: (product: Product) => void;
  onEditProduct?: (product: Product) => void;
  afterScrollToProduct: () => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
