import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { changeLocalSettings, StoreState } from '../..';
import {
  GcAdminProductsViewStyled,
} from './gc-admin-products.view';

import { showPopupMessage } from '../../../actions';
import { importProducts, removeProduct } from '../../../actions/products.actions';
import { ReduxDispatchProps, ReduxStateProps } from './gc-admin-products.types';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    removeProduct: ({id}) => dispatch(removeProduct(id)),
    importProducts: (products) => dispatch(importProducts(products)),
    onEditProduct: (product) => dispatch(changeLocalSettings({editingProduct: product})),
    showPopupMessage: (message) => dispatch(showPopupMessage(message)),
  };
}

export const GcAdminProductsContainer =
  connect<ReduxStateProps, ReduxDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(GcAdminProductsViewStyled);
