import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-roadmap.types';
import { GcRoadmapViewStyled } from './gc-roadmap.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcRoadmapContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcRoadmapViewStyled);
