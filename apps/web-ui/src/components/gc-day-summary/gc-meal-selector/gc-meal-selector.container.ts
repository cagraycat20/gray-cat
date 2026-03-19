import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '../../../types';
import { dayInfoHelper as dih } from '../../../utils';
import { OwnProps, ReduxDispatchProps, ReduxStateProps } from './gc-meal-selector.types';
import { GcMealSelectorViewStyled } from './gc-meal-selector.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  const day = dih.findDay(state.localSettings.selectedDate, state.days);

  return {
    meals: dih.determineMeals(state.remoteSettings.view.meals, day).sort((first, second) => first - second),
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcMealSelectorContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GcMealSelectorViewStyled);
