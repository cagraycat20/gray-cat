import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
    'root'
  | 'caption'
  | 'valueRow'
  | 'value'
  | 'valueUnits'
  | 'icon'
  ;
export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { breakpoints } = theme.custom;
  const styles: StyleRules<ClassKey> = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '1rem',
      textAlign: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontWeight: 400,
      cursor: 'pointer',
      color: 'white',
      position: 'relative',
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
