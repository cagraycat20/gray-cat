import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeLocalSettings,
  changePricesDialog,
  StoreState,
  themeCustomData,
} from '..';
import { changeFoodComparisonDialog, changeIntakeSugarDialog, changeRemoteSettings } from '../../actions';
import auth from '../../services/Auth';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-main-bar.types';
import { GcMainBarViewStyled } from './gc-main-bar.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    userName: auth.name,
    userEmail: auth.email,
    avatarUrl: auth.picture,
    loggedIn: auth.authorized,
    showNutrients: state.remoteSettings.view.showNutrients,
    bodyWeightUnit: state.remoteSettings.view.bodyWeightUnit,
    pricesSuffix: state.remoteSettings.view.priceSuffix,
    isAdmin: state.remoteSettings.isAdmin,
    meals: state.remoteSettings.view.meals.sort((first, second) => first - second),
    canInstallApp: state.localSettings.canInstallApp,
    menuMode: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4s,
  };
}

export function mapDispatchToProps(
  dispatch: Dispatch<Action>, ownProps: OwnProps,
): ReduxDispatchProps {
  return {
    onLogIn: () => auth.login(),
    onLogOut: () => auth.logout(),
    onChangeRemoteSettings: (changes) => dispatch(changeRemoteSettings(changes)),
    onShowPricesDialog: () => dispatch(changePricesDialog({open: true})),
    onShowFoodComparisonDialog: () => dispatch(changeFoodComparisonDialog({open: true})),
    onShowLoginOfferDialog: () => dispatch(changeLocalSettings({notLoggedInFeatureDenial: true})),
    onShowIntakeSugarDialog: () => dispatch(changeIntakeSugarDialog({open: true})),
  };
}

export const GcMainBarContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcMainBarViewStyled);
