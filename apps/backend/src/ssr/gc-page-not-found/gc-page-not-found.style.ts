import { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../types';

type ClassKey =
  'root' |
  'title' |
  'footnote' |
  'asterisk' |
  'image';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.unit * 8,
      },
      title: {
        color: '#555',
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down(breakpoints.col4s)]: {
          fontSize: 16,
        },
      },
      footnote: {
        color: '#bbb',
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down(breakpoints.col4s)]: {
          fontSize: 10,
        },
      },
      asterisk: {
        position: 'relative',
        top: '-0.5pt',
      },
      image: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          maxWidth: 200,
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          maxWidth: 400,
        },
        [theme.breakpoints.up(breakpoints.col4sWithFavorites)]: {
          maxWidth: 'unset',
        },
      },
    };
  };
