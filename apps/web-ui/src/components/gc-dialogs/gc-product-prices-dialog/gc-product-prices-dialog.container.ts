import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  productHelper as ph,
  StoreState,
} from '../..';
import { changeRemoteSettings, UsiPrice } from '../../../actions';
import { usu } from '../../../utils';
import {
  ProductPriceChange,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-product-prices-dialog.types';
import { GcProductPricesDialogViewStyled } from './gc-product-prices-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: ph.getProductsToDisplay(state.products, state.remoteSettings.isAdmin),
    prices: state.remoteSettings.view.prices,
    settings: state.localSettings.pricesDialog,
    favorites: state.remoteSettings.view.favorites,
    priceSuffix: state.remoteSettings.view.priceSuffix,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onUpdateProductPrices: (changes) => {
      const newSettings = changes.reduce(
        (acc: Array<UsiPrice>, {deleted, ...productPrice}: ProductPriceChange) => {
          if (deleted) {
            return [...acc, ...usu.deletePrice(productPrice)];
          } else {
            return [...acc, ...usu.addPrice(productPrice)];
          }
        },
        [],
      );
      dispatch(changeRemoteSettings(newSettings));
    },
    onChangeSettings: (settings) =>
      dispatch(changeLocalSettings({pricesDialog: settings})),
  };
}

export const GcProductPricesDialogContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcProductPricesDialogViewStyled);
