import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'root'
  | '@keyframes root-emergence'
  | 'arrow'
  | '@keyframes arrow-animation'
  | 'background'
  | 'backgroundHeader'
  | 'backgroundBorder'
  | 'backgroundTop'
  | 'backgroundRight'
  | 'backgroundBottom'
  | 'backgroundLeft'
  | 'content'
  | '@keyframes content-emergence'
  | 'infoContainer'
  ;

const backgroundColor: React.CSSProperties['backgroundColor'] = '#3c3c3cdb';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, mainBarHeight } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'absolute',
        left: '-2px',
        right: '-2px',
        top: '-2px',
        bottom: '-2px',
        borderRadius: '3px',
        zIndex: theme.zIndex.tooltip,
        boxSizing: 'border-box',
        opacity: 0,

        animationName: 'root-emergence',
        animationDuration: '0.3s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
        animationFillMode: 'forwards',
        animationDelay: '0.7s',
      },
      '@keyframes root-emergence': {
        '100%': {
          opacity: 1,
        },
      },
      arrow: {
        position: 'absolute',
        top: 'calc(100% - 10px)',
        left: 'calc(50% - 50px)',
        width: '100px',
        color: '#fff',
        fontSize: '50px',

        animationName: 'arrow-animation',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-in',
      },
      '@keyframes arrow-animation': {
        '100%': {
          transform: 'translateY(10px)',
        },
      },
      background: {
        backgroundColor,
        position: 'absolute',
      },
      backgroundHeader: {
        position: 'fixed',
        backgroundColor,
        left: 0,
        right: 0,
        top: 0,
        zIndex: theme.zIndex.appBar + 1,
        [theme.breakpoints.down(breakpoints.col4s)]: {
          height: mainBarHeight.downCol4s,
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          height: mainBarHeight.upCol4s,
        },
        opacity: 0,
        animationName: 'root-emergence',
        animationDuration: '0.3s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
        animationFillMode: 'forwards',
        animationDelay: '0.7s',
      },
      backgroundBorder: {
        position: 'absolute',
        left: '-1px',
        right: '-1px',
        top: '-1px',
        bottom: '-1px',
        border: '2px solid #6c6c6c',
        borderRadius: '3px',
      },
      backgroundTop: {
        left: 0,
        right: 0,
        top: '-100vh',
        bottom: '100%',
      },
      backgroundBottom: {
        left: 0,
        right: 0,
        bottom: '-100vh',
        top: '100%',
      },
      backgroundLeft: {
        left: '-100vw',
        right: '100%',
        bottom: '-100vh',
        top: '-100vh',
      },
      backgroundRight: {
        right: '-100vw',
        left: '100%',
        bottom: '-100vh',
        top: '-100vh',
      },
      content: {
        maxWidth: '450px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          padding: '10px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          padding: '25px',
        },
        backgroundColor: 'white',
        borderRadius: '3px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0,

        animationName: 'content-emergence',
        animationDuration: '0.3s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
        animationFillMode: 'forwards',
        animationDelay: '0.8s',
      },
      '@keyframes content-emergence': {
        '100%': {
          opacity: 1,
        },
      },
      infoContainer: {
        color: 'grey',
        marginBottom: '20px',
      },
    };
    return styles;
  };
