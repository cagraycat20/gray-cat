import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'paper'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, colors, productDialogPadding } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        backgroundColor: '#cfcfcfb0',
      },
      paper: {
        width: '520px',
        height: '800px',
        backgroundColor: colors.productListBackground,
        padding: productDialogPadding + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: 0,
          maxHeight: 'unset',
          maxWidth: 'unset',
          height: '100%',
          width: '100%',
          padding: '0',
        },
      },
    };
    return styles;
  };
