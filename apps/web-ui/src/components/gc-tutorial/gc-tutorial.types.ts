
export interface OwnProps {
  onRenderContent: () => JSX.Element;
  onClose: () => void;
}

export interface ReduxStateProps {
}

export interface ReduxDispatchProps {
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
