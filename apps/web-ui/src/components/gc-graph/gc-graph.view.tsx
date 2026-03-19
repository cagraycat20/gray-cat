import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SettingsIcon from '@material-ui/icons/Settings';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import Loadable from 'react-loadable';
import { GcClickableItem, GcTooltip } from '..';
import { csn } from '../../shared';
import { dateUtils } from '../../shared';
import { getGraphData, logRender } from '../../utils';
import { GcSpinner } from '../shared';
import { desktopGraphHeight, gcGraphStylesCallback, StyleProps } from './gc-graph.styles';
import { Props } from './gc-graph.types';
import { IntakeOverTimeProps } from './gc-intake-over-time/gc-intake-over-time.types';

const getGraphDataMemorized = memoizeOne(getGraphData);

const loading = () => (
  <div style={{ height: desktopGraphHeight }}>
    <GcSpinner />
  </div>
);

const GcIntakeOverTime = Loadable({
  loading,
  // tslint:disable-next-line: no-any
  render: (exports: any, props: IntakeOverTimeProps) => {
    const Component = exports.GcIntakeOverTime;
    return <Component {...props} />;
  },
  loader: () => import('./gc-intake-over-time/gc-intake-over-time.view'),
  delay: 300,
});

interface State {
  settingsAnchor?: HTMLElement;
  selectedDate: Date | null;
  shouldLoadData?: boolean;
  graphType: string;
  display: {
    protein: boolean;
    carbs: boolean;
    fat: boolean;
    calories: boolean;
  };
}

type GraphType = 'line' | 'bar';

