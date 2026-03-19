import { connect } from 'react-redux';
import {
  dayInfoHelper as dih,
  propsProcessorHoc,
  StoreState,
} from '../..';
import { mathUtils, unitHelper } from '../../../utils';
import {
  HocProps,
  OwnProps,
  Props,
  ReduxHocStateProps,
} from './gc-days-list-item.types';
import { GcDaysListItemViewStyled } from './gc-days-list-item.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxHocStateProps {
  return {
    isSelected: state.localSettings.selectedDate === ownProps.date,
    days: state.days,
    weightInfo: state.remoteSettings.view.bodyWeightPoints,
    products: state.products,
    bodyWeightUnit: state.remoteSettings.view.bodyWeightUnit,
  };
}

const hoc =  propsProcessorHoc<HocProps, Props>(
  (inputProps) => {
    const { weightInfo, days, bodyWeightUnit, ...rest } = inputProps;
    const day = dih.findDay(rest.date, days);
    const dayBodyWeightInfo = dih.getDayBodyWeightInfo(rest.date, weightInfo);
    return {
      ...rest,
      bodyWeight: mathUtils.round(unitHelper.getValue(dayBodyWeightInfo.bodyWeight, 'kg', bodyWeightUnit)),
      desiredBodyWeight:
        mathUtils.round(unitHelper.getValue(dayBodyWeightInfo.desiredBodyWeight, 'kg', bodyWeightUnit)),
      bodyWeightUnit,
      consumedProducts: day ? day.consumed : null,
    };
  },
  GcDaysListItemViewStyled,
);

export const GcDaysListItemContainer =
  connect(
  mapStateToProps,
)(hoc);
