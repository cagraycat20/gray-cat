import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import { StoreState } from '..';
import { showPopupMessage } from '../../actions';
import { upsError } from '../../utils';
import { GcFeedbackViewStyled } from '../gc-feedback/gc-feedback.view';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-feedback.types';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onSuccess: () => dispatch(showPopupMessage({text: 'Thank you for your feedback!'})),
    onError: () => dispatch(showPopupMessage({text: upsError})),
  };
}

export const GcFeedbackContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcFeedbackViewStyled);
