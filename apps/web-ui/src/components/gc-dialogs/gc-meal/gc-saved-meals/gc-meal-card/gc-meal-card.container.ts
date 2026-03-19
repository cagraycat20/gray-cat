import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  StoreState,
} from '../../../..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-meal-card.types';
import { GcMealCardViewStyled } from './gc-meal-card.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcMealCardContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GcMealCardViewStyled);
