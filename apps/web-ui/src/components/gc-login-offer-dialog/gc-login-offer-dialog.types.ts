export interface OwnProps {
  open: boolean;
  title: string;
  text: string;
  cancelButtonText?: string;
  onClose: () => void;
  onCancel: () => void;
}

export interface ReduxStateProps {
}

export interface ReduxDispatchProps {
  onLogIn: () => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
