import {
  Product,
} from '..';

export interface OwnProps  {
  onClick?: (element: HTMLElement, productId: Product['id']) => void;
  product?: Product;
  productId?: Product['id'];
  previewMode?: boolean;
}

export interface ReduxStateProps {
  product?: Product;
  previewMode?: boolean;
  showNutrients: boolean;
}

export type Props =  OwnProps & ReduxStateProps;
