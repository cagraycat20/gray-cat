import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '../../types';
import { ReduxDispatchProps, ReduxStateProps } from './gc-date-selector.types';
import { GcDateSelectorViewStyled } from './gc-date-selector.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const GcDateSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(GcDateSelectorViewStyled);
