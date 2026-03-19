import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { csn, dateUtils } from '../../../shared';
import { SumItem } from '../../../types';
import { StyleProps, stylesCallback } from './gc-intake-summary-detailded-item.styles';

export interface DetailedData {
  name: string;
  color: string;
  units: 'g' | 'kg' | 'lb' | 'kcal';
  precision?: number;
  hideSum?: boolean;
  value?: number;
  monthSum?: SumItem;
  yearSum?: SumItem;
}

export interface GcIntakeSummaryDetailedItemProps {
  className?: string;
  data: DetailedData;
  date: Date;
  onClick: () => void;
}

const GcIntakeSummaryDetailedItemView: React.SFC<GcIntakeSummaryDetailedItemProps & StyleProps> = ({
  classes,
  className,
  data,
  date,
  onClick,
}) => {
  const {name, color, value, units, precision} = data;

  const SumView = (props: {caption: string, value: number}) => (
    <div className={classes.sumValue}>
      <div>{props.caption}</div>
      <div>{props.value.toFixed(precision)}</div>
    </div>
  );

  return (
    <Paper elevation={0} className={csn(classes.root, className)} style={{borderColor: color}} onClick={onClick}>
      <div className={classes.header} style={{backgroundColor: color}}>
        <CloseIcon className={classes.icon}/>
        <div className={classes.caption}>
          {name}
        </div>
        <div className={classes.valueRow}>
          <div className={classes.value}>
            {
              typeof value === 'number' ? value.toFixed(precision) : '-'
            }
            <div className={csn(classes.valueUnits, classes.caption)}>
              {units}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.body}>
        {data.monthSum &&
          <div className={classes.sumRow}>
            <div className={classes.sumCaption}>During month ({dateUtils.getFormattedDate(date, 'MMMM')})</div>
            <div className={classes.sumValuesRow}>
              <SumView caption="MIN" value={data.monthSum.min}/>
              <SumView caption="MAX" value={data.monthSum.max}/>
              <SumView caption="AVG" value={data.monthSum.avg}/>
              {!data.hideSum &&
                <SumView caption="SUM" value={data.monthSum.sum}/>
              }
            </div>
          </div>
        }
        {data.yearSum &&
          <div className={classes.sumRow}>
            <div className={classes.sumCaption}>During year ({dateUtils.getYear(date)})</div>
            <div className={classes.sumValuesRow}>
              <SumView caption="MIN" value={data.yearSum.min}/>
              <SumView caption="MAX" value={data.yearSum.max}/>
              <SumView caption="AVG" value={data.yearSum.avg}/>
              {!data.hideSum &&
                <SumView caption="SUM" value={data.yearSum.sum}/>
              }
            </div>
          </div>
        }
      </div>
    </Paper>
  );
};

export const GcIntakeSummaryDetailedItem = withStyles(stylesCallback)(GcIntakeSummaryDetailedItemView);
