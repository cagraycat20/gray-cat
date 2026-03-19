import {
  BodyWeightPoint,
  DayInfo,
  Flags,
  NutrientProps,
  Product,
  StoreState,
  UserSettingsView,
} from '..';
import { ConsumedProduct } from '../../types';

export interface OwnProps {
  date?: string; // selected date if not stated explicitly
  onGetScrolledStateChangeCallback: (callback: (scrolled: boolean) => void) => void;
}

export interface ReduxStateProps {
  date: string;
  locked: boolean;
  shrinkLevel: 0 | 1 | 2;
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'];
  mainBarHeight: number;
  showSummaryTutorial: boolean;
  loggedIn: boolean;
  dayInfo?: DayInfo;
}

export interface ViewProps extends ReduxStateProps, NutrientProps {
  bodyWeight: number;
  desiredBodyWeight: number;
  proteinFromProteinBased: number;
  canUndo?: boolean;
  onCheckIfDayHasProducts: (date: string) => boolean;
}

export interface ReduxHocStateProps extends ReduxStateProps {
  days: StoreState['days'];
  bodyWeightPoints: UserSettingsView['bodyWeightPoints'];
  products: Array<Product>;
}

export interface ReduxDispatchProps {
  onCopyFromDay: (fromDate: string, toDate: string) => void;
  onChangeDate: (date: string) => void;
  onUnlockDay: (date: string) => void;
  onShowNutrientsSumSetDialog: () => void;
  onChangeDay: (date: string, changes: Partial<DayInfo>) => void;
  onChangeDayBodyWeightInfo: (point: BodyWeightPoint) => void;
  onChangeFlags: (changes: Partial<Flags>) => void;
  onUndo: (date: string) => void;
  onClearDay: (date: string) => void;
  onAddSavedMeal: (date: string, time: number, consumedProducts: Array<ConsumedProduct>) => void;
}

export type Props = OwnProps & ViewProps & ReduxDispatchProps;

export type HocProps = OwnProps & ReduxHocStateProps & ReduxDispatchProps;
