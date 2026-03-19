import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '../..';
import { showPopupMessage } from '../../../actions';
import { ReduxDispatchProps, ReduxStateProps } from './gc-event-logs.types';
import { GcEventLogsViewStyled } from './gc-event-logs.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    showPopupMessage: (message) => dispatch(showPopupMessage(message)),
  };
}

export const GcEventLogsContainer =
  connect<ReduxStateProps, ReduxDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(GcEventLogsViewStyled);
