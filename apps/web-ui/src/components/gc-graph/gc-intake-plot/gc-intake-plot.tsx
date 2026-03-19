import * as React from 'react';

import 'react-vis/dist/style.css';
import XAxis from 'react-vis/es/plot/axis/x-axis';
import HorizontalGridLines from 'react-vis/es/plot/horizontal-grid-lines';
import LabelSeries from 'react-vis/es/plot/series/label-series';
import LineSeries from 'react-vis/es/plot/series/line-series';
import MarkSeries from 'react-vis/es/plot/series/mark-series';
import VerticalBarSeries from 'react-vis/es/plot/series/vertical-bar-series';
import XYPlot from 'react-vis/es/plot/xy-plot';

import { colors } from '../../../shared/theme';
import { logRender } from '../../../utils';
import { StyleProps } from '../gc-intake-over-time/gc-intake-over-time.styles';
import { PlotData, PlotSettings, PlotUtils } from '../gc-intake-over-time/gc-intake-over-time.types';
import { GcScale } from './gc-scale';

interface Props {
  width: number;
  height: number;
  marginLeft: number; // keep margin plain just for shallow compare
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  settings: PlotSettings;
  data: PlotData;
  getUtils: (utils: PlotUtils | null) => void;
}

const weightStrokeStyle = {
  stroke: colors.weight,
  strokeDasharray: '6 3',
};

const tickTotal = 90;

interface State {
}

export class GcIntakePlot extends React.PureComponent<Props & StyleProps, State> {
  public render() {
    logRender(this);
    const { width, height, classes, settings, data, getUtils,
      marginLeft, marginRight, marginTop, marginBottom } = this.props;

    // tslint:disable-next-line:no-any
    const NutrComp = (settings.bar ? VerticalBarSeries : LineSeries) as any;

    return (
      <XYPlot
        xType="time"
        width={width}
        height={height}
        xDomain={data.xDomain}
        yDomain={data.nutrYDomain}
        margin={{
          left: marginLeft,
          right: marginRight,
          top: marginTop,
          bottom: marginBottom,
        }}
      >
        <HorizontalGridLines />
        <XAxis
          tickTotal={tickTotal}
        />

        {settings.display.protein &&
          <NutrComp
            key="protein"
            color={colors.protein}
            yBaseValue={0}
            data={data.protData}
          />
        }
        {settings.display.fat &&
          <NutrComp
            key="fat"
            color={colors.fat}
            yBaseValue={0}
            data={data.fatData}
          />
        }
        {settings.display.carbs &&
          <NutrComp
            key="carbs"
            color={colors.carbs}
            yBaseValue={0}
            data={data.carbsData}
          />
        }
        {settings.display.calories &&
          <NutrComp
            key="calories"
            color={colors.calories}
            yBaseValue={0}
            data={data.caloriesData}
          />
        }
        <LineSeries
          key="weight-line"
          yDomain={data.weightYDomain}
          yBaseValue={data.weightYDomain[0]}
          curve="curveMonotoneX"
          data={data.weightData}
          style={weightStrokeStyle}
        />
        <MarkSeries
          key="weight-marks"
          yDomain={data.weightYDomain}
          yBaseValue={data.weightYDomain[0]}
          data={data.weightMarks}
          size={3}
          color={colors.weight}
        />
        <LabelSeries
          className={classes.label}
          key="weight-labels"
          yDomain={data.weightYDomain}
          yBaseValue={data.weightYDomain[0]}
          data={data.weightMarks}
          allowOffsetToBeReversed={true}
        />
        <GcScale
          getUtils={getUtils}
        />
      </XYPlot>
    );
  }
}
