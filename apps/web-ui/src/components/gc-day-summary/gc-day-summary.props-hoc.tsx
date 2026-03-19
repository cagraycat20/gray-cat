import * as React from 'react';
import {
  ConsumedProduct,
  dayInfoHelper as dih,
  NutrientProps,
  productHelper as ph,
  unitHelper,
} from '..';
import { mathUtils } from '../../utils';
import {
  HocProps,
  Props,
} from './gc-day-summary.types';
import { GcDaySummaryViewStyled } from './gc-day-summary.view';

interface NutrientData {
  nutrients: NutrientProps;
  fromProteinBased: number;
}

export class PropsProcessorHoc extends React.PureComponent<HocProps> {
  public render() {
    return (<GcDaySummaryViewStyled {...this.processProps()} />);
  }

  private processProps: () => Props = () => {
    const { days, bodyWeightPoints, products, ...rest } = this.props;

    let nutrientData: NutrientData = {
      nutrients: ph.createNutrients(),
      fromProteinBased: 0,
    };
    const day = dih.findDay(rest.date, days);
    if (day) {
      nutrientData = day.consumed.reduce(this.nutrientsCallback, nutrientData);
      nutrientData.nutrients = ph.roundNutrients(nutrientData.nutrients);
    }

    const { bodyWeight, desiredBodyWeight } = dih.getDayBodyWeightInfo(rest.date, bodyWeightPoints);
    const { bodyWeightUnit } = this.props;

    return {
      ...rest,
      bodyWeight: mathUtils.round(unitHelper.getValue(bodyWeight, 'kg', bodyWeightUnit)),
      desiredBodyWeight: mathUtils.round(unitHelper.getValue(desiredBodyWeight, 'kg', bodyWeightUnit)),
      onCheckIfDayHasProducts: this.checkIfDayHasProducts,
      ...nutrientData.nutrients,
      proteinFromProteinBased: nutrientData.fromProteinBased,
      canUndo: day && day.consumedHistory && day.consumedHistory.length > 0,
    };
  }

  private nutrientsCallback = (result: NutrientData, iter: ConsumedProduct) => {
    const product = ph.findProduct(this.props.products, iter.productId);
    if (product) {
      if (ph.getMainNutrient(product) === 'protein') {
        result.fromProteinBased += product.protein * iter.productWeight / 100;
      }
      result.nutrients = ph.addToNutrients(result.nutrients, product, iter.productWeight);
    }
    return result;
  }

  private checkIfDayHasProducts = (date: string) => {
    const { days } = this.props;
    const day = dih.findDay(date, days);
    if (day) {
      return day.consumed.length > 0;
    }
    return false;
  }
}
