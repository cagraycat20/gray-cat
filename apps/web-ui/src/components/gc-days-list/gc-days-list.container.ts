import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  loadDays,
  StoreState,
} from '..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-days-list.types';
import { GcDaysListViewStyled } from './gc-days-list.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    date: state.localSettings.selectedDate,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    loadDays: (from, to) => dispatch(loadDays(from, to)),
  };
}

export const GcDaysListContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcDaysListViewStyled);
