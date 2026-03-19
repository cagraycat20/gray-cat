import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeRemoteSettings,
  StoreState,
} from '../..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-product-list-dialog-header.types';
import { GcProductListDialogHeaderViewStyled } from './gc-product-list-dialog-header.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    showNutrients: state.remoteSettings.view.showNutrients,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onChangeRemoteSettings: (changes) => dispatch(changeRemoteSettings(changes)),
  };
}

export const GcProductListDialogHeaderContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcProductListDialogHeaderViewStyled);
