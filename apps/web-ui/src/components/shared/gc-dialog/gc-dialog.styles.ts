import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'paper'
  | 'paperNoMaxWidth'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, dialogMargin } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {

      },
      paper: {
        margin: dialogMargin + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: '0',
          height: '100% !important',
          maxHeight: '100%',
          width: '100% !important',
          maxWidth: '100% !important',
          borderRadius: '0',
        },
      },
      paperNoMaxWidth: {
        maxWidth: 'unset',
      },
    };
    return styles;
  };
