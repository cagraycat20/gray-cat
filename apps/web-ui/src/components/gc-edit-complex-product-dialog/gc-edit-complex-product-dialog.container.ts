import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  postProductComplete,
  Product,
  productHelper as ph,
  showPopupMessage,
  StoreState,
} from '..';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-edit-complex-product-dialog.types';
import {
  GcEditComplexProductDialogViewStyled,
} from './gc-edit-complex-product-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: ph.getProductsToDisplay(state.products, state.remoteSettings.isAdmin),
    editingProduct: (
      state.localSettings.editingProduct &&
      state.localSettings.editingProduct.ingredients &&
      state.localSettings.editingProduct
    ) || undefined,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onPostProductComplete: (product: Product) =>
      dispatch(postProductComplete(product)),
    onClose: () =>
      dispatch(changeLocalSettings({editingProduct: null})),
    onError: (text) => {
      dispatch(showPopupMessage({text}));
    },
  };
}

export const GcEditComplexProductDialogContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcEditComplexProductDialogViewStyled);
