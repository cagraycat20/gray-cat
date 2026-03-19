import * as React from 'react';
import {
  comparisonUtils as cu,
  dayInfoHelper as dih,
} from '..';
import {
  HocProps,
} from './gc-products.types';
import { GcProductsViewStyled } from './gc-products.view';

// we need hoc because comp. is used in router and can't be wrapped directly
export class GcProductsHoc extends React.PureComponent<HocProps> {
  private savedFavorites: HocProps['favorites'] = this.props.favorites;

  public render() {
    const {days, meals, favorites, ...restProps } = this.props;

    if (!cu.areArraysEqual(this.savedFavorites, favorites)) {
      this.savedFavorites = favorites;
    }

    return (
      <GcProductsViewStyled
        {...restProps}
        onGetMeals={this.determineMeals}
        favorites={this.savedFavorites}
      />
    );
  }

  private determineMeals: () => Array<number> = () => {
    const { days, date, meals } = this.props;
    const day = dih.findDay(date, days);
    return dih.determineMeals(meals, day).sort((first, second) => first - second);
  }
}
