import { PlotData, PlotDisplay } from '../components/gc-graph/gc-intake-over-time/gc-intake-over-time.types';
import { dateUtils, NutrientPropName } from '../shared';
import { IntakePoint } from '../types';

const caloriesScale = 0.25; // scale down calories chart in order to see other nutrients

export function intakePointsToPlotData(points: Array<IntakePoint>, display: PlotDisplay): PlotData {
  let maxNutr = 0;

  const props: Array<NutrientPropName> = ['protein', 'fat', 'carbs', 'calories'];

  const [protData, fatData, carbsData, caloriesData] =
    props.map((param) => {
      return display[param]
        ? points.map((item) => {
          const y = param === 'calories' ? item.nutrients[param] * caloriesScale : item.nutrients[param];
          maxNutr = Math.max(maxNutr, y);
          return {
            x: dateUtils.getTimestampInMilliseconds(item.date),
            y,
          };
        })
        : [];
    });

  const nutrYDomain = [0, maxNutr / 2 * 3]; // nutrients should occupy bottom 2/3th of the screen

  const weightData = points.map((item) => ({
    x: dateUtils.getTimestampInMilliseconds(item.date),
    y: item.bodyWeight,
    label: item.bodyWeight.toString(),
  }));

  const weightPoints = weightData.filter((point, index) => {
    const prevPoint = weightData[index - 1];
    const nextPoint = weightData[index + 1];
    return (
      !prevPoint ||
      !nextPoint ||
      (point.y < prevPoint.y && point.y <= nextPoint.y) ||
      (point.y > prevPoint.y && point.y >= nextPoint.y)
    );
  });

  const weightMarks = weightPoints.map((point, index) => {
    const prevPoint = weightPoints[index - 1];
    const nextPoint = weightPoints[index + 1];
    return {
      ...point,
      xOffset: prevPoint && nextPoint ? 10 : undefined,
      yOffset: (
        (!prevPoint || prevPoint.y > point.y) &&
        (!nextPoint || point.y <= nextPoint.y)
        ) ? -10 : 20,
    };
  });

  const labelKoef = 0.01; // this magic number is just makes range a bit wider to include also weight marks
  const initWeight = weightData[0] ? weightData[0].y : 0;
  const minWeight = weightData.reduce((min, current) => Math.min(min, current.y), initWeight) * (1 - labelKoef);
  const maxWeight = weightData.reduce((min, current) => Math.max(min, current.y), initWeight) * (1 + labelKoef);
  const weightRange = maxWeight - minWeight;
  const weightYDomain = [maxWeight - weightRange * 3, maxWeight]; // occupy top 1/3 of the screen

  const [start, end] = dateUtils.yearRange(points[0].date);
  const xDomain = [
    dateUtils.getTimestampInMilliseconds(start),
    dateUtils.getTimestampInMilliseconds(end),
  ];

  return {
      weightData,
      weightMarks,
      weightYDomain,
      protData,
      fatData,
      carbsData,
      caloriesData,
      nutrYDomain,
      xDomain,
  };
}
