import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../shared/theme';

type ClassKey =
  | 'root'
  | 'content'
  | '@keyframes content-emergence'
  | 'logo'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.primary.main,
        zIndex: theme.zIndex.snackbar + 1,
        cursor: 'pointer',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: theme.transitions.create('opacity', {duration: '1.2s'}),
      },
      content: {
        position: 'relative',
        [theme.breakpoints.down(breakpoints.col4sWithFavorites)]: {
          height: 40,
          minWidth: '270px',
        },
        [theme.breakpoints.up(breakpoints.col4sWithFavorites)]: {
          height: 100,
          minWidth: '700px',
        },
        animationName: 'content-emergence',
        animationDuration: '0.7s',
        animationIterationCount: 1,
      },
      '@keyframes content-emergence': {
        '0%': {
          transform: 'scale(0.3, 0.3)',
          opacity: 0,
        },
        '40%': {
          transform: 'scale(1.15, 1.15)',
          opacity: 1,
        },
      },
      logo: {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        [theme.breakpoints.down(breakpoints.col4sWithFavorites)]: {
          height: 40,
        },
        [theme.breakpoints.up(breakpoints.col4sWithFavorites)]: {
          height: 100,
        },
      },
    };
    return styles;
  };
