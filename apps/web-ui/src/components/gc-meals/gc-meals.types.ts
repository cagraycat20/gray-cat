import {
  ConsumedProduct,
  DayInfo,
  DnDTargetProps,
  LocalSettings,
  Product,
  UserSettingsView,
} from '..';
import { OwnProps as MealOwnProps } from '../gc-meal/gc-meal.types';

export interface MealsInfo {
  [key: number]: Array<ConsumedProduct>;
}

export interface OwnProps extends DnDTargetProps {
  onShowProductAddDialog: () => void;
  onScroll: (scrollTop: number) => void;
  needScrollToProduct: MealOwnProps['needScrollToProduct'];
  onGetEditingProduct: MealOwnProps['onGetEditingProduct'];
}

export interface ReduxStateProps {
  meals: UserSettingsView['meals'];
  date: LocalSettings['selectedDate'];
  mobileLayout: boolean;
  twoColumns: boolean;
  isIntroductionMode: boolean;
  canCopyFromYesterday: boolean;
}

export interface ReduxHocStateProps extends ReduxStateProps {
  day: DayInfo | undefined;
}

export interface ReduxViewStateProps extends ReduxStateProps {
  dayMealsInfo: MealsInfo;
}

export interface ReduxDispatchProps {
  onCopyFromDay: (fromDate: string, toDate: string) => void;
  onChangeProductWeight: (
    productId: Product['id'],
    weight: number,
    date: string,
    mealTime: number,
    replace?: boolean,
  ) => void;
  onChangeDate: (date: string) => void;
}

export type Props =  OwnProps & ReduxViewStateProps & ReduxDispatchProps;

export type HocProps =  OwnProps & ReduxHocStateProps & ReduxDispatchProps;
