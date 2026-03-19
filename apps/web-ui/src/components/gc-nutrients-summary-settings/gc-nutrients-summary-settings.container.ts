import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeLocalSettings,
  changeRemoteSettings,
  StoreState,
  themeCustomData,
} from '..';
import { usu } from '../../utils';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-nutrients-summary-settings.types';
import {
  GcNutrientsSummarySettingsViewStyled,
} from './gc-nutrients-summary-settings.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    nutrientsDisplay: state.remoteSettings.view.nutrientsDisplay,
    bodyWeightUnit: state.remoteSettings.view.bodyWeightUnit,
    open: state.localSettings.nutrSumSetDialog,
    compact: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4,
    date: state.localSettings.selectedDate,
    days: state.days,
    products: state.products,
    bodyWeightPoints: state.remoteSettings.view.bodyWeightPoints,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onSubmit: (nutrientsDisplay) =>
      dispatch(changeRemoteSettings(usu.setNutrientsDisplay(nutrientsDisplay))),
    onClose: () => dispatch(changeLocalSettings({nutrSumSetDialog: false})),
  };
}

export const GcNutrientsSummarySettingsContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcNutrientsSummarySettingsViewStyled);
