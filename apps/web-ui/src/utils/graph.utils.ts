import { dateUtils, dayInfoHelper, mathUtils, productHelper, unitHelper } from '../components';
import { DayInfo, GraphData, GraphSummary, IntakePoint, Product, SumData, SumItem, UserSettingsView } from '../types';

function emptyIntakePoint(date: string): IntakePoint {
  return {
    date: dateUtils.getDate(date),
    bodyWeight: 0,
    nutrients: {
      protein: 0,
      fat: 0,
      carbs: 0,
      calories: 0,
    },
  };
}

function calculateIntakePoint(
  products: Array<Product>,
  day: DayInfo,
  bodyWeightPoints: UserSettingsView['bodyWeightPoints'],
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'],
): IntakePoint {
  const { bodyWeight } = dayInfoHelper.getDayBodyWeightInfo(day.date, bodyWeightPoints);

  return {
    date: dateUtils.getDate(day.date),
    bodyWeight: mathUtils.round(unitHelper.getValue(bodyWeight, 'kg', bodyWeightUnit), 1),
    nutrients: productHelper.addUpNutrients(day.consumed, products),
  };
}

function normalizeWeight(data: Array<IntakePoint>): Array<IntakePoint> {
  let currentWeight = 0;
  const applyCurrentWeight = (point: IntakePoint) => {
    currentWeight = point.bodyWeight || currentWeight;
    point.bodyWeight = point.bodyWeight || currentWeight;
    return point;
  };
  return data.map(applyCurrentWeight).reverse().map(applyCurrentWeight).reverse();
}

function calcSumItem(data: Array<number>): SumItem {
  const sum = mathUtils.round(data.reduce((prev, val) => prev + val, 0));
  return {
    min: Math.min(...data),
    max: Math.max(...data),
    avg: mathUtils.round(sum / data.length),
    sum,
  };
}

function calcSumData(data: Array<IntakePoint>): SumData {
  return data.length ? {
    protein: calcSumItem(data.map((pt) => pt.nutrients.protein)),
    fat: calcSumItem(data.map((pt) => pt.nutrients.fat)),
    carbs: calcSumItem(data.map((pt) => pt.nutrients.carbs)),
    calories: calcSumItem(data.map((pt) => pt.nutrients.calories)),
    bodyWeight: calcSumItem(data.map((pt) => pt.bodyWeight)),
  } : {};
}

function calculateSummary(
  points: Array<IntakePoint>,
): GraphSummary {
  const year = dateUtils.getYear(points[0].date);

  const monthly = Array.from({length: 12}, (v, i) => i + 1)
    .map((monthIndex) => {
      const monthDate = dateUtils.createDate(year, monthIndex);
      return calcSumData(points.filter((pt) => dateUtils.isSameMonth(pt.date, monthDate)));
    });

  return {
    year: calcSumData(points),
    monthly,
  };
}

export function getGraphData(
  date: Date,
  days: Array<DayInfo>,
  products: Array<Product>,
  bodyWeightPoints: UserSettingsView['bodyWeightPoints'],
  bodyWeightUnit: UserSettingsView['bodyWeightUnit'],
): GraphData | null {
  let intakePoints: Array<IntakePoint> = [];
  const [dateStart, dateEnd] = dateUtils.yearRange(date);
  date = dateStart;
  let hasData = false;
  let dataLength = 0;

  while (dateUtils.isSameOrBefore(date, dateEnd)) {
    const dateStr = dateUtils.getFormattedDate(date);
    const day = days.find((val) => val.date === dateStr);
    if (day) {
      intakePoints.push(calculateIntakePoint(products, day, bodyWeightPoints, bodyWeightUnit));
      hasData = true;
      dataLength = intakePoints.length;
    } else {
      if (hasData) {
        intakePoints.push(emptyIntakePoint(dateStr));
      }
    }
    date = dateUtils.addDays(date, 1);
  }
  intakePoints = normalizeWeight(intakePoints.slice(0, dataLength));

  return hasData ? {
    intakePoints,
    summary: calculateSummary(intakePoints),
    bodyWeightUnit,
  } : null;
}
