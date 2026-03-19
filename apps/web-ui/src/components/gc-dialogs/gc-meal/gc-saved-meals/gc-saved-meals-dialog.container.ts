import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  StoreState,
} from '../../..';
import { AddSavedMeal, changeDayProductWeight, changeRemoteSettings, SavedMeal } from '../../../../actions';
import { usu } from '../../../../utils';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-saved-meals-dialog.types';
import { GcSavedMealsDialogViewStyled } from './gc-saved-meals-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    addSavedMeal: state.localSettings.addSavedMeal,
    savedMeals: state.remoteSettings.view.savedMeals,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onAddMeal: (targetMeal: AddSavedMeal, sourceMeal: SavedMeal) => {
      sourceMeal.items.forEach((value) => {
        dispatch(changeDayProductWeight({
          productId: value.productId,
          productWeight: value.productWeight,
          date: targetMeal.date,
          replace: false,
          mealTime: targetMeal.time,
        }));
      });

      dispatch(changeLocalSettings({ addSavedMeal: null }));
    },
    onDeleteMeal: (meal: SavedMeal) => dispatch(changeRemoteSettings(usu.deleteSavedMeal(meal))),
    onCancel: () => dispatch(changeLocalSettings({ addSavedMeal: null })),
  };
}

export const GcSavedMealsDialogContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GcSavedMealsDialogViewStyled);
