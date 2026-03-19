import { MouseEvent, PointerEvent, WheelEvent } from 'react';
import React from 'react';
import { browserHelper, logRender } from '../../../utils';

interface Props {
  width: number;
  height: number;
  className?: string;
  onMarkChange: (xPos: number) => void;
  onDoubleClick: (xPos: number) => void;
  markPos: number;
}

interface State {
}

export class GcScrollBoxDesktop extends React.Component<Props, State> {
  private dragging = false;
  private containerRef: React.RefObject<HTMLDivElement>;
  private markRef: React.RefObject<HTMLDivElement>;
  private lastClientX = 0;
  private initialPosSet = false;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
    this.markRef = React.createRef();
  }

  public render() {
    logRender(this);
    const {className, width, height, children} = this.props;
    this.setMarkPos();
    return (
      <>
        <div
          className={className}
          style={{
            width,
            height,
            overflowY: 'hidden',
            // sj at firefox onPointerMove conflicts with scrollbar drag, so just hide scrollbar for now
            overflowX: browserHelper.isFirefox() ? 'hidden' : 'auto',
            cursor: 'crosshair',
          }}
          onScroll={this.updateMarkPosition}
          ref={this.containerRef}
          onPointerUp={this.pointerUpHandler}
          onPointerMove={this.pointerMoveHandler}
          onMouseMove={this.mouseMoveHandler}
          onPointerDown={this.pointerDownHandler}
          onMouseEnter={this.showMark}
          onMouseLeave={this.hideMark}
          onDoubleClick={this.doubleClickHandler}
          onWheel={this.wheelHandler}
        >
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: 1,
            height,
            borderLeft: 'dashed 1px black',
            pointerEvents : 'none',
            opacity: 0.3,
            zIndex: 1,
          }}
          ref={this.markRef}
        />
      </>
    );
  }

  public componentWillReceiveProps(props: Props) {
    if (props.width !== this.props.width) {
      this.initialPosSet = false;
    }
  }

  private wheelHandler = (e: WheelEvent<HTMLDivElement>) => {
    if (this.containerRef.current && !this.dragging)  {
      e.preventDefault();
      e.stopPropagation();
      this.containerRef.current.scrollLeft +=
        browserHelper.wheelDeltaToPx(e.deltaY, e.deltaMode);
    }
    this.mouseMoveHandler(e);
  }

  private pointerDownHandler = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse')  {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);

      this.dragging = true;
      this.lastClientX = e.clientX;
    }
  }

  private updateMarkPosition = () => {
    if (this.containerRef.current && this.markRef.current) {
      const xPos = this.markRef.current.getBoundingClientRect().left -
        this.containerRef.current.getBoundingClientRect().left;
      this.markPositionChange(xPos);
    }
  }

  private pointerMoveHandler = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      if (this.containerRef.current && this.dragging) {
        e.preventDefault();
        e.stopPropagation();
        this.containerRef.current.scrollLeft += (this.lastClientX - e.clientX);
        this.lastClientX = e.clientX;
      }
      this.mouseMoveHandler(e);
    }
  }
  private mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!this.dragging && this.containerRef.current && this.markRef.current) {
      const xPos = Math.min(
        e.clientX - this.containerRef.current.getBoundingClientRect().left,
        this.props.width,
      );
      this.markRef.current.style.left = `${xPos}px`;
      this.markPositionChange(xPos);
    }
  }

  private pointerUpHandler = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.releasePointerCapture(e.pointerId);
      this.dragging = false;
    }
  }

  private showMark = () => {
    if (this.markRef.current) {
      this.markRef.current.style.opacity = '0.3';
    }
  }

  private hideMark = () => {
    if (this.markRef.current) {
      this.markRef.current.style.opacity = '0';
    }
  }

  private doubleClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const {onDoubleClick} = this.props;
    if (onDoubleClick && this.containerRef.current) {
      const xPos = Math.min(
        e.clientX - this.containerRef.current.getBoundingClientRect().left,
        this.props.width,
      );
      onDoubleClick(this.containerRef.current.scrollLeft + xPos);
    }
  }

  private setMarkPos = () => {
    if (this.props.markPos && !this.initialPosSet) {
      requestAnimationFrame(() => {
        if (this.markRef.current && this.containerRef.current) {
          let xPos = this.props.markPos;
          this.markRef.current.style.opacity = '0.3';
          this.containerRef.current.scrollLeft = Math.min(
            xPos - this.containerRef.current.clientWidth / 2,
            this.containerRef.current.scrollWidth,
          );
          xPos -= this.containerRef.current.scrollLeft;
          this.markRef.current.style.left = `${xPos}px`;
          this.markPositionChange(xPos);
        }
      });
      this.initialPosSet = true;
    }
  }

  private markPositionChange = (xPos: number) => {
    if (this.containerRef.current) {
      this.props.onMarkChange(this.containerRef.current.scrollLeft + xPos);
    }
  }

}
