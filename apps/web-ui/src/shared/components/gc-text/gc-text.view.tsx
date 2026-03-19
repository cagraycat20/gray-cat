import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { TypographyProps } from '@material-ui/core/Typography';
import * as React from 'react';
import {
  globalClasses,
} from '../..';
import {
  StyleProps,
  stylesCallback,
} from './gc-text.styles';

interface Props extends TypographyProps {
  custom?: {
    color?: 'grey' | 'white';
    size?: 'xsmall' | 'small' | 'base' | 'large' | 'xlarge'
  };
}

const colorClasses = {
  grey: globalClasses.gcGreyText,
  white: globalClasses.gcWhiteText,
};

const fontSizeClasses = {
  xsmall: globalClasses.gcFontXsmall,
  small: globalClasses.gcFontSmall,
  base: globalClasses.gcFontBase,
  large: globalClasses.gcFontLarge,
  xlarge: globalClasses.gcFontXlarge,
};

class GcTextView extends React.PureComponent<Props & StyleProps> {

  public render(): JSX.Element {
    const { custom, className, ...typographyProps } = this.props;
    let classes = className;
    if (custom) {
      if (custom.color) {
        classes += ' ' + colorClasses[custom.color];
      }
      if (custom.size) {
        classes += ' ' + fontSizeClasses[custom.size];
      }
    }

    return (
      <Typography
        className={classes}
        {...typographyProps}
      />
    );
  }
}

export const GcTextViewStyled =
  withStyles(stylesCallback)(GcTextView);
