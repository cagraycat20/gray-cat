import * as React from 'react';
import { connect  } from 'react-redux';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { StoreState } from '..';
import {
  GcDragLayerItemContainer as GcDragLayerItem,
} from './gc-drag-layar-item';

const styles: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 9999,
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  backgroundColor: 'red',
};

export type PositionMonitor =  null |
  ((x: number, y: number, dragging: boolean) => void);

interface ReduxStateProps {
  dragging: boolean;
}

interface Props extends ReduxStateProps  {
  onRegisterPositionMonitor: (monitor: PositionMonitor) => void;
}

interface State {
  x: number;
  y: number;
  dragging: boolean;
}

export class GcDragLayerView extends
  React.PureComponent<Props, State> {

  // there is no 100% that root.dragEnd will fire
  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    return {
      dragging: prevState.dragging && nextProps.dragging,
    };
  }

  public state = {
    x: 0,
    y: 0,
    dragging: false,
  };

  private positionHandler$ = new Subject();

  public componentDidMount() {
    this.positionHandler$
    .pipe(throttleTime(0))
    .subscribe(({x, y, dragging}) => this.setState({x, y, dragging}));
    this.props.onRegisterPositionMonitor(this.positionHandler);
  }

  public componentWillUnmount() {
    this.props.onRegisterPositionMonitor(null);
    this.positionHandler$.unsubscribe();
  }

  public render() {
    // logRender(this);
    if (this.state.dragging) {
      const transform = `translate3d(${this.state.x}px, ${this.state.y}px, 0)`;
      return (
        <div
          style={{
            ...styles,
            transform,
            WebkitTransform: transform,
          }}
        >
          <GcDragLayerItem />
        </div>
      );
    }
    return null;
  }

  private positionHandler: PositionMonitor = (x, y, dragging) => {
    if (!dragging) {
      this.setState({x, y, dragging: false});
    } else {
      this.positionHandler$.next({x, y, dragging});
    }
  }
}

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    dragging: Boolean(state.dndState.dndProduct),
  };
}

export const GcDragLayerContainer =
  connect(
    mapStateToProps,
)(GcDragLayerView);
