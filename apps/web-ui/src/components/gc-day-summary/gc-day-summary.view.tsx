import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover, { PopoverOrigin } from '@material-ui/core/Popover';
import Slide from '@material-ui/core/Slide';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LockIcon from '@material-ui/icons/Lock';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import * as React from 'react';
import {
  dateUtils,
  GcClickableItem,
  GcCollage,
  GcContainerLayer,
  GcDaysList,
  GcNumberInputWithButtons,
  GcNutrientsSummary,
  GcNutrientsSummarySettings,
  GcTooltip,
  GcTutorial,
  keyboardEventHelper as keh,
  logRender,
  mathUtils,
  productHelper as ph,
  PropsOf,
  themeCustomData,
  unitHelper,
} from '..';
// import { FacebookIcon } from '../../assets/icons/facebook.icon';
import { csn } from '../../shared';
import { logEvent } from '../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-day-summary.styles';
import { Props } from './gc-day-summary.types';
import { GcMealSelectorContainer } from './gc-meal-selector/gc-meal-selector.container';

type ApplyStyleCallback = PropsOf<typeof
  GcContainerLayer>['onGetApplyStyleCallback'];

interface DaysList {
  anchor: HTMLElement;
  caption: string;
  showFooter: boolean;
  onDayClick: (date: string) => void;
  position: 'bottom' | 'left';
}

export interface State {
  bodyWeightAnchor?: HTMLElement;
  bodyWeightDialogVisible: boolean;
  dayMenuAnchor?: HTMLElement;
  daysList?: DaysList;
  shareVisible?: boolean;
  pendingBodyWeight: string;
  pendingDesBodyWeight: string;
  copyConfirmation: {
    fromDate: string;
    toDate: string;
  } | null;
  scrolled?: boolean;
  canShowTutorial: boolean;
  mealSelectorAnchor?: HTMLElement;
}

function Transition(props: object) {
  return <Slide direction="up" {...props} />;
}

