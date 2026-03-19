import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '..';
import { changeLocalSettings, loadDays } from '../../actions';
import { dateUtils, themeCustomData } from '../../shared';
import { ReduxDispatchProps, ReduxStateProps } from './gc-graph.types';
import { GcGraphViewStyled } from './gc-graph.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    days: state.days,
    products: state.products,
    bodyWeightPoints: state.remoteSettings.view.bodyWeightPoints,
    bodyWeightUnit: state.remoteSettings.view.bodyWeightUnit,
    selectedDate: state.localSettings.selectedDate,
    mobileLayout: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4s,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    loadGraphData: (date: Date) => {
      const [from, to] = dateUtils.yearRange(date).map((item) => dateUtils.getFormattedDate(item));
      dispatch(loadDays(from, to));
    },
    goToDate: (date: Date) => dispatch(
      changeLocalSettings({selectedDate: dateUtils.getFormattedDate(date)}),
    ),
  };
}

export const GcGraphContainer = connect(mapStateToProps, mapDispatchToProps)(GcGraphViewStyled);
