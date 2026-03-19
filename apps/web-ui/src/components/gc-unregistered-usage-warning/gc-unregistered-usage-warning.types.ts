export interface OwnProps {
}

export interface ReduxStateProps {
  canOpen: boolean;
}

export interface ReduxDispatchProps {
  onDontRemind: () => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
