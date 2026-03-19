import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '../..';
import { showPopupMessage } from '../../../actions';
import { ReduxDispatchProps, ReduxStateProps } from './gc-users.types';
import { GcUsersViewStyled } from './gc-users.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    showPopupMessage: (message) => dispatch(showPopupMessage(message)),
  };
}

export const GcUsersContainer =
  connect<ReduxStateProps, ReduxDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(GcUsersViewStyled);
