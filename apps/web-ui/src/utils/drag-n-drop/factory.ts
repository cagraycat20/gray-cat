import * as DnD from 'react-dnd';

export interface DndSourceInjectedProps {
  connectDragSource: DnD.ConnectDragSource;
  connectDragPreview: DnD.ConnectDragPreview;
}

export interface DnDSourceProps {
  onBeginDrag?: (props: object) => object;
  onEndDrag?: (props: object) => void;
}

type ReactComp<P> = React.ComponentClass<P> | React.StatelessComponent<P>;

// drag only
export function dragAndDropSource<P>(identifier: string):
 (componentClass: ReactComp<P>) => DnD.DndComponentClass<P> {

  const collectDrag = (connect: DnD.DragSourceConnector, monitor: DnD.DragSourceMonitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    };
  };

  const dragSourceSpec = {
    beginDrag(props: P & DnDSourceProps) {
      return props.onBeginDrag ? props.onBeginDrag(props) : {};
    },
    endDrag(props: P & DnDSourceProps) {
      if (props.onEndDrag) {
        props.onEndDrag(props);
      }
    },
  };

  return (wrappedComponent: ReactComp<P>) => {
    return DnD.DragSource(
      identifier,
      dragSourceSpec,
      collectDrag,
    )(wrappedComponent);
  };
}

export interface DnDTargetProps {
  onDndDrop?: (props: DnDTargetProps, monitor: DnD.DropTargetMonitor, component: React.Component) => void;
  canDrop?: (props: object, monitor?: DnD.DropTargetMonitor) => boolean;
}

export interface DnDTargetViewProps {
  connectDropTarget: DnD.ConnectDropTarget;
  dndIsOver: boolean;
  dndCanDrop: boolean;
  dndMonitor: DnD.DropTargetMonitor;
}

// drop only
export function dragAndDropTarget<P extends DnDTargetProps>(identifiers: Array<string>):
  (componentClass: ReactComp<P>) => DnD.DndComponentClass<P> {

  const collectDrop: (connect: DnD.DropTargetConnector, monitor: DnD.DropTargetMonitor) =>
    DnDTargetViewProps = (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      dndIsOver: monitor.isOver(),
      dndCanDrop: monitor.canDrop(),
      dndMonitor: monitor,
    };
  };

  const dropTargetSpec = {
    drop(props: P, monitor: DnD.DropTargetMonitor, component: React.Component<P>) {
      if (props.onDndDrop) {
        return props.onDndDrop(props, monitor, component);
      } else {
        console.warn('onDndDrop is not assigned'); // tslint:disable-line no-console
        return;
      }
    },
    canDrop(props: P, monitor: DnD.DropTargetMonitor): boolean {
      return props.canDrop ? props.canDrop(props, monitor) : true;
    },
  };

  return (wrappedComponent) => {
    return DnD.DropTarget<P>(
      identifiers,
      dropTargetSpec,
      collectDrop,
    )(wrappedComponent);
  };
}

// drag + drop
export function dragAndDrop<P>(dragIdentifier: string, dropIdentifiers: Array<string>) {
  return (wrappedComponent: ReactComp<P>) => {
    return dragAndDropTarget<P>(dropIdentifiers)(
      dragAndDropSource<P>(dragIdentifier)(
        wrappedComponent,
      ),
    );
  };
}
