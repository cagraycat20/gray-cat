export interface OwnProps {
  open: boolean;
  onClose: () => void;
}

export interface ReduxStateProps {
}

export interface ReduxDispatchProps {
  onSuccess: () => void;
  onError: () => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
