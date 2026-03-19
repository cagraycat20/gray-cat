import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '..';
import { ReduxDispatchProps, ReduxStateProps } from './gc-admin.types';
import { GcAdminViewStyled } from './gc-admin.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    isAdmin: state.remoteSettings.isAdmin,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcAdminContainer =
  connect<ReduxStateProps, ReduxDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(GcAdminViewStyled);
