import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeLocalSettings,
  productHelper,
  productHelper as ph,
  StoreState,
  themeCustomData,
} from '..';
import { Product } from '..';
import { postProductComplete, showPopupMessage } from '../../actions';
import { GcEditProductDialogHoc } from './gc-edit-product-dialog.hoc';
import {
  ReduxDispatchPropsHoc,
  ReduxStateProps,
} from './gc-edit-product-dialog.types';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    product: (
      state.localSettings.editingProduct &&
      !state.localSettings.editingProduct.ingredients &&
      state.localSettings.editingProduct
    ) || undefined,
    products: ph.getProductsToDisplay(state.products, state.remoteSettings.isAdmin),
    isAdmin: state.remoteSettings.isAdmin,
    mobileLayout: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4sWithFavorites,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchPropsHoc {
  return {
    onClose: () =>
      dispatch(changeLocalSettings({editingProduct: null})),

    onPostProductComplete: (product: Product) =>
      dispatch(postProductComplete(product)),

    onCopyProduct: (originalProduct: Product) =>
      dispatch(changeLocalSettings({editingProduct: productHelper.cloneProduct(originalProduct)})),

    onError: (text) => {
      dispatch(showPopupMessage({text}));
    },
  };
}

export const GcEditProductDialogContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcEditProductDialogHoc);
