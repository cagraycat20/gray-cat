import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DatePicker from 'material-ui-pickers/DatePicker';
import * as React from 'react';
import { dateUtils } from '../../shared';
import { csn } from '../../shared';
import {
  DateType,
  getDateFrom,
  getDateTo,
  getDateValue,
  getValueOfSelectedPeriod,
} from '../../shared/utils/date-selector.utils';
import { StyleProps, stylesCallback } from './gc-date-selector.styles';
import { Props } from './gc-date-selector.types';

interface State {
  dateAnchor?: HTMLElement;
  customDateAnchor?: HTMLElement;
  dateFrom: Date;
  dateFromTemp?: Date;
  dateTo: Date;
  dateToTemp?: Date;
  isCustomDateCorrect: boolean;
  dateType: DateType;
}

class GcDateSelectorView extends React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (nextProps.invokeSelectedPeriod) {
      nextProps.onPeriodSelected(prevState.dateFrom, prevState.dateTo);
    }

    return null;
  }

  public state: State = {
    dateFrom: getDateFrom('today'),
    dateTo: getDateTo('today'),
    isCustomDateCorrect: true,
    dateType: 'today',
  };

  public render() {
    const { classes } = this.props;
    const { dateType, dateFrom, dateTo, dateAnchor, customDateAnchor, dateFromTemp, dateToTemp,
      isCustomDateCorrect } = this.state;

    return (
      <div className={classes.periodContainer}>
        <Popover
          open={Boolean(dateAnchor)}
          anchorEl={dateAnchor}
          anchorReference="anchorEl"
          onClose={this.handleDateTypePopoverClose}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          {this.renderDateType('today', 'Today', dateType === 'today')}
          <Divider />
          {this.renderDateType('this_week', 'This week', dateType === 'this_week')}
          <Divider />
          {this.renderDateType('previous_week', 'Previous week', dateType === 'previous_week')}
          <Divider />
          {this.renderDateType('this_month', 'This month', dateType === 'this_month')}
          <Divider />
          {this.renderDateType('previous_month', 'Previous month', dateType === 'previous_month')}
          <Divider />
          {this.renderDateType('this_year', 'This year', dateType === 'this_year')}
          <Divider />
          {this.renderDateType('custom', 'Custom', dateType === 'custom')}
        </Popover>
        <Popover
          open={Boolean(customDateAnchor)}
          anchorEl={customDateAnchor}
          anchorReference="anchorEl"
          onClose={this.handleCustomDatePopoverClose}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <div className={classes.customDateTypeContainer}>
            <DatePicker
              value={dateFromTemp ? dateFromTemp : dateFrom}
              label="Date from"
              disableFuture={true}
              autoOk={true}
              showTodayButton={true}
              variant="outlined"
              onChange={this.handleDateFromChange}
            />
            <DatePicker
              error={!isCustomDateCorrect}
              className={classes.dateTo}
              value={dateToTemp ? dateToTemp : dateTo}
              label="Date to"
              disableFuture={true}
              autoOk={true}
              showTodayButton={true}
              variant="outlined"
              onChange={this.handleDateToChange}
            />
            <div className={classes.customDateTypeButtonsContainer}>
              <Button onClick={this.handleCancelCustomDateClick}>Cancel</Button>
              <Button onClick={this.handleApplyCustomDateClick}>Apply</Button>
            </div>
          </div>
        </Popover>
        <ButtonBase
          className={classes.periodButton}
          onClick={this.handlePeriodClick}
        >
          <div className={classes.periodButtonValueContainer}>
            <div className={classes.periodButtonValueRow}>
              <DateRangeIcon className={classes.periodButtonIcon} />
              <Typography className={classes.periodButtonValue}>
                {getDateValue(dateType)}
              </Typography>
            </div>
            <Typography className={classes.periodButtonSubValue}>
              {getValueOfSelectedPeriod(dateFrom, dateTo)}
            </Typography>
          </div>
        </ButtonBase>
      </div>
    );
  }

  private renderDateType = (period: DateType, title: string, selected: boolean) => {
    const { classes } = this.props;

    return (
      <ButtonBase
        className={csn(classes.period, {[classes.selectedPeriod]: selected})}
        onClick={this.handleSelectedDateTypeClick(period)}
      >
        <Typography>{title}</Typography>
        {period !== 'custom' &&
          <Typography className={classes.dateRange}>
            {getValueOfSelectedPeriod(getDateFrom(period), getDateTo(period))}
          </Typography>
        }
      </ButtonBase>
    );
  }

  private handleDateTypePopoverClose = () => this.setState({ dateAnchor: undefined });

  private handleCustomDatePopoverClose = () => this.setState({ customDateAnchor: undefined });

  private handlePeriodClick = (event: React.MouseEvent<HTMLInputElement>) => {
    this.setState({ dateAnchor: event.currentTarget });
  }

  private handleSelectedDateTypeClick = (period: DateType) => (event: React.MouseEvent<HTMLInputElement>) => {
    switch (period) {
      case 'today':
      case 'this_week':
      case 'previous_week':
      case 'this_month':
      case 'previous_month':
      case 'this_year':
        const dateFrom = getDateFrom(period);
        const dateTo = getDateTo(period);

        this.setState({
          dateType: period,
          dateFrom,
          dateTo,
          dateAnchor: undefined,
        });

        this.props.onPeriodSelected(dateFrom, dateTo);
        break;
      case 'custom':
        this.setState({ customDateAnchor: event.currentTarget });
        break;
    }
  }

  private handleDateFromChange = (date: Date) => {
    const { dateToTemp, dateTo} = this.state;

    this.setState({
      dateFromTemp: date,
      isCustomDateCorrect: dateUtils.isSameOrBefore(date, dateToTemp ? dateToTemp : dateTo),
    });
  }

  private handleDateToChange = (date: Date) => {
    const { dateFromTemp, dateFrom} = this.state;

    this.setState({
      dateToTemp: date,
      isCustomDateCorrect: dateUtils.isSameOrAfter(date, dateFromTemp ? dateFromTemp : dateFrom),
    });
  }

  private handleCancelCustomDateClick = () => {
    this.setState({
      dateFromTemp: undefined,
      dateToTemp: undefined,
      customDateAnchor: undefined,
    });
  }

  private handleApplyCustomDateClick = () => {
    const { dateFromTemp, dateToTemp, dateFrom, dateTo, isCustomDateCorrect } = this.state;

    if (isCustomDateCorrect) {
      const finalDateFrom = dateFromTemp ? dateFromTemp : dateFrom;
      const finalDateTo = dateToTemp ? dateToTemp : dateTo;

      this.setState({
        dateType: 'custom',
        dateFrom: finalDateFrom,
        dateTo: finalDateTo,
        customDateAnchor: undefined,
        dateAnchor: undefined,
      });

      this.props.onPeriodSelected(finalDateFrom, finalDateTo);
    }
  }

}

export const GcDateSelectorViewStyled =
  withStyles(stylesCallback)(GcDateSelectorView);
