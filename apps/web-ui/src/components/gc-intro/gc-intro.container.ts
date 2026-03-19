import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
  changeFlags,
} from '..';
import {
  ReduxDispatchProps,
} from './gc-intro.types';
import { GcIntroViewStyled } from './gc-intro.view';

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onHide: () => dispatch(changeFlags({introIsShowed: true})),
  };
}

export const GcIntroContainer =
  connect(
    null,
    mapDispatchToProps,
)(GcIntroViewStyled);
