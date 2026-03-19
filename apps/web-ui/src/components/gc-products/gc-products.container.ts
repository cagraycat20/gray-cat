import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeDayProductWeight,
  changeDndState,
  changeLocalSettings,
  productHelper as ph,
  showPopupMessage,
  StoreState,
} from '..';
import { changeFavoriteSortOrder, changeRemoteSettings } from '../../actions';
import auth from '../../services/Auth';
import { usu } from '../../utils';
import { GcProductsHoc } from './gc-products.props-hoc';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxHocStateProps,
} from './gc-products.types';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxHocStateProps {
  return {
    favorites: state.remoteSettings.view.favorites,
    products: ph.getProductsToDisplay(state.products, state.remoteSettings.isAdmin),
    dndProduct: state.dndState.dndProduct,
    date: state.localSettings.selectedDate,
    productList: ownProps.dialogMode
      ? state.localSettings.productListDialog
      : state.localSettings.productList,
    days: state.days,
    windowHeight: state.windowSize.height,
    meals: state.remoteSettings.view.meals,
    loggedIn: auth.authorized,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onStartDrag: (dndProduct) => dispatch(changeDndState({dndProduct})),
    onEndDrag: () => dispatch(changeDndState({dndProduct: null})),
    onAddProductToMeal: ({productId,
      productWeight, date, mealTime, showWeightInput}) => {
      dispatch(changeLocalSettings({productToScrollTo: {
        productId, showWeightInput, mealTime,
      }}));
      dispatch(changeDayProductWeight({
        productId,
        productWeight,
        date,
        mealTime,
      }));
    },
    onRemoveProductFromMeal: (productId, date, mealTime ) => {
      dispatch(changeDayProductWeight({
        productId,
        productWeight: 0,
        date,
        mealTime,
        replace: true,
      }));
    },
    onRemoveFromFavorites: (productId, productName) => {
      dispatch(changeRemoteSettings(usu.deleteFavorite(productId)));
      dispatch(showPopupMessage({
        text: `"${productName}" removed from favorites`,
        actionButton: {
          actions: [changeRemoteSettings(usu.addFavorite(productId))],
          caption: 'Undo',
        },
      }));
    },
    onAddToFavorites: (productId, productName) => {
      dispatch(changeRemoteSettings(usu.addFavorite(productId)));
      dispatch(showPopupMessage({
        text: `"${productName}" was added to favorites`,
        actionButton: {
          actions: [changeRemoteSettings(usu.deleteFavorite(productId))],
          caption: 'Undo',
        },
      }));
    },
    onEditProduct: (product) =>
      dispatch(changeLocalSettings({editingProduct: product})),
    onChangeProductList: (productList, dialogMode) => {
      if (dialogMode) {
        dispatch(changeLocalSettings({productListDialog: productList}));
      } else {
        dispatch(changeLocalSettings({productList}));
      }
    },
    onChangeFavoriteSortOrder: (productId, targetProductId) =>
      dispatch(changeFavoriteSortOrder(productId, targetProductId)),
    onShowLoginOfferDialog: () =>
      dispatch(changeLocalSettings({notLoggedInFeatureDenial: true})),
  };
}

export const GcProductsContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
)(GcProductsHoc);
