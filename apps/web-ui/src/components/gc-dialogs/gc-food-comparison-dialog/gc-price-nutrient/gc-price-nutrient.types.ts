import { NutrientPropName } from '../../../../types';

export interface OwnProps {
  value1: number;
  value2: number;
  price1: number;
  price2: number;
  nutrient: NutrientPropName;
  active: boolean;
  className?: string;
}

export interface ReduxStateProps {
  currency: string;
}

export interface ReduxDispatchProps {
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
