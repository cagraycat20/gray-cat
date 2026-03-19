import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  StoreState,
} from '../..';
import { changeRemoteSettings } from '../../../actions';
import { Hint } from '../../../types';
import { usu } from '../../../utils';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-hint-dialog.types';
import { GcHintDialogViewStyled } from './gc-hint-dialog.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    hint: state.localSettings.hint,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, state: ReduxStateProps): ReduxDispatchProps {
  return {
    onClose: () => dispatch(changeLocalSettings({ hint: null })),
    onAddHiddenHint: (hint: Hint) => {
      dispatch(changeRemoteSettings(usu.addHiddenHint(hint.id)));
    },
  };
}

export const GcHintDialogContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcHintDialogViewStyled);
