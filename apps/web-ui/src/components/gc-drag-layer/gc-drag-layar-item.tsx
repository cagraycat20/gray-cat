import * as React from 'react';
import * as DnD from 'react-dnd';
import {
  DND_IDENTIFIERS,
  DndProduct,
  dragAndDropTarget,
  logRender,
} from '..';
import {
  GcProductCardDndPreviewContainer as GcProductCardDndPreview,
} from './gc-product-card-dnd-preview/gc-product-card-dnd-preview.container';

interface Props {
  dndMonitor: DnD.DropTargetMonitor;
}

export class GcDragLayerItemView extends
  React.PureComponent<Props> {

  public render() {
    logRender(this);
    const identifier = this.props.dndMonitor.getItemType();
    const item = this.props.dndMonitor.getItem();

    if (identifier === DND_IDENTIFIERS.PRODUCT_CARD) {
       return (
        <GcProductCardDndPreview
          item={item as DndProduct}
        />
      );
    }
    return null;
  }
}

export const GcDragLayerItemContainer =
  dragAndDropTarget([DND_IDENTIFIERS.PRODUCT_CARD])(GcDragLayerItemView);
