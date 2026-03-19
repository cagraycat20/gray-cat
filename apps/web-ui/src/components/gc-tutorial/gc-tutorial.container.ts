import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { StoreState } from '..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-tutorial.types';
import { GcTutorialViewStyled } from './gc-tutorial.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcTutorialContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcTutorialViewStyled);
