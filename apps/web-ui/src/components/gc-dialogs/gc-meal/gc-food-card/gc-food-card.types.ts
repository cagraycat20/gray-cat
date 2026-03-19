import { Product, ProductWeight } from '../../../../types';

export interface OwnProps {
  productWeight: ProductWeight;
}

export interface ReduxStateProps {
  food: Product;
}

export interface ReduxDispatchProps {
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
