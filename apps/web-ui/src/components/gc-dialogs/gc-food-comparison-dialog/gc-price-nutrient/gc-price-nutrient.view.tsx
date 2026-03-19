import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import * as React from 'react';
import { csn, GcText } from '../../../../shared';
import { formatPriceValue, formatValue } from '../../../../shared/utils/food-comparison.utils';
import { StyleProps, stylesCallback } from './gc-price-nutrient.styles';
import { Props } from './gc-price-nutrient.types';

class GcPriceNutrientView extends React.PureComponent<Props & StyleProps> {

  public render() {
    const { classes, value1, value2, price1, price2, nutrient, active, currency, className } = this.props;
    const price1PerGram = value1 / price1;
    const price2PerGram = value2 / price2;

    return (
      <div className={className}>
        <div className={classes.root}>
          <div className={csn(classes.header, classes[nutrient], {[classes.inactive]: !active})}>
            <div>
              <div className={classes.titleContainer}>
                <GcText className={classes.title}>
                  {nutrient}
                </GcText>
                <GcText className={classes.titleSuffix}>
                  {`(1 ${nutrient === 'calories' ? 'kcal' : 'g'})`}
                </GcText>
              </div>
            </div>
            <div className={classes.starContainer}>
              <div className={classes.leftStar}>
                {
                  price1PerGram < price2PerGram &&
                  <StarBorderIcon className={classes.star} />
                }
              </div>
              <div className={classes.rightStar}>
                {
                  price2PerGram < price1PerGram &&
                  <StarBorderIcon className={classes.star} />
                }
              </div>
            </div>
          </div>
          <div className={classes.content}>
            {
              active &&
              <>
                <div className={classes.valuesContainer}>
                  <Typography className={classes.leftValue}>
                    {`${formatPriceValue(price1PerGram)} ${currency}`}
                  </Typography>
                  <Typography className={classes.calculatedLeftValue}>
                    {price1PerGram < price2PerGram && price1PerGram > 0
                      ? formatValue(price2PerGram / price1PerGram) + 'x cheaper'
                      : '-'
                    }
                  </Typography>
                </div>
                <div className={classes.valuesContainer}>
                  <Typography className={classes.rightValue}>
                    {`${formatPriceValue(price2PerGram)} ${currency}`}
                  </Typography>
                  <Typography className={classes.calculatedRightValue}>
                    {price2PerGram < price1PerGram && price2PerGram > 0
                      ? formatValue(price1PerGram / price2PerGram) + 'x cheaper'
                      : '-'
                    }
                  </Typography>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    );
  }
}

export const GcPriceNutrientViewStyled =
  withStyles(stylesCallback)(GcPriceNutrientView);
