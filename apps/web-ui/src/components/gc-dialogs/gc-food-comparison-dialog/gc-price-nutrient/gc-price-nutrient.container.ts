import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import { StoreState } from '../../..';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-price-nutrient.types';
import { GcPriceNutrientViewStyled } from './gc-price-nutrient.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    currency: state.remoteSettings.view.priceSuffix,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcPriceNutrientContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcPriceNutrientViewStyled);
