import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { changeLocalSettings } from '../../../actions';
import { StoreState } from '../../../types';
import { ReduxDispatchProps, ReduxStateProps } from './gc-intake-sugar-dialog.types';
import { GcIntakeSugarDialogViewStyled } from './gc-intake-sugar-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    products: state.products,
    settings: state.localSettings.intakeSugarDialog,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onChangeSettings: (settings) => dispatch(changeLocalSettings({ intakeSugarDialog: settings })),
  };
}

export const GcIntakeSugarDialogContainer =
  connect(mapStateToProps, mapDispatchToProps)(GcIntakeSugarDialogViewStyled);
