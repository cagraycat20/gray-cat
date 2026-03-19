import { withStyles } from '@material-ui/core/styles';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import {
  nutrientClasses,
  productHelper as ph,
} from '../../..';
// import { FacebookIcon } from '../../../../assets/icons/facebook.icon';
import {
  ConsumedProductSummary,
  csn,
  GcText,
  globalClasses as gc,
  NutrientPropName,
} from '../../../../shared';
import { calculateTotalConsumedNutrients, formatValue } from '../../../../shared/utils/consumed-products-summary.utils';
import { mathUtils } from '../../../../utils';
// import {
//   GcClickableItem,
//   GcTooltip,
// } from '../../../shared';
import { StyleProps, stylesCallback } from './gc-totals.styles';

interface OwnProps {
  consumedProducts: Array<ConsumedProductSummary>;
  currency: string;
  onFacebookClick: () => void;
}

const calculateTotalConsumedNutrientsMemorized = memoizeOne(calculateTotalConsumedNutrients);

class GcTotalsView extends React.PureComponent<OwnProps & StyleProps> {

  public render() {
    const { classes, consumedProducts, currency } = this.props;

    const { moneySpent, weight, ...nutrients } =
      calculateTotalConsumedNutrientsMemorized(consumedProducts);

    return (
      <div className={classes.totalContainer}>
        <GcText
          className={csn(classes.totalMoneySpent, gc.gcAlignSelfCenter)}
          custom={{color: 'grey'}}
        >
          &nbsp;Spent:
        </GcText>
        <GcText
          className={csn(classes.totalMoneySpentValue, gc.gcAlignSelfCenter)}
        >
          {`${moneySpent ? mathUtils.round(moneySpent) : ''} ${currency}`}
        </GcText>

        <GcText
          className={csn(classes.totalConsumedWeight, gc.gcAlignSelfCenter)}
          custom={{color: 'grey'}}
        >
          &nbsp;Consumed:
        </GcText>
        <GcText
          className={csn(classes.totalConsumedWeightValue, gc.gcAlignSelfCenter)}
        >
          {`${formatValue(weight / 1000)} kg`}
        </GcText>

        {/* <div className={classes.facebookIconRoot}>
          <GcTooltip
            key={'share'}
            title="Share on Facebook"
          >
            <GcClickableItem
              className={classes.facebookButton}
              aria-haspopup="true"
              onClick={onFacebookClick}
            >
              <FacebookIcon className={classes.facebookIcon}/>
            </GcClickableItem>
          </GcTooltip>
        </div> */}

        <div className={classes.nutrientsTotalContainer}>
          {ph.nutrientProps.map((iter) => this.renderNutrient(iter, nutrients[iter]))}
        </div>
      </div>
    );
  }

  private renderNutrient = (nutrient: NutrientPropName, value: number) => {
    const { classes } = this.props;
    return (
      <div
        className={csn(
          classes.nutrientContainer,
          gc.gcWhiteText,
          {[classes.nutrientContainerMargin]: nutrient !== 'calories'},
          nutrientClasses[nutrient],
        )}
        key={nutrient}
      >
        <GcText
          className={csn(gc.gcNutrientCaptionRow, gc.gcFontSmall)}
          color="inherit"
        >
          {ph.nutrientCaptionsShort[nutrient]}
        </GcText>
        <GcText
          className={classes.nutrientValueRow}
          color="inherit"
        >
          {
            nutrient === 'calories'
              ? formatValue(value) + ' kcal'
              : formatValue(value / 1000) + ' kg'
          }
        </GcText>
      </div>
    );
  }

}

export const GcTotalsViewStyled = withStyles(stylesCallback)(GcTotalsView);
