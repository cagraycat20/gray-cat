import React from 'react';
import { logRender } from '../../../utils';

interface Props {
  width: number;
  height: number;
  className?: string;
  onMarkChange: (xPos: number) => void;
  markPos: number;
}

interface State {
}

export class GcScrollBoxMobile extends React.Component<Props, State> {
  private containerRef: React.RefObject<HTMLDivElement>;
  private initialPosSet = false;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
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
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
          onScroll={this.markPositionChange}
          ref={this.containerRef}
        >
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            height,
            borderLeft: 'dashed 1px black',
            pointerEvents : 'none',
            opacity: 0.3,
            left: this.getMarkLeft(),
            zIndex: 1,
          }}
        />
      </>
    );
  }

  private setMarkPos = () => {
    if (this.props.markPos && !this.initialPosSet) {
      requestAnimationFrame(() => {
        if (this.containerRef.current) {
          this.containerRef.current.scrollLeft = this.props.markPos - this.getMarkLeft();
          this.markPositionChange();
        }
      });
      this.initialPosSet = true;
    }
  }

  private markPositionChange = () => {
    if (this.containerRef.current) {
      this.props.onMarkChange(this.containerRef.current.scrollLeft + this.getMarkLeft());
    }
  }

  private getMarkLeft = () => this.props.width / 2;

}
