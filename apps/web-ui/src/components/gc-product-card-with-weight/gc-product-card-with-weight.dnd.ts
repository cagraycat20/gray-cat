import {
  DND_IDENTIFIERS,
  DnDSourceProps,
  dragAndDropSource,
} from '..';
import { Props } from './gc-product-card-with-weight.types';
import { GcProductCardWithWeightViewStyled } from './gc-product-card-with-weight.view';

export const GcProductCardWithWeightDnd = dragAndDropSource<Props & DnDSourceProps>(
  DND_IDENTIFIERS.PRODUCT_CARD,
)(GcProductCardWithWeightViewStyled);
