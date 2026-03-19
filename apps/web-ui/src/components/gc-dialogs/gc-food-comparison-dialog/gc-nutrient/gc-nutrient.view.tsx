import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import * as React from 'react';
import { csn, NutrientPropName } from '../../../../shared';
import { formatValue } from '../../../../shared/utils/food-comparison.utils';
import { StyleProps, stylesCallback } from './gc-nutrient.styles';

interface OwnProps {
  value1: number;
  value2: number;
  nutrient: NutrientPropName;
  active: boolean;
  className?: string;
}

class GcNutrientView extends React.PureComponent<OwnProps & StyleProps> {

  public render() {
    const { classes, value1, value2, nutrient, active, className } = this.props;

    return (
      <div className={className}>
        <div className={classes.root}>
          <div className={csn(classes.header, classes[nutrient], {[classes.inactive]: !active})}>
            <Typography className={classes.title}>
              {nutrient}
            </Typography>
            <div className={classes.starContainer}>
              <div className={classes.leftStar}>
                {
                  value1 > value2 &&
                  <StarBorderIcon className={classes.star} />
                }
              </div>
              <div className={classes.rightStar}>
                {
                  value2 > value1 &&
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
                    {`${value1} ${nutrient === 'calories' ? 'kcal' : 'g'}`}
                  </Typography>
                  <Typography className={classes.calculatedLeftValue}>
                    {value1 > value2 && value2 > 0 ? formatValue(value1 / value2) + 'x more' : '-'}
                  </Typography>
                </div>
                <div className={classes.valuesContainer}>
                  <Typography className={classes.rightValue}>
                    {`${value2} ${nutrient === 'calories' ? 'kcal' : 'g'}`}
                  </Typography>
                  <Typography className={classes.calculatedRightValue}>
                    {value2 > value1 && value1 > 0 ? formatValue(value2 / value1) + 'x more' : '-'}
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

export const GcNutrientViewStyled =
  withStyles(stylesCallback)(GcNutrientView);
