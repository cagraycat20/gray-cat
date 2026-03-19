import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  StoreState,
  themeCustomData,
} from '..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-nutrients-summary.types';
import { GcNutrientsSummaryViewStyled } from './gc-nutrients-summary.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
    nutrientsDisplay:
      ownProps.customNutrientsDisplay || state.remoteSettings.view.nutrientsDisplay,
    bodyWeightUnit: state.remoteSettings.view.bodyWeightUnit,
    compact: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {};
}

export const GcNutrientsSummaryContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcNutrientsSummaryViewStyled);
