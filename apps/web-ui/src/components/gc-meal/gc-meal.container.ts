import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeDayProductTime,
  changeDayProductWeight,
  changeDndState,
  changeMealTime,
  clearMeal,
  dateUtils,
  propsProcessorHoc,
  showPopupMessage,
  StoreState,
  undoLastDayChange,
} from '..';
import { changeLocalSettings } from '../../actions';
import { ConsumedProduct, ProductWeight } from '../../types';
import { GcMealDnd } from './gc-meal.dnd';
import {
  Props,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-meal.types';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: state.products,
    date: state.localSettings.selectedDate,
    locked: dateUtils.isDateLocked(
      state.localSettings.selectedDate,
      state.localSettings.unlockedDates,
    ),
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onStartDrag: (dndProduct) => dispatch(changeDndState({dndProduct})),
    onEndDrag: () => dispatch(changeDndState({dndProduct: null})),
    onRemoveMeal: (date, mealTime) => {
      dispatch(clearMeal(date, mealTime));
      dispatch(showPopupMessage({
        text: 'Meal was deleted',
        actionButton: {
          caption: 'Undo',
          actions: [undoLastDayChange(date)],
        },
      }));
    },
    onChangeProductWeight: (productId, weight, date, mealTime, replace = true) =>
      dispatch(changeDayProductWeight({
        productId,
        productWeight: weight,
        date,
        replace,
        mealTime,
      })),
    onChangeMealTime: (date, oldMealTime, newMealTime) =>
      dispatch(changeMealTime(date, oldMealTime, newMealTime)),
    onMoveProduct: (productId, date, oldMealTime, newMealTime) =>
      dispatch(changeDayProductTime({productId, date, oldMealTime, newMealTime})),
    onSaveMeal: (items: Array<ProductWeight>) => dispatch(changeLocalSettings({ mealItemsToSave: items })),
    onAddSavedMeal: (date: string, time: number, consumedProducts: Array<ConsumedProduct>) => {
      dispatch(changeLocalSettings({ addSavedMeal: {date, time, consumedProducts } }));
    },
  };
}

const canDrop = () => false;

const hoc = propsProcessorHoc<Props, Props>(
  (inputProps) => ({...inputProps, canDrop}),
  GcMealDnd,
);

export const GcMealContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(hoc);
