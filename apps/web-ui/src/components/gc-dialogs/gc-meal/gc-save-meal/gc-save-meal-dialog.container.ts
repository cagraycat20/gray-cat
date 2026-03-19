import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import uuidv4 from 'uuid/v4';
import {
  changeLocalSettings,
  StoreState,
} from '../../..';
import { changeRemoteSettings, ProductWeight, showPopupMessage } from '../../../../actions';
import { usu } from '../../../../utils';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-save-meal-dialog.types';
import { GcSaveMealDialogViewStyled } from './gc-save-meal-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    mealItems: state.localSettings.mealItemsToSave,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onSaveMeal: (name: string, items: Array<ProductWeight>) => {
      dispatch(changeRemoteSettings(usu.addSavedMeal({ id: uuidv4(), name, items })));
      dispatch(changeLocalSettings({ mealItemsToSave: [] }));
    },
    onCancel: () => dispatch(changeLocalSettings({ mealItemsToSave: [] })),
    showPopupMessage: (message) => dispatch(showPopupMessage(message)),
  };
}

export const GcSaveMealDialogContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GcSaveMealDialogViewStyled);
