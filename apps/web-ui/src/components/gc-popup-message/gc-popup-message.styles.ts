import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../shared/theme';

type ClassKey =
  | 'additionalContent'
  | 'additionalIcon'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, favoritesBarWidth } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      additionalContent: {
        position: 'absolute',
        backgroundColor: '#f0f0f0e0',
        [theme.breakpoints.down(breakpoints.col4sWithFavorites)]: {
          left: 0,
        },
        [theme.breakpoints.up(breakpoints.col4sWithFavorites)]: {
          left: favoritesBarWidth,
        },
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#6d6d6d',
      },
      additionalIcon: {
        fontSize: '150px',
      },
    };
    return styles;
  };
