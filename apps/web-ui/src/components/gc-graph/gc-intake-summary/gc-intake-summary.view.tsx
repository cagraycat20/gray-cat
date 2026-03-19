import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as React from 'react';
import { colors, csn, dateUtils } from '../../../shared';
import { SumData } from '../../../types';
import {
  DetailedData,
  GcIntakeSummaryDetailedItem,
} from '../gc-intake-summary-detailed-item/gc-intake-summary-detailded-item.view';
import { GcIntakeSummaryItem } from '../gc-intake-summary-item/gc-intake-summary-item.view';
import { StyleProps, stylesCallback } from './gc-intake-summary.styles';
import { Props } from './gc-intake-summary.types';

interface State {
  detailedView: keyof SumData | '';
}

class GcIntakeSummaryView extends React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    detailedView: '',
  };

  public render() {
    return this.props.mobileLayout ? this.renderMobile() : this.renderDesktop();
  }

  private changeDetailed = (type: State['detailedView']) => () => {
    this.setState({detailedView: type});
  }

  private renderMobile() {
    const { classes, className } = this.props;
    return (
      <div className={csn(className, classes.root)}>
        <div className={classes.dateRow}>
          <Typography variant="h5" noWrap={true} className={classes.dateLabel}>
            {this.getDateLabel()}
          </Typography>
          <Button
            color="default"
            variant="outlined"
            className={classes.dateGoButton}
            onClick={this.goToClickHandler}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
        {this.renderDetails()}
      </div>
    );
  }

  private renderDesktop() {
    const { classes, className } = this.props;
    return (
      <div className={csn(className, classes.root)}>
        <div className={classes.dateRow}>
          <Typography variant="h5" noWrap={true} className={classes.dateLabel}>
            {this.getDateLabel()}
          </Typography>
          <Typography variant="caption" noWrap={true} className={classes.dateHint}>
            (Double click on chart to navigate to the date)
          </Typography>
        </div>
        {this.renderDetails()}
      </div>
    );
  }

  private getDetailedData: () => DetailedData = () => {
    const { data, bodyWeightUnit } = this.props;
    const {detailedView} = this.state;
    switch (detailedView) {
      case 'protein':
        return {
          value: data.point ? data.point.nutrients.protein : undefined,
          monthSum: data.monthSum.protein,
          yearSum: data.yearSum.protein,
          name: 'Protein',
          units: 'g',
          color: colors.protein,
        };
      case 'carbs':
        return {
          value: data.point ? data.point.nutrients.carbs : undefined,
          monthSum: data.monthSum.carbs,
          yearSum: data.yearSum.carbs,
          name: 'Carbs',
          units: 'g',
          color: colors.carbs,
        };
      case 'fat':
        return {
          value: data.point ? data.point.nutrients.fat : undefined,
          monthSum: data.monthSum.fat,
          yearSum: data.yearSum.fat,
          name: 'Fat',
          units: 'g',
          color: colors.fat,
        };
      case 'calories':
        return {
          value: data.point ? data.point.nutrients.calories : undefined,
          monthSum: data.monthSum.calories,
          yearSum: data.yearSum.calories,
          name: 'Calories',
          units: 'kcal',
          color: colors.calories,
        };
      default:
        return {
          value: data.point ? data.point.bodyWeight : undefined,
          monthSum: data.monthSum.bodyWeight,
          yearSum: data.yearSum.bodyWeight,
          name: 'Body Weight',
          precision: 1,
          color: colors.weight,
          units: bodyWeightUnit,
          hideSum: true,
        };
    }
  }

  private renderDetails() {
    const {classes, data, bodyWeightUnit } = this.props;
    const {point} = data;
    const {detailedView} = this.state;
    return (
      <>
        <div className={classes.spaceItem}/>
        <div className={classes.detailsGroup}>
          <Slide
            direction="up"
            in={!!detailedView}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <GcIntakeSummaryDetailedItem
              onClick={this.changeDetailed('')}
              className={classes.detailedItem}
              date={data.date}
              data={this.getDetailedData()}
            />
          </Slide>
          <GcIntakeSummaryItem
            className={csn(classes.item, classes.bodyWeight)}
            onClick={this.changeDetailed('bodyWeight')}
            name="Body Weight"
            units={bodyWeightUnit}
            precision={1}
            value={point && point.bodyWeight}
          />
          <div className={classes.spaceItem}/>
          <div className={classes.detailsRow}>
            <GcIntakeSummaryItem
              className={csn(classes.item, classes.protein)}
              onClick={this.changeDetailed('protein')}
              name="Protein"
              value={point && point.nutrients.protein}
            />
            <div className={classes.spaceItem}/>
            <GcIntakeSummaryItem
              className={csn(classes.item, classes.carbs)}
              onClick={this.changeDetailed('carbs')}
              name="Carbs"
              value={point && point.nutrients.carbs}
            />
          </div>
          <div className={classes.spaceItem}/>
          <div className={classes.detailsRow}>
            <GcIntakeSummaryItem
              className={csn(classes.item, classes.fat)}
              onClick={this.changeDetailed('fat')}
              name="Fat"
              value={point && point.nutrients.fat}
            />
            <div className={classes.spaceItem}/>
            <GcIntakeSummaryItem
              className={csn(classes.item, classes.calories)}
              onClick={this.changeDetailed('calories')}
              name="Calories"
              units="kcal"
              value={point && point.nutrients.calories}
            />
          </div>
        </div>
      </>
    );
  }

  private goToClickHandler = () => {
    const { data, onGoToDate } = this.props;
    if (data) {
      onGoToDate(data.date);
    }
  }

  private getDateLabel = () => this.props.data
    ? dateUtils.getFormattedDate(this.props.data.date, 'dd MMMM yyyy')
    : '-'
}

export const GcIntakeSummary = withStyles(stylesCallback)(GcIntakeSummaryView);
