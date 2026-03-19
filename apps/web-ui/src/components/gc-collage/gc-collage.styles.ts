import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';
import { canvasSize } from '../../utils/collage.utils';

type ClassKey =
  | 'root'
  | 'canvas'
  | 'canvasWrap'
  | 'header'
  | 'rightButton'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'start',
        flex: 'auto',

        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '100%',
          height: '100%',
          maxWidth: 'unset',
          maxHeight: 'unset',
          margin: '0',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          maxWidth: 24 + canvasSize.w / 2 + 24,
          maxHeight: 'unset',
        },
      },
      header: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          padding: '10px 10px 10px',
        },
      },
      rightButton: {
        marginRight: 'auto',
      },
      canvas: {
        width: '100%',
      },
      canvasWrap: {
        maxWidth: canvasSize.w / 2,
        position: 'relative',
      },
    };
    return styles;
  };
