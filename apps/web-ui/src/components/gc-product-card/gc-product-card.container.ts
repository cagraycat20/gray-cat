import { connect } from 'react-redux';
import {
  productHelper,
  StoreState,
} from '..';
import { GcProductCardDnd } from './gc-product-card.dnd';
import {
  OwnProps,
  ReduxStateProps,
} from './gc-product-card.types';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  let product = ownProps.product;
  if (!product && ownProps.productId) {
    product = productHelper.findProduct(state.products, ownProps.productId);
  }
  return {
    product,
    showNutrients: state.remoteSettings.view.showNutrients,
  };
}

export const GcProductCardContainer = connect(
  mapStateToProps,
)(GcProductCardDnd);
