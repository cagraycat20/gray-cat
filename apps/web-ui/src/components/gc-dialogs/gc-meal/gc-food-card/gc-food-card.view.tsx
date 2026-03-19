import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { GcText } from '../../../../shared';
import { GcProductImage } from '../../../shared';
import {
  GcFoodCardStylesCallback,
  StyleProps,
} from './gc-food-card.styles';
import { Props } from './gc-food-card.types';

class GcFoodCardView extends React.PureComponent<Props & StyleProps> {

  public render(): JSX.Element {
    const { classes, food, productWeight } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.header}>
            <GcText
              className={classes.name}
              noWrap={true}
            >
              {food.name}
            </GcText>
          </div>
          <GcProductImage
            className={classes.media}
            image={food.image}
            thumbnail={food.thumb}
            productName={food.name}
            width={145}
            height={75}
          />
        </Card>
        <div className={classes.weightRoot}>
          <GcText
            className={classes.weightValue}
            custom={{color: 'white'}}
          >
            {productWeight.productWeight}
          </GcText>
          <GcText
            className={classes.weightSuffix}
            custom={{color: 'grey'}}
          >
            g
          </GcText>
        </div>
      </div>
    );
  }
}

export const GcFoodCardViewStyled =
  withStyles(GcFoodCardStylesCallback)(GcFoodCardView);
