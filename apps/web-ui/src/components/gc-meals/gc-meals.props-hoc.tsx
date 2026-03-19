import * as React from 'react';
import {
  comparisonUtils as cu,
  ConsumedProduct,
  dayInfoHelper as dih,
} from '..';
import {
  HocProps,
  MealsInfo,
} from './gc-meals.types';
import { GcMealsViewStyled } from './gc-meals.view';

export class GcMealsHoc extends React.PureComponent<HocProps> {

  private savedMeals: HocProps['meals'] = this.props.meals;
  private savedMealsInfo?: MealsInfo;

  public render() {
    const {day, meals, ...restProps } = this.props;

    if (!cu.areArraysEqual(this.savedMeals, meals)) {
      this.savedMeals = meals;
    }

    const mealsInfo = this.getDayMealsInfo();
    if (
      (!this.savedMealsInfo) ||
      (!cu.areObjectsEqual(
        this.savedMealsInfo,
        mealsInfo,
        this.compareDayMealsInfoProperty,
      ))
    ) {
      this.savedMealsInfo = mealsInfo;
    }

    return (
      <GcMealsViewStyled
        {...restProps}
        meals={this.savedMeals}
        dayMealsInfo={this.savedMealsInfo}
      />
    );
  }

  private mealsReduceCallback = (result: MealsInfo, iter: ConsumedProduct) => {
    const time = iter.time ? iter.time : 0;
    if (!result[time]) {
      result[time] = [];
    }
    result[time].push(iter);
    return result;
  }

  private getDayMealsInfo: () => MealsInfo = () => {
    const { day } = this.props;
    const result: MealsInfo = {};
    if (day && day.consumed.length > 0) {
      return day.consumed.reduce(this.mealsReduceCallback, result);
    }
    return result;
  }

  private compareConsumedProducts = (
    left: ConsumedProduct, right: ConsumedProduct,
  ) => {
    return (
      left && right &&
      (left.productId === right.productId) &&
      (left.productWeight === right.productWeight) &&
      (dih.sameMealTime(left.time, right.time))
    );
  }

  private compareDayMealsInfoProperty = (
    left: Array<ConsumedProduct>,
    right: Array<ConsumedProduct>,
  ) => {
    return cu.areArraysEqual(left, right, this.compareConsumedProducts);
  }
}
