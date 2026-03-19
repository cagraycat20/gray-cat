import grey from '@material-ui/core/colors/grey';
import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
    'root'
  | 'graph'
  | 'graphChild'
  | 'label'
  | 'details'
  ;
export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { breakpoints } = theme.custom;
  const styles: StyleRules<ClassKey> = {
    root: {
      display: 'flex',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        flexDirection: 'row',
      },
      [theme.breakpoints.down(breakpoints.col4s)]: {
        flexDirection: 'column-reverse',
      },
      justifyContent: 'start',
      alignItems: 'stretch',
      fontFamily: theme.typography.fontFamily,
    },
    graph: {
      flex: 'auto',
      position: 'relative',
      [theme.breakpoints.down(breakpoints.col4s)]: {
        borderBottomColor: grey[500],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
      },
    },
    graphChild: {
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    label: {
      fontSize: 12,
    },
    details: {
      [theme.breakpoints.up(breakpoints.col4s)]: {
        width: 400,
      },
      [theme.breakpoints.down(breakpoints.col4s)]: {
        flexBasis: 300,
        flexShrink: 0,
        flexGrow: 0,
      },
    },
  };
  return styles;
};
