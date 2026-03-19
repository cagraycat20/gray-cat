import {
  DayInfo,
  StoreState,
} from '../..';
import { UserSettingsView } from '../../../types';

export interface OwnProps {
  date: string;
  onSelected?: (date: string) => void;
}

interface ReduxStateProps {
  isSelected: boolean;
  products: StoreState['products'];
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'];
}

export interface ReduxViewStateProps extends ReduxStateProps {
  bodyWeight: number;
  desiredBodyWeight: number;
  consumedProducts: DayInfo['consumed'] | null;
}

export interface ReduxHocStateProps extends ReduxStateProps {
  days: StoreState['days'];
  weightInfo: UserSettingsView['bodyWeightPoints'];
}

export type Props = OwnProps & ReduxViewStateProps;

export type HocProps = OwnProps & ReduxHocStateProps;
