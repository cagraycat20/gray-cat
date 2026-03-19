import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { changePricesDialog } from '../../../actions';
import { Product, StoreState } from '../../../types';
import { ReduxDispatchProps, ReduxStateProps } from './gc-consumed-products-summary.types';
import { GcConsumedProductsSummaryViewStyled } from './gc-consumed-products-summary.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: state.products,
    prices: state.remoteSettings.view.prices,
    currency: state.remoteSettings.view.priceSuffix,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onShowPricesDialog: (productId: Product['id']) => dispatch(changePricesDialog({open: true, productId})),
  };
}

export const GcConsumedProductsSummaryContainer =
  connect(mapStateToProps, mapDispatchToProps)(GcConsumedProductsSummaryViewStyled);
