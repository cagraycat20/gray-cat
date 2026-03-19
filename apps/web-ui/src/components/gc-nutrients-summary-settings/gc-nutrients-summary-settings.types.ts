import {
  DayInfo,
  Product,
  UserSettingsView,
} from '..';

export interface OwnProps {
}

export interface ReduxStateProps {
  nutrientsDisplay: UserSettingsView['nutrientsDisplay'];
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'];
  open: boolean;
  compact: boolean;
  date: string;
  days: Array<DayInfo>;
  products: Array<Product>;
  bodyWeightPoints: UserSettingsView['bodyWeightPoints'];
}

export interface ReduxDispatchProps {
  onSubmit: (nutrientsDisplay: UserSettingsView['nutrientsDisplay']) => void;
  onClose: () => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
