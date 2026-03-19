// declare module 'react-swipeable-views-utils' {
declare module 'react-swipeable-views-utils' {
  import ReactSwipeableViews, {
    SwipeableViewsProps,
  } from 'react-swipeable-views';

  export interface VirtualizedSlideRendererParams {
    index: number;
    key: number;
  }

  interface VirtualizedComponentProps extends SwipeableViewsProps {
    index?: number;
    onChangeIndex?: (currentIndex: number, prevIndex: number) => void;
    onTransitionEnd?: () => void;
    overscanSlideAfter?: number;
    overscanSlideBefore?: number;
    slideCount?: number;
    slideRenderer?: (params: VirtualizedSlideRendererParams) => JSX.Element;
  }

  interface VirtualizedComponentState {
    indexContainer: number;
    indexStart: number;
    indexStop: number;
  }

  class VirtualizedComponent extends React.Component<VirtualizedComponentProps, VirtualizedComponentState> {
    public handleChangeIndex(indexContainer: number, indexLatest: number): void;
    public handleTransitionEnd(): void;
    public setIndex(index: number, indexContainer: number, indexDiff: number): void;
    public setWindow(index: number): void;
  }

  export function virtualize(component: typeof ReactSwipeableViews): typeof VirtualizedComponent;
  export function bindKeyboard(component: typeof VirtualizedComponent): typeof VirtualizedComponent;
  export default virtualize;
}
