import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../shared/theme';

type ClassKey =
  | 'productDialogToolbar'
  | 'productDialogToolbarButton'
  | 'checkbox'
  | 'checkboxCaption'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, productDialogPadding} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      productDialogToolbar: {
        [theme.breakpoints.up(breakpoints.col4s)]: {
          margin: `-${productDialogPadding}px -${productDialogPadding}px 0`,
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        padding: '5px 20px',
        zIndex: 1,
      },
      productDialogToolbarButton: {
        color: theme.palette.grey[50],
        width: '40px',
        height: '40px',
      },
      checkbox: {
        color: theme.palette.grey[200],
      },
      checkboxCaption: {
        color: theme.palette.grey[50],
      },
    };
    return styles;
  };
