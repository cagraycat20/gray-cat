import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeFavoriteSortOrder,
  changeLocalSettings,
  productHelper as ph,
  showPopupMessage,
  StoreState,
} from '../..';
import { changeRemoteSettings } from '../../../actions';
import auth from '../../../services/Auth';
import { usu } from '../../../utils';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-product-list-base.types';
import { GcProductListBaseViewStyled } from './gc-product-list-base.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    favorites: state.remoteSettings.view.favorites,
    products: ph.getProductsToDisplay(state.products, state.remoteSettings.isAdmin),
    windowHeight: state.windowSize.height,
    loggedIn: auth.authorized,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
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
    onChangeFavoriteSortOrder: (productId, targetProductId) =>
      dispatch(changeFavoriteSortOrder(productId, targetProductId)),
    onShowLoginOfferDialog: () =>
      dispatch(changeLocalSettings({notLoggedInFeatureDenial: true})),
  };
}

export const GcProductListBaseContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
)(GcProductListBaseViewStyled);
