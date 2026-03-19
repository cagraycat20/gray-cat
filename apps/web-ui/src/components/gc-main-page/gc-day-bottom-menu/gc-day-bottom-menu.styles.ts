import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'rootWithMenu'
  | 'showIconContainer'
  | 'showIcon'
  | 'menu'
  | 'menuVisible'
  | 'buttonRoot'
  | 'buttonLabel'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { favoritesBarWidth, breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        left: favoritesBarWidth + 'px',
        [theme.breakpoints.down(breakpoints.col4sWithFavorites)]: {
          left: 0,
        },
        bottom: '-75px',
        position: 'fixed',
        right: 0,
        height: '115px',
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.create('transform'),
      },
      rootWithMenu: {
        transform: 'translateY(-75px)',
      },
      showIconContainer: {
        alignSelf: 'center',
        width: '80px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      },
      showIcon: {
        fontSize: '55px',
        color: '#232323',
      },
      menu: {
        backgroundColor: theme.palette.grey[100],
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
      },
      menuVisible: {
        boxShadow: '0px 0px 5px #00000047',
      },
      buttonRoot: {
        margin: '5px 2px',
        minWidth: '100px',
      },
      buttonLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
    return styles;
  };
