import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme, spacing } from '../../../shared/theme';

export type ClassKey =
    'dialogPaper'
  | 'topBar'
  | 'dialogTitle'
  | 'root'
  | 'filterContainer'
  | 'productsContainer'
  | 'hintText'
  | 'button'
  | 'noData'
  | 'noDataText'
  | 'progress'
  ;

export type StyleProps = WithStyles<ClassKey>;

const minMobileBreakpoint = 375;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    dialogPaper: {
      overflow: 'hidden',
      [theme.breakpoints.down(theme.custom.breakpoints.col4s)]: {
        width: '100%',
        height: '100%',
        maxWidth: 'unset',
        maxHeight: 'unset',
        margin: '0',
      },
      [theme.breakpoints.up(theme.custom.breakpoints.col4s)]: {
        width: 600,
        height: '90%',
        maxWidth: 600,
        maxHeight: '90%',
      },
    },
    topBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.primary.main,
      borderRadius: 0,
      color: 'white',
      minHeight: 'fit-content',
      padding: `${theme.spacing.unit}px 12px`,
    },
    dialogTitle: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down(minMobileBreakpoint)]: {
        fontSize: '1rem',
      },
    },
    root: {
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'start',
      alignContent: 'stretch',
      height: '100%',
      backgroundColor: '#f9f9f9',
    },
    filterContainer: {
      display: 'flex',
      padding: '12px 8px 8px',
    },
    productsContainer: {
      overflowY: 'scroll',
    },
    hintText: {
      marginLeft: spacing.base,
      marginRight: spacing.base,
    },
    button: {
      width: 40,
      height: 40,
    },
    noData: {
      position: 'absolute',
      top: 116,
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'center',
      display: 'grid',
    },
    noDataText: {
      color: theme.palette.grey[400],
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    progress: {
      position: 'absolute',
      top: 56,
      bottom: 0,
      left: 0,
      right: 0,
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };

  return styles;
};
