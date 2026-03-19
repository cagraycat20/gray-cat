import { BodyWeightUnit, IntakePoint, SumData } from '../../../types';

export interface IntakeSummaryData {
  date: Date;
  point?: IntakePoint;
  monthSum: SumData;
  yearSum: SumData;
}

export interface Props {
  data: IntakeSummaryData;
  bodyWeightUnit: BodyWeightUnit;
  className?: string;
  onGoToDate: (date: Date) => void;
  mobileLayout: boolean;
}
