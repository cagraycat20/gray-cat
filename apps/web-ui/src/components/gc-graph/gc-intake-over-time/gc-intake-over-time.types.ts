import { GraphData } from '../../../types';

export interface PlotPoint {
  x: number;
  y: number;
}

export interface PlotData {
  weightData: Array<PlotPoint>;
  weightMarks: Array<PlotPoint>;
  weightYDomain: Array<number>;
  protData: Array<PlotPoint>;
  fatData: Array<PlotPoint>;
  carbsData: Array<PlotPoint>;
  caloriesData: Array<PlotPoint>;
  nutrYDomain: Array<number>;
  xDomain: Array<number>;
}

export interface PlotDisplay {
  protein: boolean;
  fat: boolean;
  carbs: boolean;
  calories: boolean;
}

export interface PlotSettings {
  bar?: boolean;
  display: PlotDisplay;
}

export interface PlotUtils {
  offsetToValue: (xOffset: number) => number;
  valueToOffset: (value: number) => number;
}

export interface IntakeOverTimeProps {
  selectedDate: Date;
  data: GraphData;
  className?: string;
  plotSettings: PlotSettings;
  onGoToDate: (date: Date) => void;
  mobileLayout: boolean;
}

export type Props = IntakeOverTimeProps;