class GcDaySummaryView extends
  React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (!prevState.pendingBodyWeight && !prevState.pendingDesBodyWeight) {
      return {
        ...({ pendingBodyWeight: nextProps.bodyWeight.toString() }),
        ...({ pendingDesBodyWeight: nextProps.desiredBodyWeight.toString() }),
      };
    }
    return null;
  }

  public state: State = {
    pendingBodyWeight: '',
    pendingDesBodyWeight: '',
    bodyWeightDialogVisible: false,
    copyConfirmation: null,
    canShowTutorial: false,
  };

  private applyStyleToRoot?: (style: React.CSSProperties | undefined) => void;
  private tutorialTimer: NodeJS.Timeout | null = null;

  private savedDayList: State['daysList'];
  private prevDayListOpened = false;

  public componentDidMount() {
    this.props.onGetScrolledStateChangeCallback(this.setScrolledState);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.mainBarHeight !== prevProps.mainBarHeight) {
      this.setScrolledState(Boolean(this.state.scrolled));
    }
  }

  public componentWillUnmount() {
    if (this.tutorialTimer) {
      clearTimeout(this.tutorialTimer);
    }
  }

  public render(): JSX.Element {
    logRender(this);
    const { classes, bodyWeight, desiredBodyWeight, date,
      bodyWeightUnit, protein, proteinFromProteinBased,
      fat, carbs, calories, locked, showSummaryTutorial, canUndo } = this.props;
    const { dayMenuAnchor, scrolled, canShowTutorial } = this.state;
    const today = dateUtils.getFormattedDate(dateUtils.getCurrentDate());

    if (showSummaryTutorial) {
      if (this.tutorialTimer) {
        clearTimeout(this.tutorialTimer);
      }
      this.tutorialTimer = setTimeout(
        this.tutorialTimerCallback, 100);
    }

    return (
      <GcContainerLayer
        className={classes.root}
        onGetApplyStyleCallback={this.getApplyStyleCallback}
      >
        <div
          className={csn(
            classes.firstRowBackground,
            { [classes.firstRowBackgroundScrolled]: scrolled },
          )}
        />
        <div className={classes.content}>
          <div className={classes.dateSection}>

            <GcTooltip title="Previous Day">
              <GcClickableItem
                className={classes.navButton}
                onClick={this.prevButtonClick}
              >
                <KeyboardArrowLeftIcon />
              </GcClickableItem>
            </GcTooltip>

            <GcTooltip title="Select Day">
              <GcClickableItem
                onClick={this.dateButtonClick}
                className={classes.dateContainer}
                classes={{
                  label: classes.dateContainerContent,
                }}
              >

                <Typography
                  className={classes.dateLongDayName}
                  color={today === date ? 'primary' : 'default'}
                  variant={'subtitle1'}
                >
                  {dateUtils.getFormattedDate(dateUtils.getDate(date), 'EEEE')}
                </Typography>

                <div className={classes.dateSecondRow}>
                  <Typography
                    className={classes.dateShortDayName}
                    color={today === date ? 'primary' : 'default'}
                    variant={'caption'}
                  >
                    {dateUtils.getFormattedDate(dateUtils.getDate(date), 'EEEE') + '. '}
                  </Typography>

                  <Typography
                    className={classes.dateDay}
                    color={today === date ? 'primary' : 'default'}
                    variant={'caption'}
                  >
                    {dateUtils.getFormattedDate(dateUtils.getDate(date), 'MMM dd')}
                  </Typography>

                  <Typography
                    className={classes.dateYear}
                    color={today === date ? 'primary' : 'default'}
                    variant={'caption'}
                  >
                    {', ' + dateUtils.getFormattedDate(dateUtils.getDate(date), 'yyyy')}
                  </Typography>
                </div>
              </GcClickableItem>
            </GcTooltip>

            <GcTooltip title="Next Day">
              <GcClickableItem
                onClick={this.nextButtonClick}
                className={classes.navButton}
              >
                <KeyboardArrowRightIcon />
              </GcClickableItem>
            </GcTooltip>
          </div>

          <GcClickableItem
            onClick={this.changeNutrientsSumDialog}
            className={classes.nutrientsSummaryButton}
          >
            {
              showSummaryTutorial && canShowTutorial &&
              <GcTutorial
                classes={{ root: classes.tutorial }}
                onRenderContent={this.renderTutorialContent}
                onClose={this.closeTutorial}
              />
            }

            <GcNutrientsSummary
              protein={protein}
              proteinFromProteinBased={proteinFromProteinBased}
              fat={fat}
              carbs={carbs}
              calories={calories}
              bodyWeight={desiredBodyWeight || bodyWeight}
            />
          </GcClickableItem>

          <div className={classes.weightContainer}>
            <GcTooltip key="weight" title="Body Weight">
              <GcClickableItem
                onClick={this.bodyWeightClick}
                className={classes.weightButton}
                focusRipple={false}
              >
                <PersonIcon className={classes.weightIcon} />
                <Typography
                  variant={'h5'}
                  className={classes.weight}
                >
                  {mathUtils.round(bodyWeight, 1)}
                </Typography>
                <Typography
                  variant={'caption'}
                  className={classes.weightUnits}
                >
                  {unitHelper.getBodyWeightUnitTitle(bodyWeightUnit)}
                </Typography>
              </GcClickableItem>
            </GcTooltip>
          </div>

          <div className={classes.menuButtonContainer}>
            {
              // loggedIn && Boolean(calories) &&
              // <GcTooltip
              //   key={'share'}
              //   title="Share on facebook"
              // >
              //   <GcClickableItem
              //     className={csn(classes.menuButton, classes.facebookButton)}
              //     aria-haspopup="true"
              //     onClick={this.openShareDialog}
              //   >
              //     <FacebookIcon className={classes.facebookIcon} />
              //   </GcClickableItem>
              // </GcTooltip>
            }

            <GcClickableItem
              className={classes.menuButton}
              onClick={this.menuButtonClick}
            >
              <MoreVertIcon />
            </GcClickableItem>
          </div>

          <Menu
            anchorEl={dayMenuAnchor || null}
            open={Boolean(dayMenuAnchor)}
            onClose={this.closeDayMenu}
          >
            <MenuItem onClick={this.menuClickAddSavedMeal}>Add Saved Meal</MenuItem>
            <MenuItem onClick={this.menuClickCopyFrom}>Copy From</MenuItem>
            <MenuItem onClick={this.menuClickCopyTo}>Copy To</MenuItem>
            <MenuItem onClick={this.clearDay}>Clear Day</MenuItem>
            <MenuItem onClick={this.openBodyWeightDialog}>
              {`Change Body Weight (${mathUtils.round(bodyWeight, 1)} ${bodyWeightUnit})`}
            </MenuItem>
            <Divider />
            <MenuItem onClick={this.changeNutrientsSumDialog}>
              Change Nutrients Summary Layout
            </MenuItem>
            <Divider />
            <MenuItem
              disabled={!canUndo}
              onClick={this.undo}
            >
              Undo Last Change
            </MenuItem>
            {
              locked && [
                <Divider key="divider" />,
                <MenuItem key="item" onClick={this.unlockDay}>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <Typography variant="body1">Unlock day</Typography>
                </MenuItem>,
              ]
            }
          </Menu>

          {this.renderWeightInputPopover()}
          {this.renderWeightInputDialog()}
          {this.renderDayListPopover()}
          {this.renderCopyConfirmationDialog()}
          {this.renderShareDialog()}
          {this.renderMealSelector()}

          <GcNutrientsSummarySettings />
        </div>
      </GcContainerLayer>
    );
  }

  private renderWeightInput() {
    const { classes, bodyWeightUnit } = this.props;
    const { pendingBodyWeight, pendingDesBodyWeight } = this.state;
    return (
      <div className={classes.weightInputContainer}>

        <GcNumberInputWithButtons
          autoFocus={true}
          label="Current body weight"
          value={pendingBodyWeight}
          incValue={0.1}
          onChange={this.changePendingBodyWeightValue}
          variant="standard"
          InputProps={{
            inputProps: {
              integerPartLength: 3,
              decimalPartLength: 1,
              onKeyDown: this.bodyWeightInputKeyDown,
              onFocus: this.bodyWeightInputFocus as React.FocusEventHandler<Element>,
            },
            endAdornment: <InputAdornment position="end">
              {unitHelper.getBodyWeightUnitTitle(bodyWeightUnit)}
            </InputAdornment>,
          }}
        />

        <GcNumberInputWithButtons
          className={classes.desiredWeightInput}
          label="Desirable body weight"
          value={pendingDesBodyWeight}
          incValue={0.1}
          onChange={this.changePendingDesBodyWeightValue}
          variant="standard"
          InputProps={{
            inputProps: {
              integerPartLength: 3,
              decimalPartLength: 1,
              onKeyDown: this.bodyWeightInputKeyDown,
              onFocus: this.bodyWeightInputFocus as React.FocusEventHandler<Element>,
            },
            endAdornment: <InputAdornment position="end">
              {unitHelper.getBodyWeightUnitTitle(bodyWeightUnit)}
            </InputAdornment>,
          }}
        />

        <Typography
          variant="caption"
          className={classes.desiredWeightHint}
        >
          Desirable body weight represents your current goal regarding your body weight.
          It is used in calculation of the amount of nutrients per kg of body weight.
        </Typography>

      </div>
    );
  }

  private renderWeightInputPopover() {
    const { bodyWeightAnchor } = this.state;
    return (
      <Popover
        onClick={this.bodyWeightInputPopoverClick}
        open={Boolean(bodyWeightAnchor)}
        anchorEl={bodyWeightAnchor}
        anchorReference="anchorEl"
        onClose={this.closeBodyWeightPopover}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {this.renderWeightInput()}
      </Popover>
    );
  }

  private renderWeightInputDialog() {
    const { bodyWeightDialogVisible } = this.state;
    const { classes } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.weightInputDialog }}
        onClose={this.closeBodyWeightDialog}
        open={bodyWeightDialogVisible}
      >
        <DialogTitle>
          Enter Your Body Weight
        </DialogTitle>
        <DialogContent className={classes.weightInputDialogContent}>
          {this.renderWeightInput()}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.closeBodyWeightDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={this.submitBodyWeightDialog}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private renderDayListPopover() {
    const { daysList } = this.state;
    const { classes, shrinkLevel } = this.props;

    if (!this.prevDayListOpened && daysList) {
      logEvent('DaylistOpened');
    }
    this.prevDayListOpened = Boolean(daysList);

    if (daysList && daysList !== this.savedDayList) {
      this.savedDayList = daysList;
    }

    let anchorOrigin: PopoverOrigin;
    let transformOrigin: PopoverOrigin;
    if (this.savedDayList && this.savedDayList.position === 'bottom') {
      anchorOrigin = {
        vertical: 'bottom',
        horizontal: (shrinkLevel === 2) ? 'center' : 'left',
      };
      transformOrigin = {
        vertical: 'top',
        horizontal: (shrinkLevel === 2) ? 'center' : 'left',
      };
    } else {
      anchorOrigin = {
        vertical: 'top',
        horizontal: 'left',
      };
      transformOrigin = {
        vertical: 'top',
        horizontal: 'right',
      };
    }

    return (
      <Popover
        classes={{ paper: classes.daysPopup }}
        open={Boolean(daysList)}
        anchorEl={daysList && daysList.anchor}
        anchorReference="anchorEl"
        onClose={this.closeDaysList}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        marginThreshold={0}
      >
        <div className={classes.daysPopupRoot}>

          <div className={classes.daysPopupHeader}>
            <Typography variant="subtitle1">
              {this.savedDayList && this.savedDayList.caption}
            </Typography>

            <GcClickableItem
              className={classes.daysPopupCloseButton}
              onClick={this.closeDaysList}
            >
              <ClearIcon />
            </GcClickableItem>
          </div>

          <GcDaysList onSelectDay={daysList && daysList.onDayClick} />
          {
            this.savedDayList && this.savedDayList.showFooter &&
            <div className={classes.daysPopupFooter}>
              <Button
                className={classes.daysPopupButton}
                onClick={this.selectTodayButtonClick}
              >
                today
              </Button>
            </div>
          }
        </div>
      </Popover>
    );
  }

  private renderMealSelector(): JSX.Element {
    const { mealSelectorAnchor } = this.state;

    return (
      <GcMealSelectorContainer
        anchor={mealSelectorAnchor}
        onMealSelected={this.handleMealSelected}
        onClose={this.handleCloseMealSelector}
      />
    );
  }

  private renderCopyConfirmationDialog = () => {
    const { copyConfirmation } = this.state;
    return (
      <Dialog
        onClose={this.closeCopyConfirmation}
        open={Boolean(copyConfirmation)}
      >
        <DialogTitle>
          Day is not empty
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Target day contains data,
            all info about food for this day will be overwritten.<br />
            Proceed anyway?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.closeCopyConfirmation}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={this.submitCopyConfirmation}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private renderTutorialContent = () => {
    const { classes } = this.props;
    return (
      <div className={classes.tutorialRoot}>
        <Typography variant="h6">
          This is the summary of the day
        </Typography>
        <div className={classes.tutorialNutrientsContainer}>
          {
            ph.nutrientProps.map((iter) => (
              <Typography
                key={iter}
                className={classes.tutorialNutrient}
                style={{
                  ...themeCustomData.custom.nutrientProps[iter],
                }}
              >
                {ph.nutrientCaptionsShort[iter]}
              </Typography>
            ))
          }
        </div>
        <Typography
          variant="body2"
        >
          You can change how the data is presented by clicking on
          the summary or by selecting the proper command in the day menu
        </Typography>
      </div>
    );
  }

  private renderShareDialog = () => {
    return (
      <GcCollage
        key={'share-dialog'}
        open={Boolean(this.state.shareVisible)}
        onClose={this.closeShareDialog}
        TransitionComponent={Transition}
      />
    );
  }

  private getApplyStyleCallback: ApplyStyleCallback = (applyStyle) =>
    this.applyStyleToRoot = applyStyle

  private setScrolledState = (scrolled: boolean) => {
    if (this.applyStyleToRoot) {
      if (scrolled) {
        this.applyStyleToRoot({
          transform:
            `translateY(-${this.props.mainBarHeight}px)`,
        });
      } else {
        this.applyStyleToRoot(undefined);
      }
      if (this.state.scrolled !== scrolled) {
        this.setState({ scrolled });
      }
    }
  }

  private submitCopyConfirmation = () => {
    const { copyConfirmation } = this.state;
    if (copyConfirmation) {
      this.setState({ copyConfirmation: null });
      this.proceedCopyDay(
        copyConfirmation.fromDate,
        copyConfirmation.toDate,
      );
    }
  }

  private closeCopyConfirmation = () => {
    this.setState({ copyConfirmation: null });
  }

  private tutorialTimerCallback = () => this.setState({ canShowTutorial: true });

  private bodyWeightInputPopoverClick = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation()

  private submitPendingBodyWeight = () => {
    const { onChangeDayBodyWeightInfo, date, bodyWeight, desiredBodyWeight, bodyWeightUnit } = this.props;
    const { pendingBodyWeight, pendingDesBodyWeight } = this.state;

    const parsedWeight = parseFloat(pendingBodyWeight);
    const parsedDesWeight = parseFloat(pendingDesBodyWeight);

    const weight = isNaN(parsedWeight) ? 0 : parsedWeight;
    const desWeight = isNaN(parsedDesWeight) ? 0 : parsedDesWeight;

    const weightChange = weight !== bodyWeight
      ? { bodyWeight: unitHelper.getValue(weight, bodyWeightUnit, 'kg') }
      : null;
    const desWeightChange = desWeight !== desiredBodyWeight
      ? { desiredBodyWeight: unitHelper.getValue(desWeight, bodyWeightUnit, 'kg') }
      : null;

    if (weightChange || desWeightChange) {
      onChangeDayBodyWeightInfo({ date, ...weightChange, ...desWeightChange });
    }
  }

  private closeBodyWeightPopover = () => {
    this.setState({ bodyWeightAnchor: undefined });
    this.submitPendingBodyWeight();
  }

  // need timeout because of mat-ui bug (when show/hide 2 popups simultaneously)
  private closeDayMenu = () =>
    setTimeout(() => this.setState({ dayMenuAnchor: undefined }), 0)

  private handleCloseMealSelector = () => {
    this.setState({ mealSelectorAnchor: undefined });
  }

  private handleMealSelected = (time: number) => {
    const { dayInfo } = this.props;

    this.props.onAddSavedMeal(this.props.date, time, dayInfo ? dayInfo.consumed : []);
    this.handleCloseMealSelector();
    this.closeDayMenu();
  }

  private menuClickAddSavedMeal = (event: React.SyntheticEvent<HTMLElement>) => {
    this.setState({ mealSelectorAnchor: event.currentTarget });
  }

  private copyTo = (date: string) => {
    this.copyDay(this.props.date, date);
  }

  private menuClickCopyTo = (event: React.SyntheticEvent<HTMLElement>) => {
    logEvent('ClickCopyTo');
    this.setState({
      daysList: {
        anchor: event.currentTarget,
        caption: 'Select day to copy to',
        showFooter: false,
        onDayClick: this.copyTo,
        position: 'left',
      },
    });
  }

  private copyFrom = (date: string) => {
    this.copyDay(date, this.props.date);
  }

  private menuClickCopyFrom = (event: React.SyntheticEvent<HTMLElement>) => {
    logEvent('ClickCopyFrom');
    this.setState({
      daysList: {
        anchor: event.currentTarget,
        caption: 'Select day to copy from',
        showFooter: false,
        onDayClick: this.copyFrom,
        position: 'left',
      },
    });
  }

  private copyDay = (fromDate: string, toDate: string) => {
    if (this.props.onCheckIfDayHasProducts(toDate)) {
      this.setState({ copyConfirmation: { fromDate, toDate } });
    } else {
      this.proceedCopyDay(fromDate, toDate);
    }
  }

  private proceedCopyDay = (from: string, to: string) => {
    this.props.onCopyFromDay(from, to);
    this.closeDaysList();
    this.closeDayMenu();
  }

  private unlockDay = (event: React.MouseEvent<HTMLElement>) =>
    this.props.onUnlockDay(this.props.date)

  private openBodyWeightDialog = () => {
    logEvent('OpenBodyWeightDialog');
    this.setState(
      { bodyWeightDialogVisible: true },
      this.closeDayMenu,
    );
  }

  private closeBodyWeightDialog = () => {
    this.setState({ bodyWeightDialogVisible: false });
  }

  private submitBodyWeightDialog = () => {
    this.closeBodyWeightDialog();
    this.submitPendingBodyWeight();
  }

  private clearDay = () => {
    this.closeDayMenu();
    this.props.onClearDay(this.props.date);
  }

  // private openShareDialog = () => {
  //   logEvent('OpenShareDialog');
  //   this.setState({ shareVisible: true });
  // }

  private undo = () => {
    this.props.onUndo(this.props.date);
    this.closeDayMenu();
  }

  private closeShareDialog = () => this.setState({ shareVisible: false });

  private changeNutrientsSumDialog = () => {
    this.closeDayMenu();
    logEvent('ShowNutrientSummarySetupDialog');
    this.props.onShowNutrientsSumSetDialog();
  }

  private daysListItemSelect = (date: string) => {
    this.closeDaysList();
    this.props.onChangeDate(date);
  }

  private prevButtonClick = (event: React.MouseEvent<HTMLElement>) =>
    this.props.onChangeDate(dateUtils
      .getFormattedDate(dateUtils.subtractDays(this.props.date, 1)))

  private nextButtonClick = (event: React.MouseEvent<HTMLElement>) =>
    this.props.onChangeDate(dateUtils
      .getFormattedDate(dateUtils.addDays(dateUtils.getDate(this.props.date), 1)))

  private menuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.setState({ dayMenuAnchor: event.currentTarget });
  }

  private dateButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.setState({
      daysList: {
        anchor: event.currentTarget,
        caption: 'Select day to navigate to',
        showFooter: true,
        onDayClick: this.daysListItemSelect,
        position: 'bottom',
      },
    });
  }

  private closeDaysList = () => this.setState({ daysList: undefined });

  private selectTodayButtonClick = () => {
    this.closeDaysList();
    this.props.onChangeDate(dateUtils.getFormattedDate(dateUtils.getCurrentDate()));
  }

  private changePendingBodyWeightValue =
    (event: React.ChangeEvent<HTMLInputElement>) =>
      this.setState({ pendingBodyWeight: event.target.value })

  private changePendingDesBodyWeightValue =
    (event: React.ChangeEvent<HTMLInputElement>) =>
      this.setState({ pendingDesBodyWeight: event.target.value })

  private bodyWeightClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    logEvent('OpenBodyWeightPopup');
    this.setState({
      bodyWeightAnchor: event.currentTarget,
      pendingBodyWeight: this.props.bodyWeight.toString(),
      pendingDesBodyWeight: this.props.desiredBodyWeight.toString(),
    });
  }

  private bodyWeightInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (keh.isEnter(event)) {
      event.stopPropagation();
      event.preventDefault();
      const { bodyWeightAnchor, bodyWeightDialogVisible } = this.state;
      if (bodyWeightAnchor) {
        this.closeBodyWeightPopover();
      } else if (bodyWeightDialogVisible) {
        this.submitBodyWeightDialog();
      }
    }
  }

  private bodyWeightInputFocus =
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.target.select();
    }

  private closeTutorial = () => {
    this.props.onChangeFlags({ daySummaryIsShowed: true });
  }
}

export const GcDaySummaryViewStyled =
  withStyles(stylesCallback)(GcDaySummaryView);
