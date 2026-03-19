import { DND_IDENTIFIERS, DnDSourceProps, DnDTargetProps, dragAndDrop } from '..';
import { Props } from './gc-product-card.types';
import { GcProductCardViewStyled } from './gc-product-card.view';

export const GcProductCardDnd = dragAndDrop<Props & DnDSourceProps & DnDTargetProps>(
  DND_IDENTIFIERS.PRODUCT_CARD,
  [
    DND_IDENTIFIERS.PRODUCT_CARD,
  ],
)(GcProductCardViewStyled);
