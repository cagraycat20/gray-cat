import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
    'root'
  | 'header'
  | 'body'
  | 'caption'
  | 'valueRow'
  | 'value'
  | 'valueUnits'
  | 'icon'
  | 'sumRow'
  | 'sumCaption'
  | 'sumValuesRow'
  | 'sumValue'
  ;
export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { breakpoints } = theme.custom;
  const styles: StyleRules<ClassKey> = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'stretch',

      textAlign: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontWeight: 400,
      borderStyle: 'solid',
      borderWidth: 1,
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'stretch',
      color: 'white',
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
    body: {
      flex: 'auto',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'stretch',
    },
    caption: {
      [theme.breakpoints.down(breakpoints.col4s)]: {
        fontSize: '0.8rem',
      },
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: '1rem',
      },
    },
    valueRow: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    value: {
      [theme.breakpoints.down(breakpoints.col4s)]: {
        fontSize: '1.8rem',
      },
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: '2.125rem',
      },
      position: 'relative',
    },
    valueUnits: {
      position: 'absolute',
      left: '110%',
      top: '1rem',
    },
    sumRow: {
      flex: 'auto',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      color: theme.palette.grey[700],
    },
    sumCaption: {
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: '1.4rem',
      },
    },
    sumValuesRow: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down(breakpoints.col4s)]: {
        marginTop: '0.6rem',
        fontSize: '0.55rem',
      },
      [theme.breakpoints.up(breakpoints.col4s)]: {
        marginTop: '2rem',
        fontSize: '1rem',
      },
    },
    sumValue: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '4rem',
    },
    icon: {
      position: 'absolute',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        right: theme.spacing.unit,
        top: theme.spacing.unit,
      },
      [theme.breakpoints.down(breakpoints.col4s)]: {
        transform: 'scale(0.7)',
        right: theme.spacing.unit * 0.5,
        top: theme.spacing.unit * 0.5,
      },
    },
  };
  return styles;
};
