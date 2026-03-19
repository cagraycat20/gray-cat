import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeLocalSettings,
  StoreState,
} from '..';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-unregistered-usage-warning.types';
import { GcUnregisteredUsageWarningView } from './gc-unregistered-usage-warning.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    canOpen: state.localSettings.notLoggedInWarning,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onDontRemind: () => dispatch(changeLocalSettings({notLoggedInWarning: false})),
  };
}

export const GcUnregisteredUsageWarningContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcUnregisteredUsageWarningView);
