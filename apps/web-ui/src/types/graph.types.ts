import { BodyWeightUnit, NutrientProps } from '../shared';

export interface IntakePoint {
  date: Date;
  bodyWeight: number;
  nutrients: NutrientProps;
}

export interface SumItem {
  min: number;
  max: number;
  avg: number;
  sum: number;
}

export interface SumData {
  protein?: SumItem;
  fat?: SumItem;
  carbs?: SumItem;
  calories?: SumItem;
  bodyWeight?: SumItem;
}

export interface GraphSummary {
  year: SumData;
  monthly: Array<SumData>;
}

export interface GraphData {
  intakePoints: Array<IntakePoint>;
  summary: GraphSummary;
  bodyWeightUnit: BodyWeightUnit;
}
