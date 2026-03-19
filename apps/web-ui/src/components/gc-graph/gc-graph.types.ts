import {
  DayInfo,
  Product,
  UserSettingsView,
 } from '..';
import { LocalSettings } from '../../types';

export interface OwnProps {
  open: boolean;
  onClose: () => void;
}

export interface ReduxStateProps {
  products: Array<Product>;
  days: Array<DayInfo>;
  bodyWeightPoints: UserSettingsView['bodyWeightPoints'];
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'];
  selectedDate: LocalSettings['selectedDate'];
  mobileLayout: boolean;
}

export interface ReduxDispatchProps {
  loadGraphData: (date: Date) => void;
  goToDate: (date: Date) => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
