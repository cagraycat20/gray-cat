export interface OwnProps {
  onSelectDay?: (date: string) => void;
}

export interface ReduxStateProps {
  date: string;
}

export interface ReduxDispatchProps {
  loadDays: (from: string, to: string) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
