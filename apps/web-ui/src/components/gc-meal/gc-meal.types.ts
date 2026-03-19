import {
  ConsumedProduct,
  DndProduct,
  DnDTargetProps,
  LocalSettings,
  Product,
  StoreState,
} from '..';
import { ProductWeight } from '../../types';
import { Props } from '../gc-meal/gc-meal.types';

export interface OwnProps extends DnDTargetProps {
  mealTime: number;
  mealName?: string;
  consumedProducts: Array<ConsumedProduct>;
  isLast?: boolean;
  needScrollToProduct: (
    productId: Product['id'],
    mealTime: number,
  ) => boolean;
  onGetEditingProduct: (mealTime: number) => Product['id'];
}

export interface ReduxStateProps {
  products: StoreState['products'];
  date: LocalSettings['selectedDate'];
  locked?: boolean;
}

export interface ReduxDispatchProps {
  onStartDrag: (dndProduct: DndProduct) => void;
  onEndDrag: () => void;
  onRemoveMeal: (date: string, mealTime: number) => void;
  onChangeProductWeight: (
    productId: Product['id'],
    weight: number,
    date: string,
    mealTime: number,
    replace?: boolean,
  ) => void;
  onChangeMealTime:
    (date: string, oldMealTime: number, newMealTime: number) => void;
  onMoveProduct: (
    productId: Product['id'],
    date: string,
    oldMealTime: number,
    newMealTime: number,
  ) => void;
  onSaveMeal: (items: Array<ProductWeight>) => void;
  onAddSavedMeal: (date: string, time: number, consumedProducts: Array<ConsumedProduct>) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
