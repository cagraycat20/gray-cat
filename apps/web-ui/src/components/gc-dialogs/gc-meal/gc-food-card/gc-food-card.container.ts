import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  StoreState,
} from '../../..';
import { productHelper as ph } from '../../../../utils';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-food-card.types';
import { GcFoodCardViewStyled } from './gc-food-card.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    food: state.products.find((value) => value.id === ownProps.productWeight.productId) || ph.createProduct(),
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcFoodCardContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GcFoodCardViewStyled);