class GcGraphView extends React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (nextProps.open) {
      const selectedDate = prevState.selectedDate || dateUtils.getDate(nextProps.selectedDate);
      return {
        selectedDate,
        shouldLoadData: prevState.shouldLoadData || selectedDate !== prevState.selectedDate,
      };
    } else {
      return { selectedDate: null };
    }
  }

  public state: State = {
    graphType: 'line',
    display: {
      protein: true,
      carbs: true,
      fat: true,
      calories: true,
    },
    selectedDate: null,
  };

  public render() {
    logRender(this);

    const { classes, open, onClose, mobileLayout } = this.props;
    const { selectedDate, display } = this.state;

    const graphData = this.getGraphData();

    return (
      <Dialog
        classes={{
          paper: classes.dialogPaper,
        }}
        open={open}
        onClose={onClose}
        TransitionComponent={Slide}
        // tslint:disable-next-line: no-any
        TransitionProps={{ direction: 'up' } as any} // for some reason TransitionProps def is incomplete
        disableBackdropClick={true}
      >
        {open &&
          <div className={classes.root}>
            {this.renderToolbar()}
            {selectedDate && graphData
              ?
              <GcIntakeOverTime
                className={classes.graph}
                data={graphData}
                selectedDate={selectedDate}
                plotSettings={{
                  bar: this.state.graphType === 'bar',
                  display,
                }}
                onGoToDate={this.goToDateHandler}
                mobileLayout={mobileLayout}
              />
              :
              <div
                className={csn(classes.graph, classes.noData)}
              >
                <Typography
                  className={classes.noDataText}
                  variant="h4"
                >
                  No data available
                </Typography>
              </div>
            }
            {this.renderSettingsPopup()}
          </div>
        }
      </Dialog>
    );
  }

  private renderToolbar = () => {
    const { classes, onClose, mobileLayout } = this.props;
    const { selectedDate } = this.state;

    const rangeLabel = selectedDate ? this.getRangeLabel(selectedDate) : '';
    return (
      <Paper className={classes.topBar}>
        <div className={classes.topBarRangeSelector}>
          <GcTooltip title="Previous">
            <GcClickableItem
              onClick={this.prevClick}
              className={classes.button}
              color="inherit"
            >
              <KeyboardArrowLeftIcon />
            </GcClickableItem>
          </GcTooltip>
          <Typography
            variant="button"
            className={classes.rangeLabel}
            color="inherit"
          >
            {rangeLabel}
          </Typography>
          <GcTooltip title="Next">
            <GcClickableItem
              onClick={this.nextClick}
              className={classes.button}
              color="inherit"
            >
              <KeyboardArrowRightIcon />
            </GcClickableItem>
          </GcTooltip>
        </div>
        {!mobileLayout &&
          <Typography
            variant="h6"
            className={classes.dialogTitle}
            color="inherit"
          >
            Progress Diagram
          </Typography>
        }
        <div className={classes.topBarRight}>
          <GcTooltip
            key={'settings-icon'}
            title="Settings"
          >
            <GcClickableItem
              className={csn(classes.button, classes.topBarRight)}
              aria-haspopup="true"
              onClick={this.settingsMenuClick}
              color="inherit"
            >
              <SettingsIcon />
            </GcClickableItem>
          </GcTooltip>
          <GcClickableItem
            className={classes.button}
            color="inherit"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </GcClickableItem>
        </div>
      </Paper>
    );
  }

  private displayChange = (propName: string) => (event: React.ChangeEvent<HTMLElement>, checked: boolean) => {
    this.setState((state) => ({
      display: {
        ...state.display,
        [propName]: checked,
      },
    }));
  }

  private changeYear = (amount = 0) => {
    if (this.state.selectedDate) {
      const selectedDate = dateUtils.addYears(this.state.selectedDate, amount);

      this.setState({
        selectedDate,
        shouldLoadData: true,
      });
    }
  }

  private loadDataIfNeed = () => {
    const { selectedDate, shouldLoadData } = this.state;
    if (selectedDate && shouldLoadData) {
      this.props.loadGraphData(selectedDate);
      this.setState(() => ({ shouldLoadData: false }));
    }
  }

  private getGraphData = () => {
    const { days, products, bodyWeightPoints, bodyWeightUnit, open } = this.props;
    const { selectedDate } = this.state;
    if (open && selectedDate) {
      setTimeout(this.loadDataIfNeed, 1);
      return getGraphDataMemorized(selectedDate, days, products, bodyWeightPoints, bodyWeightUnit);
    } else {
      return null;
    }
  }

  private getRangeLabel = (date: Date) => dateUtils.getFormattedDate(date, 'yyyy');

  private nextClick = () => this.changeYear(1);
  private prevClick = () => this.changeYear(-1);

  private settingsMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ settingsAnchor: event.currentTarget });
  }

  private closeSettingsMenu = () => {
    this.setState({ settingsAnchor: undefined });
  }

  private renderSettingsPopup = () => {
    const { classes } = this.props;
    const { display, settingsAnchor, graphType } = this.state;
    return (
      <Popover
        key={'settings-menu'}
        anchorEl={settingsAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(settingsAnchor)}
        onClose={this.closeSettingsMenu}
      >
        <FormGroup className={classes.displayContainer} row={true}>
          <Typography>Show nutrients</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={display.protein}
                onChange={this.displayChange('protein')}
                value="protein"
                classes={{
                  root: classes.proteinCheck,
                  checked: classes.checked,
                }}
              />
            }
            label="Protein"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={display.fat}
                onChange={this.displayChange('fat')}
                value="fat"
                classes={{
                  root: classes.fatCheck,
                  checked: classes.checked,
                }}
              />
            }
            label="Fat"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={display.carbs}
                onChange={this.displayChange('carbs')}
                value="carbs"
                classes={{
                  root: classes.carbsCheck,
                  checked: classes.checked,
                }}
              />
            }
            label="Carbs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={display.calories}
                onChange={this.displayChange('calories')}
                value="calories"
                classes={{
                  root: classes.caloriesCheck,
                  checked: classes.checked,
                }}
              />
            }
            label="Calories"
          />
        </FormGroup>
        <Divider />
        <div className={classes.graphTypeContainer}>
          <Typography>Nutrients graph type</Typography>
          <RadioGroup
            name="graphType"
            row={true}
            value={graphType}
            onChange={this.graphTypeChange}
          >
            <FormControlLabel
              value="line"
              control={
                <Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="Line"
            />
            <FormControlLabel
              value="bar"
              control={
                <Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="Bar"
            />
          </RadioGroup>
        </div>
      </Popover>
    );
  }

  private graphTypeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ graphType: event.target.value as GraphType })

  private goToDateHandler = (date: Date) => {
    const { onClose, goToDate } = this.props;
    onClose();
    goToDate(date);
  }

}

export const GcGraphViewStyled =
  withStyles(gcGraphStylesCallback, { withTheme: true })(GcGraphView);
