import { LocalSettings, PopupMessage, ProductWeight } from '../../../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  mealItems: LocalSettings['mealItemsToSave'];
}

export interface ReduxDispatchProps {
  onSaveMeal: (name: string, items: Array<ProductWeight>) => void;
  onCancel: () => void;
  showPopupMessage: (message: PopupMessage) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
