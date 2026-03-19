import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeDayProductWeight,
  changeLocalSettings,
  copyDay,
  dateUtils as du,
  dayInfoHelper as dih,
  StoreState,
  themeCustomData,
} from '..';
import { GcMealsHoc } from './gc-meals.props-hoc';
import {
  ReduxDispatchProps,
  ReduxHocStateProps,
} from './gc-meals.types';

function mapStateToProps(state: StoreState): ReduxHocStateProps {
  const yesterday = dih.findDay(
    du.getFormattedDate(du.subtractDays(state.localSettings.selectedDate, 1)),
    state.days,
  );

  return {
    day: dih.findDay(state.localSettings.selectedDate, state.days),
    date: state.localSettings.selectedDate,
    mobileLayout: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4sWithFavorites,
    twoColumns: state.windowSize.width <
      themeCustomData.custom.breakpoints.col4s,
    meals: state.remoteSettings.view.meals,
    isIntroductionMode: !(state.days && state.days.length > 0),
    canCopyFromYesterday: Boolean(
      yesterday && yesterday.consumed && yesterday.consumed.length),
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onCopyFromDay: (fromDate: string, toDate: string) =>
      dispatch(copyDay(fromDate, toDate)),
    onChangeProductWeight: (productId, weight, date, mealTime, replace = false) =>
      dispatch(changeDayProductWeight({
        productId,
        productWeight: weight,
        date,
        replace,
        mealTime,
      })),
      onChangeDate: (date: string) =>
        dispatch(changeLocalSettings({selectedDate: date})),
  };
}

export const GcMealsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcMealsHoc);
