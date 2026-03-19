import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import { StoreState } from '..';
import auth from '../../services/Auth';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-login-offer-dialog.types';
import { GcLoginOfferDialogViewStyled } from './gc-login-offer-dialog.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onLogIn: () => auth.login(),
  };
}

export const GcLoginOfferDialogContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcLoginOfferDialogViewStyled);
