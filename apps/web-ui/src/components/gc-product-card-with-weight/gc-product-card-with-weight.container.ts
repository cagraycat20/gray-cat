import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeLocalSettings,
  productHelper as ph,
  showPopupMessage,
  StoreState,
 } from '..';
import { changeRemoteSettings } from '../../actions';
import { usu } from '../../utils';
import { GcProductCardWithWeightDnd } from './gc-product-card-with-weight.dnd';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-product-card-with-weight.types';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    product: ph.findProduct(state.products, ownProps.productId) || ph.createProduct(),
    inFavorites: Boolean(
      state.remoteSettings.view.favorites
        .find((prodIdIter) => prodIdIter === ownProps.productId),
    ),
    showNutrients: state.remoteSettings.view.showNutrients,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onAddToFavorites : (product) => {
      dispatch(changeRemoteSettings(usu.addFavorite(product.id)));
      dispatch(showPopupMessage({
        text: `"${product.name}" was added to favorites`,
        actionButton: {
          actions: [changeRemoteSettings(usu.deleteFavorite(product.id))],
          caption: 'Undo',
        },
      }));
    },
    onEditProduct: (product) =>
      dispatch(changeLocalSettings({editingProduct: product})),
    afterScrollToProduct: () =>
      dispatch(changeLocalSettings({productToScrollTo: undefined})),
  };
}

export const GcProductCardWithWeightContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
)(GcProductCardWithWeightDnd);
