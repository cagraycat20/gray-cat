import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  StoreState,
} from '../..';
import { changePricesDialog } from '../../../actions';
import { Product } from '../../../types';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-food-comparison-dialog.types';
import { GcFoodComparisonDialogViewStyled } from './gc-food-comparison-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: state.products,
    settings: state.localSettings.foodComparisonDialog,
    favorites: state.remoteSettings.view.favorites,
    prices: state.remoteSettings.view.prices,
    currency: state.remoteSettings.view.priceSuffix,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onChangeSettings: (settings) => dispatch(changeLocalSettings({foodComparisonDialog: settings})),
    onShowPricesDialog: (productId: Product['id']) => dispatch(changePricesDialog({open: true, productId})),
  };
}

export const GcFoodComparisonDialogContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcFoodComparisonDialogViewStyled);
