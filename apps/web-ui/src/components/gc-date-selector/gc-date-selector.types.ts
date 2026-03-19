export interface OwnProps {
  invokeSelectedPeriod: boolean;
  onPeriodSelected: (from: Date, to: Date) => void;
}

export interface ReduxStateProps {
}

export interface ReduxDispatchProps {
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
