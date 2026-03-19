export interface OwnProps {
}

export interface ReduxStateProps {
  notLoggedInFeatureDenial: boolean;
}

export interface ReduxDispatchProps {
  onCloseLoginOffer: () => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
