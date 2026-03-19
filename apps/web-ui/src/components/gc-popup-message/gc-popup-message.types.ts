import { Action, Dispatch } from 'redux';
import { PopupMessage } from '..';

export interface ReduxStateProps {
  messages: Array<PopupMessage>;
}

export interface ReduxDispatchProps {
  onHideMessage: () => void;
  dispatch: Dispatch<Action>;
}

export interface Props extends ReduxStateProps, ReduxDispatchProps {
}
