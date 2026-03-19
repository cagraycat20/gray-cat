import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { csn } from '../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-logo.styles';

import { dishes, logo } from '../../assets';

export interface Props {
  className?: string;
  dishIndex?: number | 'auto';
}

const oldIndex = parseInt(localStorage.getItem('logo_index') || '0', 10);
const autoIndex = oldIndex + 1 < dishes.length ? oldIndex + 1 : 0;
localStorage.setItem('logo_index', String(autoIndex));

const GcLogoView: React.SFC<Props & StyleProps> = ({ className, classes, dishIndex = 0 }) => {
  return (
    <div className={csn(classes.root, className)} >
      <img className={classes.logo} src={logo} alt="ProtoMeal" />
      <img
        className={classes.dish}
        src={
          dishIndex === 'auto' ? dishes[autoIndex] : dishes[dishIndex]
        }
        alt=""
      />
    </div>
  );
};

export const GcLogoViewStyled =
  withStyles(stylesCallback)(GcLogoView);
