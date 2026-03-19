import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  removePopupMessage,
  StoreState,
} from '..';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-popup-message.types';
import { GcPopupMessageViewStyled } from './gc-popup-message.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    messages: state.popupMessages,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onHideMessage: () => dispatch(removePopupMessage()),
    dispatch,
  };
}

export const GcPopupMessageContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcPopupMessageViewStyled);
