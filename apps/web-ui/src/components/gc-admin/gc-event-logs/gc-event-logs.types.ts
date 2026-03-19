import { PopupMessage } from '../..';

export interface OwnProps {
}

export interface ReduxStateProps {
}

export interface ReduxDispatchProps {
  showPopupMessage: (message: PopupMessage) => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
