export interface OwnProps {
  anchor?: HTMLElement;
  onMealSelected: (time: number) => void;
  onClose: () => void;
}

export interface ReduxStateProps {
  meals: Array<number>;
}

export interface ReduxDispatchProps {
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
