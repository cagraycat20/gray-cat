import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  productHelper as ph,
  StoreState,
} from '../..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-product-card-dnd-preview.types';
import { GcProductCardDndPreviewViewStyled } from './gc-product-card-dnd-preview.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  const { item } = ownProps;
  let product;
  // let weight;
  let fromMeal;
  if (item && item.productId) {
    product = ph.findProduct(state.products, item.productId);
    fromMeal = item.fromMeal;
    // weight = item.productWeight;
  }
  return {
    product,
    fromMeal,
    // weight,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcProductCardDndPreviewContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcProductCardDndPreviewViewStyled);
