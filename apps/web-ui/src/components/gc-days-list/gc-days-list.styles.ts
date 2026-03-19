import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey = 'root';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        flex: 1,
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: '750px',
        },
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: '547px',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '320px',
        },
      },
    };
    return styles;
  };
