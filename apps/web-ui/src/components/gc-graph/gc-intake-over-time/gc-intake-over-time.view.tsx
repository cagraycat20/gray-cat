import withStyles from '@material-ui/core/styles/withStyles';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import 'react-vis/dist/style.css';

import { makeVisFlexible } from 'react-vis/es/make-vis-flexible';

import { csn } from '../../../shared';
import { dateUtils } from '../../../shared';
import { logRender } from '../../../utils';
import { intakePointsToPlotData } from '../../../utils/plot.utils';
import { GcIntakePlot } from '../gc-intake-plot/gc-intake-plot';
import { GcIntakeSummary } from '../gc-intake-summary/gc-intake-summary.view';
import { GcScrollBoxDesktop } from '../gc-scroll-box/gc-scroll-box-desktop';
import { GcScrollBoxMobile } from '../gc-scroll-box/gc-scroll-box-mobile';
import { StyleProps, stylesCallback } from './gc-intake-over-time.styles';
import { PlotData, PlotUtils, Props } from './gc-intake-over-time.types';

const intakePointsToPlotDataMemorized = memoizeOne(intakePointsToPlotData);

interface State {
  plotData?: PlotData;
  markPos: number;
}

interface RenderProps {
  // tslint:disable-next-line: no-any
  [key: string]: any;
}

const HocToRender: React.SFC<RenderProps> = ({ height, width, children }) => (
  typeof children === 'function' && children(width, height)
);
HocToRender.propTypes = {};
const FlexibleContainer = makeVisFlexible(HocToRender);

const graphWidth = 5000;

class GcIntakeOverTimeView extends React.Component<Props & StyleProps, State> {
  public static getDerivedStateFromProps(nextProps: Readonly<Props>): Partial<State> | null {
    return {
      plotData: intakePointsToPlotDataMemorized(nextProps.data.intakePoints, nextProps.plotSettings.display),
    };
  }

  public state: State = {
    markPos: 0,
  };

  private plotUtils?: PlotUtils | null;

  public render() {
    logRender(this);
    const { classes, className, data, onGoToDate, mobileLayout } = this.props;
    const summaryData = this.getSummary();
    return (
      <div className={csn(className, classes.root)}>
        {summaryData &&
          <GcIntakeSummary
            className={classes.details}
            data={summaryData}
            bodyWeightUnit={data.bodyWeightUnit}
            onGoToDate={onGoToDate}
            mobileLayout={mobileLayout}
          />
        }
        <div className={classes.graph}>
          <div className={classes.graphChild}>
            <FlexibleContainer>
              {this.renderScrollBox}
            </FlexibleContainer>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    requestAnimationFrame(() => {
      if (this.plotUtils) {
        this.setState({
          markPos: this.plotUtils.valueToOffset(Number(this.props.selectedDate)),
        });
      }
    });
  }

  private renderScrollBox = (width: number, height: number) => {
    return this.props.mobileLayout ? (
      <GcScrollBoxMobile
        height={height}
        width={width}
        onMarkChange={this.handleMarkChange}
        markPos={this.state.markPos}
      >
        {this.renderPlot(width, height)}
      </GcScrollBoxMobile>
    ) : (
      <GcScrollBoxDesktop
        height={height}
        width={width}
        onMarkChange={this.handleMarkChange}
        onDoubleClick={this.handleDoubleClick}
        markPos={this.state.markPos}
      >
        {this.renderPlot(width, height)}
      </GcScrollBoxDesktop>
    );
  }

  private renderPlot = (width: number, height: number) => {
    const { classes, plotSettings } = this.props;
    const { plotData } = this.state;
    return plotData ? (
      <GcIntakePlot
        classes={classes}
        width={graphWidth}
        height={height}
        settings={plotSettings}
        data={plotData}
        getUtils={this.savePlotUtils}
        {...this.getMargin(width)}
      />
    ) : undefined;
  }

  private getMargin = (width: number) => {
    if (this.props.mobileLayout) {
      return {
        marginTop: 10,
        marginBottom: 30,
        marginLeft: width / 2,
        marginRight: width / 2,
      };
    } else {
      return {
        marginTop: 10,
        marginBottom: 45,
        marginLeft: 10,
        marginRight: 10,
      };
    }
  }

  private getSummary = () => {
    const { data } = this.props;
    const markDate = this.posToDate(this.state.markPos);
    return data && markDate ?
      {
        date: markDate,
        point: this.props.data.intakePoints.find((pt) => pt.date === markDate),
        monthSum: data.summary.monthly[dateUtils.getMonth(markDate)],
        yearSum: data.summary.year,
        bodyWeightUnit: data.bodyWeightUnit,
      }
      : undefined;
  }

  private handleMarkChange = (markPos: number) => {
    if (markPos !== this.state.markPos) {
      this.setState({ markPos });
    }
  }

  private posToDate = (xPos: number) => {
    const halfDayMsec = 12 * 60 * 60 * 1000;
    if (this.state.plotData && this.plotUtils) {
      const value = Number(this.plotUtils.offsetToValue(xPos));
      const [minValue, maxValue] = [value - halfDayMsec, value + halfDayMsec];
      const result = this.props.data.intakePoints.find(
        (pt) => Number(pt.date) > minValue && Number(pt.date) <= maxValue,
      );

      if (result) {
        return result.date;
      } else {
        const { xDomain } = this.state.plotData;
        return new Date(Math.min(Math.max(xDomain[0], value), xDomain[1]));
      }
    } else {
      return undefined;
    }
  }

  private handleDoubleClick = (xPos: number) => {
    const date = this.posToDate(xPos);
    if (date) {
      this.props.onGoToDate(date);
    }
  }

  private savePlotUtils = (utils: PlotUtils | null) => {
    this.plotUtils = utils;
  }
}

export const GcIntakeOverTime =
  withStyles(stylesCallback)(GcIntakeOverTimeView);
