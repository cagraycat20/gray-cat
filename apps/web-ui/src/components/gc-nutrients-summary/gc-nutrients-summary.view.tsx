import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {
  GcTooltip,
  logRender,
  mathUtils,
  NutrientDisplayOptionGen,
  NutrientName,
  NutrientPropName,
  productHelper as ph,
 } from '..';
import { csn } from '../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-nutrients-summary.styles';
import { Props } from './gc-nutrients-summary.types';

type NutrientSuffix = '%' | 'g' | 'kcal';

interface NutrientValue {
  value: React.ReactText;
  suffix: NutrientSuffix;
  tooltip: string;
}

type NutrValuesFunc = (nutrient: NutrientName) => Array<NutrientValue | null>;
type CalValuesFunc = () => Array<NutrientValue | null>;

class GcNutrientsSummaryView extends React.PureComponent<Props & StyleProps> {

  private caloriesFromNutrients: number | null = null;

  public render(): JSX.Element {
    logRender(this);
    const { classes } = this.props;
    this.caloriesFromNutrients = null; // we need to recalculate this
    return (
      <div className={classes.root}>
        {ph.nutrientProps.map((nutrPropIter) => this.renderNutrientProp(nutrPropIter))}
      </div>
    );
  }

  private formatValue(value: number) {
    if (value >= 10000) {
      return Math.floor(value / 1000) + 'K';
    }
    if (value >= 1000) {
      return Math.floor(value);
    }
    return mathUtils.round(value);
  }

  private renderNutrientProp(nutrient: NutrientPropName): JSX.Element {
    const {classes, theme, compact, nutrientsDisplay,
      onNutrientClick, ...restProps} = this.props;

    const singleValue = compact ||
      (nutrientsDisplay[nutrient] as Array<NutrientDisplayOptionGen>).length < 2;

    let values: Array<NutrientValue | null>;
    if (nutrient === 'calories') {
      values = this.getCaloriesValues();
    } else {
      values = this.getNutrientValues(nutrient);
    }

    return (
      <div
        key={nutrient}
        style={{
          backgroundColor:
            theme.custom.colors[nutrient] + (!restProps[nutrient] ? '60' : ''),
        }}
        className={classes.nutrientContainer}
        onClick={onNutrientClick ? () => onNutrientClick(nutrient) : undefined}
      >
        <Typography className={classes.nutrientName}>
          {singleValue ? ph.nutrientCaptionsShort[nutrient] : ph.nutrientCaptions[nutrient]}
        </Typography>
        {
          values.map((iter, index) => {
            return (singleValue && index > 0)
              ? null
              : iter && this.renderNutrientPropValue(iter, index, singleValue);
          })
        }
      </div>
    );
  }

  private getValuePositionClass = (index: number) => {
    switch (index) {
      case 0: return this.props.classes.nutrientValueContainer1;
      case 1: return this.props.classes.nutrientValueContainer2;
    }
    return null;
  }

  private renderNutrientPropValue = (
    iter: NutrientValue,
    index: number,
    singleValue: boolean,
  ) => {
    const { classes } = this.props;
    return (
      <GcTooltip
        title={iter.tooltip}
        key={index}
      >
        <div
          className={csn(
            classes.nutrientValueContainerBase,
            this.getValuePositionClass(index),
            {[classes.nutrientValueContainerCentered]: singleValue},
          )}
        >
          <Typography
            className={classes.nutrientValueBase}
          >
            {iter.value}
          </Typography>
          {
            (singleValue || iter.suffix !== 'kcal')  &&
            <Typography
              className={csn(
                classes.nutrientSuffix,
                iter.suffix === 'g' && classes.nutrientSuffixBigLineHeight,
              )}
            >
              {iter.suffix}
            </Typography>
          }

        </div>
      </GcTooltip>
    );
  }

