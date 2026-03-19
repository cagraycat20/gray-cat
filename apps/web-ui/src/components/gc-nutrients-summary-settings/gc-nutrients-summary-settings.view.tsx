import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowDropIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import {
  BodyWeightPoint,
  dayInfoHelper as dih,
  GcNutrientsSummary,
  GcTooltip,
  logRender,
  NutrientDisplayOptionBase,
  NutrientDisplayOptionGen,
  NutrientPropName,
  Product,
  productHelper as ph,
  UserSettingsView,
} from '..';
import { csn, DayInfo } from '../../shared';
import {
  getCaloriesOptions,
  getNutrientOptions,
  nutrientsDisplayDefault,
  OptionInfo,
  OptionsInfo,
  presets,
 } from './gc-nutrients-summary-settings.consts';
import {
  StyleProps,
  stylesCallback,
} from './gc-nutrients-summary-settings.styles';
import { Props } from './gc-nutrients-summary-settings.types';

interface OptionPopup {
  anchor: HTMLElement;
  nutrient: NutrientPropName;
  index?: number; // 0 | 1 | 2 | 3;
}

export interface State {
  savedNutrientsDisplay?: UserSettingsView['nutrientsDisplay'];
  nutrientsDisplay: UserSettingsView['nutrientsDisplay'];
  selectedPreset: number | 'custom';
  optionPopup?: OptionPopup;
}

const maxValues = 2;

const defNutrientValues = {
  date: '',
  bodyWeight: 75,
  protein: 166,
  fat: 13,
  carbs: 275,
  calories: 1745,
  proteinFromProteinBased: 85,
};

const getNutrientValues = memoizeOne((
  products: Array<Product>,
  date: string,
  days: Array<DayInfo>,
  bodyWeightPoints: Array<BodyWeightPoint>,
) => {
  const day = dih.findDay(date, days);
  if (day) {
    const { nutrients, proteinFromProteinBased } = ph.addUpNutrientsWithProteinBased(day.consumed, products);
    const bodyWeightInfo = dih.getDayBodyWeightInfo(date, bodyWeightPoints);
    return {
      date,
      ...nutrients,
      proteinFromProteinBased,
      bodyWeight: bodyWeightInfo.desiredBodyWeight || bodyWeightInfo.bodyWeight,
    };
  }
  return null;
});

