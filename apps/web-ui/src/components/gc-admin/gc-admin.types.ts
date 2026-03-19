export interface OwnProps {
}

export interface ReduxStateProps {
  isAdmin?: boolean;
}

export interface ReduxDispatchProps {
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
