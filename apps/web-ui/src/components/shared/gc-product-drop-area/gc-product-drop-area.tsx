import * as React from 'react';
import {
  DND_IDENTIFIERS,
  DnDTargetProps,
  DnDTargetViewProps,
  dragAndDropTarget,
} from '../..';
import { csn } from '../../../shared';

type Props = DnDTargetProps & JSX.IntrinsicElements['div'] & {
  isOverClass?: string;
  content?: (isOver: boolean, dndMonitor?: DnDTargetViewProps['dndMonitor']) => React.ReactNode;
  relatedData?: object; // object key for re-render
};

class GcProductDropAreaView extends React.Component<Props & DnDTargetViewProps> {

  public render() {
    const { children, className, isOverClass, style,
      connectDropTarget, dndIsOver, content, dndMonitor} = this.props;

    return connectDropTarget(
      <div
        style={style}
        className={csn(
          className,
          dndIsOver ? isOverClass : null,
        )}
      >
        {content ? content(dndIsOver, dndMonitor) : children}
      </div>,
    );
  }
}

export const GcProductDropArea = dragAndDropTarget<Props>(
  [
    DND_IDENTIFIERS.PRODUCT_CARD,
  ],
)(GcProductDropAreaView);
