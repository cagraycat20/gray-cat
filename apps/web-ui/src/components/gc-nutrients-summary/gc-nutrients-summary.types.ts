import {
  NutrientPropName,
  NutrientProps,
  UserSettingsView,
} from '..';

export interface OwnProps extends NutrientProps {
  bodyWeight: number;
  proteinFromProteinBased: number;
  onNutrientClick?: (nutrient: NutrientPropName) => void;
  customNutrientsDisplay?: UserSettingsView['nutrientsDisplay'];
}

export interface ReduxStateProps {
  nutrientsDisplay: UserSettingsView['nutrientsDisplay'];
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'];
  compact: boolean;
}

export interface ReduxDispatchProps {
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
