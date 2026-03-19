import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { csn, GcText, ProductWeight } from '../../../../../shared';
import { GcFoodCardContainer } from '../../gc-food-card/gc-food-card.container';
import {
  GcMealCardStylesCallback,
  StyleProps,
} from './gc-meal-card.styles';
import { Props } from './gc-meal-card.types';

class GcMealCardView extends React.PureComponent<Props & StyleProps> {

  private wasScrollStarted = false;

  public render(): JSX.Element {
    const { classes, meal, isSelected } = this.props;

    return (
      <Card
        className={csn(classes.card, {[classes.selected]: isSelected}, {[classes.unselected]: !isSelected})}
        onClick={this.handleMealClick}
      >
        <GcText
          className={classes.name}
          noWrap={true}
        >
          {meal.name}
        </GcText>
        <div className={classes.scrollableContentRoot}>
          <Scrollbars onScrollStart={this.handleScrollStart}>
            <div className={classes.scrollableContent}>
              {
                meal.items.map(this.renderFood)
              }
            </div>
          </Scrollbars>
        </div>
      </Card>
    );
  }

  private renderFood = (productWeight: ProductWeight, index: number): JSX.Element => {
    const { classes } = this.props;

    return (
      <div
        key={index}
        className={classes.food}
      >
        <GcFoodCardContainer
          productWeight={productWeight}
        />
      </div>
    );
  }

  private handleMealClick = () => {
    if (!this.wasScrollStarted) {
      this.props.onMealClick(this.props.meal);
    }

    this.wasScrollStarted = false;
  }

  private handleScrollStart = () => {
    this.wasScrollStarted = true;
  }
}

export const GcMealCardViewStyled =
  withStyles(GcMealCardStylesCallback)(GcMealCardView);
