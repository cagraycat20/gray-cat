import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  StoreState,
} from '..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-dialogs.types';
import { GcDialogsView } from './gc-dialogs.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    notLoggedInFeatureDenial: state.localSettings.notLoggedInFeatureDenial,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onCloseLoginOffer: () =>
      dispatch(changeLocalSettings({notLoggedInFeatureDenial: false})),
  };
}

export const GcDialogsContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcDialogsView);