  private getCaloriesValues: CalValuesFunc = () => {
    const { nutrientsDisplay, calories, protein,
      fat, carbs, bodyWeight, bodyWeightUnit } = this.props;

    const result: Array<NutrientValue | null> =  nutrientsDisplay.calories.map((iter) => {
      switch (iter) {
        case 'value':
          return {
            value: this.formatValue(calories),
            suffix: 'kcal',
            tooltip: 'Calories (kcal)',
          };

        case 'perKg':
          return {
            value: this.formatValue(calories / (bodyWeight || 1)) || 0,
            suffix: 'kcal',
            tooltip: `Calories (kcal) per ${bodyWeightUnit} of body weight`,
          };

        case 'fromCarbs':
          return {
            value: this.formatValue(carbs * ph.nutrientCalories.carbs),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from carbs',
          };

        case 'fromFat':
          return {
            value: this.formatValue(fat * ph.nutrientCalories.fat),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from fat',
          };

        case 'fromProtein':
          return {
            value: this.formatValue(protein * ph.nutrientCalories.protein),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from protein',
          };

        case 'fromFatCarbs':
          return {
            value: this.formatValue(
              carbs * ph.nutrientCalories.carbs +
              fat * ph.nutrientCalories.fat,
            ),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from fat and carbs',
          };

        case 'fromProteinCarbs':
          return {
            value: this.formatValue(
              carbs * ph.nutrientCalories.carbs +
              protein * ph.nutrientCalories.protein,
            ),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from protein and carbs',
          };

        case 'fromProteinFat':
          return {
            value: this.formatValue(
              fat * ph.nutrientCalories.fat +
              protein * ph.nutrientCalories.protein,
            ),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from protein and fat',
          };

        default:
          return null;
      }
    }) as Array<NutrientValue | null>;

    return result;
  }

  private getNutrientValues: NutrValuesFunc = (nutrient: NutrientName) => {
    const { nutrientsDisplay, bodyWeight, bodyWeightUnit } = this.props;

    const result: Array<NutrientValue | null> = nutrientsDisplay[nutrient].map((iter) => {
      switch (iter) {
        case 'value':
          return {
            value: this.formatValue(this.props[nutrient]),
            suffix: 'g',
            tooltip: ph.nutrientCaptions[nutrient] + ' (grams)',
          };

        case 'calories':
          return {
            value: this.formatValue(this.props[nutrient] * ph.nutrientCalories[nutrient]),
            suffix: 'kcal',
            tooltip: 'Calories (kcal) from ' + nutrient,
          };

          case 'percents':
            return {
              value: mathUtils.round(
                this.props[nutrient] *
                ph.nutrientCalories[nutrient] *
                100 / this.getCaloriesFromNutrients()) || 0,
              suffix: '%',
              tooltip: 'Percentage of calories from ' + nutrient,
            };

        case 'perKg':
          return {
            value: mathUtils.round(this.props[nutrient] / (bodyWeight || 1)) || 0,
            suffix: 'g',
            tooltip: ph.nutrientCaptions[nutrient] + ` per ${bodyWeightUnit} of body weight (grams)`,
          };

        case 'fromNutrientBased':
          if (nutrient !== 'protein') {
            return null;
          }
          return {
            value: mathUtils.formatValue(this.props.proteinFromProteinBased),
            suffix: 'g',
            tooltip: ph.nutrientCaptions[nutrient] + ` from ${nutrient} based products (grams)`,
          };

        case 'fromNutrientBasedPerKg':
          if (nutrient !== 'protein') {
            return null;
          }
          return {
            value: mathUtils.round(this.props.proteinFromProteinBased / (bodyWeight || 1)) || 0,
            suffix: 'g',
            tooltip: ph.nutrientCaptions[nutrient] +
              ` per ${bodyWeightUnit} of body weight from ${nutrient} based products (grams)`,
          };

        default:
          return null;
      }
    }) as Array<NutrientValue | null>;

    return result;
  }

  private caloriesFromNutrientsCallback =
    (result: number, iter: NutrientName) =>
      result + ph.nutrientCalories[iter] * this.props[iter]

  private getCaloriesFromNutrients = () => {
    if (!this.caloriesFromNutrients) {
      this.caloriesFromNutrients =
        ph.nutrientOnlyProps.reduce(this.caloriesFromNutrientsCallback, 0);
    }
    return this.caloriesFromNutrients;
  }
}

export const GcNutrientsSummaryViewStyled =
  withStyles(stylesCallback, {withTheme: true})(GcNutrientsSummaryView);
