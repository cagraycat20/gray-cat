import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import BasePicker, { BasePickerRenderArgs } from 'material-ui-pickers/_shared/BasePicker';
import { DateType } from 'material-ui-pickers/constants/prop-types';
import TimePickerView, { TimePickerViewProps } from 'material-ui-pickers/TimePicker/components/TimePickerView';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import * as React from 'react';
import {
  dayInfoHelper as dih,
  logRender,
  Point,
} from '../..';
import { csn } from '../../../shared';
import { dateUtils } from '../../../shared';
import { logEvent } from '../../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-time-input-dialog.styles';

interface Props {
  onSubmit: (date: Date) => void;
  onClose: () => void;
  point: Point | null;
  time?: Date;
}

interface State {
  time: DateType;
  selectedUnit: TimePickerViewProps['type'];
  am: boolean;
}

class GcTimeInputDialogView extends React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (!prevState.time) {
      if (!nextProps.time) {
        const time = dateUtils.setMinutesForToday(Math.floor(dateUtils.getMinutesForToday() / 10) * 10);
        return {
          time,
          am: time.getHours() < 12,
        };
      } else {
        return {
          time: nextProps.time,
          am: nextProps.time.getHours() < 12,
        };
      }
    }
    return null;
  }

  public state: State = {
    time: null,
    selectedUnit: 'hours',
    am: true,
  };

  private currentPoint = { left: 0, top: 0 };

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (!prevProps.point && this.props.point) {
      this.setState({ selectedUnit: 'hours' });
    }
  }

  public render(): JSX.Element | null {
    logRender(this);
    const { time } = this.state;
    const { point, classes, onClose } = this.props;

    if (point) {
      this.currentPoint.left = point.x;
      this.currentPoint.top = point.y;
    }

    return (
      <Popover
        BackdropProps={{ className: classes.background }}
        open={Boolean(point)}
        anchorReference="anchorPosition"
        anchorPosition={this.currentPoint}
        onClose={onClose}
        onClick={this.backgroundClick}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <BasePicker
          value={time}
          onChange={this.submitTime}
        >
          {this.renderContent}
        </BasePicker>
      </Popover>
    );
  }

  private renderContent = ({ date, handleChange, handleAccept }: BasePickerRenderArgs) => {
    const { selectedUnit, am } = this.state;
    const { classes, onClose } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.summary}>
          <Typography
            className={csn(
              classes.summaryValue, classes.summaryItem,
              { [classes.summaryItemSelected]: selectedUnit === 'hours' },
            )}
            onClick={this.gotoHours}
          >
            {dih.padTimeUnitWithZero(dateUtils.getHours(date) % 12 || 12)}
          </Typography>
          <Typography className={classes.summaryItem}>
            :
          </Typography>
          <Typography
            className={csn(
              classes.summaryValue, classes.summaryItem,
              { [classes.summaryItemSelected]: selectedUnit === 'minutes' },
            )}
            onClick={this.gotoMinutes}
          >
            {dih.padTimeUnitWithZero(dateUtils.getMinutes(date))}
          </Typography>
          <div className={classes.summaryAmPmColumn}>
            <Typography
              className={csn(
                classes.summaryAmPm,
                { [classes.summaryItemSelected]: am },
              )}
              onClick={this.setAm}
            >
              AM
            </Typography>
            <Typography
              className={csn(
                classes.summaryAmPm,
                { [classes.summaryItemSelected]: !am },
              )}
              onClick={this.setPm}
            >
              PM
            </Typography>
          </div>
        </div>

        <TimePickerView
          date={date}
          onHourChange={(value: MaterialUiPickersDate, isFinish?: boolean) => {
            handleChange(value, isFinish);
            if (isFinish) {
              this.setState({ selectedUnit: 'minutes' });
            }
          }}
          onMinutesChange={handleChange}
          onSecondsChange={handleChange}
          type={selectedUnit}
          minutesStep={5}
        />

        <div className={classes.footer}>
          <Button
            className={classes.footerButton}
            color="primary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.footerButton}
            color="primary"
            onClick={() => {
              logEvent('TimeInputDialog-OK-button');
              handleAccept();
            }}
          >
            OK
          </Button>
        </div>
      </div>
    );
  }

  private setAm = () => this.setState({ am: true });

  private setPm = () => this.setState({ am: false });

  private gotoMinutes = () => this.setState({ selectedUnit: 'minutes' });

  private gotoHours = () => this.setState({ selectedUnit: 'hours' });

  private submitTime = (time: Date) => {
    const { am } = this.state;
    const hours = dateUtils.getHours(time);

    if (!am && hours < 12) {
      time = dateUtils.addHours(time, 12);
    } else if (am && hours >= 12) {
      time = dateUtils.subtractHours(time, 12);
    }

    this.props.onSubmit(time);
  }

  private backgroundClick = (event: React.SyntheticEvent<Element>) => {
    event.stopPropagation();
    event.preventDefault();
  }
}

export const GcTimeInputDialog =
  withStyles(stylesCallback)(GcTimeInputDialogView);
