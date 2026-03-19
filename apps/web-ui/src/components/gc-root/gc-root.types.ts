export interface OwnProps {}

export interface ReduxStateProps {
  mobileLayout: boolean;
  showIntro: boolean;
}

export interface ReduxDispatchProps {
  onResize: (height: number, width: number) => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
