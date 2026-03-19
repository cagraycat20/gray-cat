import {
  DndProduct,
  Product,
} from '../..';

export interface OwnProps {
  item?: DndProduct;
}

export interface ReduxStateProps {
  product?: Product;
  weight?: number;
  fromMeal?: boolean;
}

export interface ReduxDispatchProps {
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