class GcNutrientsSummarySettingsView extends
  React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {

    if (!nextProps.open && prevState.savedNutrientsDisplay) {
      return {
        savedNutrientsDisplay: undefined,
      };
    } else if (prevState.savedNutrientsDisplay !== nextProps.nutrientsDisplay) {
      return {
        savedNutrientsDisplay: nextProps.nutrientsDisplay,
        nutrientsDisplay: {
          protein: [...nextProps.nutrientsDisplay.protein],
          fat: [...nextProps.nutrientsDisplay.fat],
          carbs: [...nextProps.nutrientsDisplay.carbs],
          calories: [...nextProps.nutrientsDisplay.calories],
        },
      };
    }
    return null;
  }

  public state: State = {
    nutrientsDisplay: nutrientsDisplayDefault,
    selectedPreset: 'custom',
  };

  private savedOptionPopup?: OptionPopup;
  private savedOptionsInfo: OptionsInfo = [];

  public render(): JSX.Element {
    const { classes, open, bodyWeightUnit , date,
      days, products, bodyWeightPoints} = this.props;
    logRender(this);
    const { nutrientsDisplay, selectedPreset} = this.state;

    const nutrientValues =
      getNutrientValues(products, date, days, bodyWeightPoints) || defNutrientValues;

    return (
      <Dialog
        classes={{paper: classes.dialog}}
        onClose={this.props.onClose}
        open={open}
      >
        <DialogTitle className={classes.header} >
          Setup Nutrients Layout
        </DialogTitle>

        <div className={classes.nutrientsContainer}>
          <GcNutrientsSummary
            customNutrientsDisplay={nutrientsDisplay}
            bodyWeight={nutrientValues.bodyWeight}
            protein={nutrientValues.protein}
            fat={nutrientValues.fat}
            carbs={nutrientValues.carbs}
            calories={nutrientValues.calories}
            proteinFromProteinBased={nutrientValues.proteinFromProteinBased}
          />
        </div>

        <DialogContent className={classes.content}>
          <div className={classes.centeredContent}>
            <div className={classes.presets}>
              {
                presets(bodyWeightUnit).map((iter, index) => (
                  <GcTooltip
                    title={iter.name}
                    key={index}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      className={csn(
                        classes.preset,
                        {[classes.presetSelected]: selectedPreset === index},
                      )}
                      onClick={() => {
                        this.setState({
                          nutrientsDisplay: {...iter.nutrientsDisplay},
                          selectedPreset: index,
                        });
                      }}
                    >
                      {iter.caption}
                    </Button>
                  </GcTooltip>
                ))
              }
              <GcTooltip title="Custom layout">
                <Button
                  variant="outlined"
                  color="primary"
                  className={csn(
                    classes.preset,
                    {[classes.presetSelected]: selectedPreset === 'custom'},
                  )}
                  onClick={this.customClick}
                >
                  custom
                </Button>
              </GcTooltip>
            </div>

            <div className={classes.options}>
              {this.renderOptions()}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={this.saveClick}
          >
            Save
          </Button>
        </DialogActions>
        {this.renderOptionsPopup()}
      </Dialog>
    );
  }

  private renderOptions = () => {
    const { classes, compact } = this.props;

    const { nutrientsDisplay } = this.state;

    return ph.nutrientProps.map((iter) => (
      <React.Fragment key={iter}>
      <div className={classes.optionsContainer}>
        <Typography className={classes.nutrientCaption}>
          {ph.nutrientCaptions[iter]}
        </Typography>
        {
          (nutrientsDisplay[iter] as Array<NutrientDisplayOptionBase>)
            .map((optionIter, index) =>
              (index > 0 && compact)
                ? null
                : this.renderOption(index, iter, optionIter),
              )
        }
        {
          !compact &&
          (nutrientsDisplay[iter].length < maxValues) &&
          <div
            className={csn(classes.option, classes.newOption)}
            onClick={(event) => this.setState({
              optionPopup: {
                anchor: event.currentTarget,
                nutrient: iter,
              },
            })}
          >
            <AddCircleIcon
              className={csn(
                classes.optionIcon,
                classes.newOptionFontColor,
                classes.optionIconVisible,
              )}
            />
            <Typography className={csn(classes.optionLabel, classes.newOptionFontColor)}>
              Add Value
            </Typography>
          </div>
        }
      </div>
      <Divider />
      </React.Fragment>
    ));
  }

  private renderOption: (
    index: number,
    nutrient: NutrientPropName,
    option: NutrientDisplayOptionBase,
  ) => JSX.Element = (index, nutrient, option) => {
    const { classes, theme: {custom: { colors}}, compact, bodyWeightUnit } = this.props;
    const { nutrientsDisplay, selectedPreset } = this.state;

    let optionItem: OptionInfo | undefined;
    if (nutrient === 'calories') {
      optionItem = getCaloriesOptions(bodyWeightUnit).find((iter) => iter.option === option);
    } else {
      optionItem = getNutrientOptions(bodyWeightUnit).find((iter) => iter.option === option);
    }

    let clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
    if (selectedPreset === 'custom') {
      clickHandler = (event: React.MouseEvent<HTMLDivElement>) => this.setState({
        optionPopup: {
          anchor: event.currentTarget,
          nutrient,
          index,
        },
      });
    }

    const icon = (nutrientsDisplay[nutrient].length < 2 || compact)
      ? (
      <ArrowDropIcon
        className={csn(
          classes.optionIcon,
          {[classes.optionIconVisible]: selectedPreset === 'custom'},
        )}
      />
      )
    : (
      <CancelIcon
        className={csn(classes.optionIcon, classes.optionIconVisible)}
        onClick={(event) => {
          event.stopPropagation();
          const changes: Array<NutrientDisplayOptionGen> = [...nutrientsDisplay[nutrient]];
          changes.splice(index, 1);
          this.setState({nutrientsDisplay: {
              ...nutrientsDisplay,
              [nutrient]: changes,
            },
            selectedPreset: 'custom',
          });
        }}
      />
      );

    return (
      <div
        key={index}
        className={classes.option}
        style={{backgroundColor: colors[nutrient] +
          (selectedPreset === 'custom' ? 'BB' : '75')}}
        onClick={clickHandler}
      >
        <Typography className={classes.optionLabel}>
          {optionItem ? optionItem.getName(nutrient) : option}
        </Typography>
        {icon}
      </div>
    );
  }

  private renderOptionsPopup = () => {
    const { optionPopup, nutrientsDisplay } = this.state;
    const { bodyWeightUnit, classes } = this.props;

    if (!optionPopup && !this.savedOptionPopup) {
      return null;
    }

    if (optionPopup && optionPopup !== this.savedOptionPopup) {
      this.savedOptionPopup = optionPopup;
      this.savedOptionsInfo = optionPopup.nutrient === 'calories'
        ? getCaloriesOptions(bodyWeightUnit)
        : getNutrientOptions(bodyWeightUnit);
    }

    return (
      <Popover
        key={'menu'}
        open={Boolean(optionPopup)}
        onClose={this.closeOptionsPopup}
        disableRestoreFocus={true}
        anchorEl={this.savedOptionPopup && this.savedOptionPopup.anchor}
        anchorReference="anchorEl"
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <List className={classes.optionsList}>
          {
            this.savedOptionsInfo.map((iter) => (
              !(
                (
                  (iter.option === 'fromNutrientBased') ||
                  (iter.option === 'fromNutrientBasedPerKg')
                ) &&
                (
                  this.savedOptionPopup &&
                  this.savedOptionPopup.nutrient !== 'protein'
                )
              ) &&
              (
                <ListItem
                  key={iter.option}
                  button={true}
                  divider={true}
                  onClick={() => {
                    if (!this.savedOptionPopup) {
                      return;
                    }

                    const { index, nutrient } = this.savedOptionPopup;
                    const changes: Array<NutrientDisplayOptionBase> =
                    [...nutrientsDisplay[nutrient]];
                    if (index || index === 0) {
                      changes[index] = iter.option;
                    } else {
                      changes.push(iter.option);
                    }
                    this.setState({
                      nutrientsDisplay: {
                        ...nutrientsDisplay,
                        [nutrient]: changes,
                      },
                      selectedPreset: 'custom',
                      optionPopup: undefined,
                    });
                  }}
                >
                  <ListItemText
                    primary={
                      this.savedOptionPopup &&
                        iter.getName(this.savedOptionPopup.nutrient)
                    }
                    secondary={
                      this.savedOptionPopup &&
                      iter.getDescription &&
                        iter.getDescription(this.savedOptionPopup.nutrient)
                    }
                    secondaryTypographyProps={{
                      variant: 'caption',
                    }}
                  />
                </ListItem>
              )
            ))
          }
        </List>
      </Popover>
    );
  }

  private closeOptionsPopup = () => this.setState({optionPopup: undefined});

  private customClick = () => this.setState({selectedPreset: 'custom'});

  private saveClick = () => {
    this.props.onClose();
    this.props.onSubmit(this.state.nutrientsDisplay);
  }
}

export const GcNutrientsSummarySettingsViewStyled =
  withStyles(stylesCallback, {withTheme: true})(GcNutrientsSummarySettingsView);
