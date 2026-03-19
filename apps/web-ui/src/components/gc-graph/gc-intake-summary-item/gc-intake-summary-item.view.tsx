import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { csn } from '../../../shared';
import { StyleProps, stylesCallback } from './gc-intake-summary-item.styles';

export interface GcIntakeSummaryItemProps {
  className?: string;
  name: string;
  units?: 'g' | 'kg' | 'lb' | 'kcal';
  precision?: number;
  hideSum?: boolean;
  value?: number;
  onClick: () => void;
}

const GcIntakeSummaryItemView: React.SFC<GcIntakeSummaryItemProps & StyleProps> = ({
  classes,
  className,
  name,
  value,
  units = 'g',
  precision,
  onClick,
}) => {
  return (
    <Paper className={csn(classes.root, className)} onClick={onClick}>
      <ExpandMoreIcon className={classes.icon}/>
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
    </Paper>
  );
};

export const GcIntakeSummaryItem = withStyles(stylesCallback)(GcIntakeSummaryItemView);
