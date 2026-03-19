import { Product, SavedMeal } from '../../../../../types';

export interface OwnProps {
  meal: SavedMeal;
  isSelected: boolean;
  onMealClick: (meal: SavedMeal) => void;
}

export interface ReduxStateProps {
  products?: Array<Product>;
}

export interface ReduxDispatchProps {
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
