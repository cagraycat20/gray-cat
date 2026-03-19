import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeBodyWeightInfo,
  changeDay,
  changeFlags,
  changeLocalSettings,
  copyDay,
  showPopupMessage,
  StoreState,
  themeCustomData,
  undoLastDayChange,
} from '..';
import { unlockPastDay } from '../../actions';
import auth from '../../services/Auth';
import { ConsumedProduct, dateUtils, dayInfoHelper as dih } from '../../shared';
import { PropsProcessorHoc } from './gc-day-summary.props-hoc';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxHocStateProps,
} from './gc-day-summary.types';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxHocStateProps {
  const { breakpoints, mainBarHeight } = themeCustomData.custom;
  const date = ownProps.date || state.localSettings.selectedDate;
  return {
    date,
    days: state.days,
    bodyWeightPoints: state.remoteSettings.view.bodyWeightPoints,
    products: state.products,
    locked: dateUtils.isDateLocked(date, state.localSettings.unlockedDates),
    shrinkLevel: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4s
        ? 2
        : state.windowSize.width < themeCustomData.custom.breakpoints.col4
          ? 1
          : 0,
    bodyWeightUnit: state.remoteSettings.view.bodyWeightUnit,
    mainBarHeight: state.windowSize.width < breakpoints.col4s
      ? mainBarHeight.downCol4s
      : mainBarHeight.upCol4s,
    showSummaryTutorial: Boolean(
      !state.remoteSettings.view.flags.daySummaryIsShowed &&
      state.days.length === 1 &&
      state.days[0].consumed.length === 1),
    loggedIn: !!auth.authorized,
    dayInfo: dih.findDay(state.localSettings.selectedDate, state.days),
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onCopyFromDay: (fromDate: string, toDate: string) =>
      dispatch(copyDay(fromDate, toDate)),
    onChangeDate: (date: string) =>
      dispatch(changeLocalSettings({selectedDate: date})),
    onUnlockDay: (date) => dispatch(unlockPastDay(date)),
    onShowNutrientsSumSetDialog: () =>
      dispatch(changeLocalSettings({nutrSumSetDialog: true})),
    onChangeDay: (date, changes) => dispatch(changeDay({...changes, date})),
    onChangeDayBodyWeightInfo: (point) => dispatch(changeBodyWeightInfo(point)),
    onChangeFlags: (changes) => dispatch(changeFlags(changes)),
    onUndo: (date) => dispatch(undoLastDayChange(date)),
    onClearDay: (date) => {
      dispatch(changeDay({date, consumed: []}));
      dispatch(showPopupMessage({
        text: 'Day was cleared',
        actionButton: {
          caption: 'Undo',
          actions: [undoLastDayChange(date)],
        },
      }));
    },
    onAddSavedMeal: (date: string, time: number, consumedProducts: Array<ConsumedProduct>) => {
      dispatch(changeLocalSettings({ addSavedMeal: { date, time, consumedProducts }}));
    },
  };
}

export const GcDaySummaryContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropsProcessorHoc);
