import {
  DND_IDENTIFIERS,
  dragAndDropTarget,
} from '..';
import { Props } from './gc-meal.types';
import { GcMealViewStyled } from './gc-meal.view';

export const GcMealDnd = dragAndDropTarget<Props>(
  [
    DND_IDENTIFIERS.PRODUCT_CARD,
  ],
)(GcMealViewStyled);
