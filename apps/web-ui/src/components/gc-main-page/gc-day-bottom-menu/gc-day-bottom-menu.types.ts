export interface OwnProps {
}

export interface ReduxStateProps {
}

export interface ReduxDispatchProps {
  onChangeDate: (date: string) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
