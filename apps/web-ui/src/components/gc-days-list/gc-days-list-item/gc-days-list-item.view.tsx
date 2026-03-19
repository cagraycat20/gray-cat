import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {
  dateUtils as du,
  GcNutrientsSummary,
  logRender,
  productHelper as ph,
} from '../..';
import { csn } from '../../../shared';
import { dateUtils } from '../../../shared';
import { unitHelper } from '../../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-days-list-item.styles';
import { Props } from './gc-days-list-item.types';

class GcDaysListItemView extends React.PureComponent<Props & StyleProps> {
  private nutrientClasses = {
    root: this.props.classes.nutrientsRoot,
    nutrientContainer: this.props.classes.nutrientContainer,
  };

  private today = du.getFormattedDate(new Date());

  public render(): JSX.Element {
    logRender(this);
    const { classes, date } = this.props;

    return (
      <div className={classes.root}>
        <Divider
          className={classes.divider}
          component="div"
        />
        {this.renderContent(date)}
      </div>
    );
  }

  private renderContent(date: string) {
    const { classes, isSelected, bodyWeight, desiredBodyWeight, bodyWeightUnit,
      consumedProducts, products} = this.props;

    let nutrients = ph.createNutrients();
    let fromProteinBased = 0;
    if (consumedProducts) {
      nutrients = ph.roundNutrients(consumedProducts.reduce(
        (result, productWeightIter) => {
          const product = ph.findProduct(products, productWeightIter.productId);
          if (product) {
            if (ph.getMainNutrient(product) === 'protein') {
              fromProteinBased += product.protein * productWeightIter.productWeight / 100;
            }
            return ph.addToNutrients(result, product, productWeightIter.productWeight);
          }
          return result;
        },
        nutrients,
      ));
    }

    let highlightColorClass;
    let highlightClass;
    if (isSelected) {
      highlightColorClass = classes.selectedColor;
      highlightClass = classes.selectionHighlight;
    } else if (date === this.today) {
      highlightColorClass = classes.todayColor;
      highlightClass = classes.todayHighlight;
    }

    return (
      <ButtonBase
        className={csn(
          classes.content,
          classes.contentEmerging,
          highlightClass,
        )}
        onClick={this.click}
      >

        <div className={classes.dateContainer}>
          <Typography
            className={csn(classes.longDayName, highlightColorClass)}
            variant={'subtitle1'}
          >
            {
              date === this.today
                ? 'Today'
                : dateUtils.getFormattedDate(dateUtils.getDate(date), 'EEEE')
            }
          </Typography>

          <Typography
            className={csn(classes.shortDayName, highlightColorClass)}
          >
            {
              date === this.today
              ? 'Today'
              : dateUtils.getFormattedDate(dateUtils.getDate(date), 'EEE')
            }
          </Typography>

          <Typography
            className={csn(classes.shortDate, highlightColorClass)}
            variant={'caption'}
          >
            {dateUtils.getFormattedDate(dateUtils.getDate(date), 'MMM dd, yyyy')}
          </Typography>
        </div>

        <GcNutrientsSummary
          classes={this.nutrientClasses}
          bodyWeight={desiredBodyWeight || bodyWeight}
          {...nutrients}
          proteinFromProteinBased={fromProteinBased}
        />

        <div className={classes.weightContainer}>
          <Typography
            className={csn(classes.weightValue, highlightColorClass)}
            variant={'h4'}
          >
            {bodyWeight}
          </Typography>
          <Typography
            className={csn(classes.weightUnit, highlightColorClass)}
            variant={'caption'}
          >
            {unitHelper.getBodyWeightUnitTitle(bodyWeightUnit)}
          </Typography>
        </div>

      </ButtonBase>
    );
  }

  private click = () => {
    const { onSelected } = this.props;
    if (onSelected) {
      onSelected(this.props.date);
    }
  }
}

export const GcDaysListItemViewStyled =
  withStyles(stylesCallback, {withTheme: true})(GcDaysListItemView);
