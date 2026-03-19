import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeDayProductWeight,
  dateUtils,
  StoreState,
  themeCustomData,
  unlockPastDay,
} from '..';
import { changeLocalSettings, changeRemoteSettings } from '../../actions';
import { GcMainPageHoc } from './gc-main-page.props-hoc';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-main-page.types';

function mapStateToProps(state: StoreState): ReduxStateProps {
  const { breakpoints } = themeCustomData.custom;
  return {
    showNutrients: state.remoteSettings.view.showNutrients,
    mobileLayout: state.windowSize.width <= breakpoints.col4sWithFavorites,
    locked: dateUtils.isDateLocked(
      state.localSettings.selectedDate,
      state.localSettings.unlockedDates,
    ),
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onAddProductToDate: (productId, date, productWeight, mealTime) =>
      dispatch(changeDayProductWeight({
        productId,
        productWeight,
        date,
        mealTime,
      })),
    onChangeRemoteSettings: (changes) =>
      dispatch(changeRemoteSettings(changes)),
    onUnlockDay: (date) => dispatch(unlockPastDay(date)),
    onChangeDate: (date: string) =>
      dispatch(changeLocalSettings({selectedDate: date})),
  };
}

export const GcMainPageContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
)(GcMainPageHoc);
