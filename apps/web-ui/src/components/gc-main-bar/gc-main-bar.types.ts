import {
  LocalSettings,
  UserSettingsView,
} from '..';
import { UsiUnion } from '../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  loggedIn: boolean;
  userName: string;
  userEmail: string;
  avatarUrl: string;
  showNutrients: UserSettingsView['showNutrients'];
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'];
  pricesSuffix: UserSettingsView['priceSuffix'];
  isAdmin?: boolean;
  meals: UserSettingsView['meals'];
  canInstallApp: LocalSettings['canInstallApp'];
  menuMode: boolean;
}

export interface ReduxDispatchProps {
  onLogIn: () => void;
  onLogOut: () => void;
  onChangeRemoteSettings: (changes: Array<UsiUnion>) => void;
  onShowPricesDialog: () => void;
  onShowFoodComparisonDialog: () => void;
  onShowLoginOfferDialog: () => void;
  onShowIntakeSugarDialog: () => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
