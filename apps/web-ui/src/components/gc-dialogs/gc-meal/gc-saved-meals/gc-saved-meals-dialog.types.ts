import { AddSavedMeal, LocalSettings, SavedMeal } from '../../../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  addSavedMeal: LocalSettings['addSavedMeal'];
  savedMeals: Array<SavedMeal>;
}

export interface ReduxDispatchProps {
  onAddMeal: (targetMeal: AddSavedMeal, meal: SavedMeal) => void;
  onDeleteMeal: (meal: SavedMeal) => void;
  onCancel: () => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
