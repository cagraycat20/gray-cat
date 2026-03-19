export interface State {
  style?: React.CSSProperties;
}

export interface Props {
  className: string;
  onGetApplyStyleCallback?: (callback: (style: State['style']) => void) => void;
}
