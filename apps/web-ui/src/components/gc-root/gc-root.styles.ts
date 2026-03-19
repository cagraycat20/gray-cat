import {
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared';

type ClassKey =
  'root' |
  'headerAreaBackground' |
  'content' |
  'header';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { mainBarHeight, breakpoints } = theme.custom;
    return {
      root: {
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      },
      header: {
        width: '100%',
        zIndex: theme.zIndex.appBar,
        position: 'fixed',
        willChange: 'transform',
        transition: theme.transitions.create('transform', {duration: '.4s'}),
      },
      headerAreaBackground: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          left: 0,
          right: 0,
          height: theme.custom.mainBarHeight.downCol4s,
          backgroundColor: '#5f6982',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          display: 'none',
        },
      },
      content: {
        minHeight: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        flexDirection: 'column',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          paddingTop: mainBarHeight.downCol4s,
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          paddingTop: mainBarHeight.upCol4s,
        },
      },
    };
  };
