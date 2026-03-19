import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  'root' |
  'content' |
  'goToMainPageButton' |
  'goToMainPageButtonIcon' |
  'title' |
  'footnote' |
  'asterisk' |
  'image';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, contentWidth } = theme.custom;

    const styles: StyleRules<ClassKey> = {
      root: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        flexDirection: 'column',
        paddingBottom: '15px',
      },
      content: {
        margin: theme.spacing.unit,
        fontFamily: theme.typography.fontFamily,
        maxWidth: contentWidth.col4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.unit * 8,
      },
      goToMainPageButton: {
        margin: '35px auto 0',
        minWidth: '175px',
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.primary.light + '99',
        },
      },
      goToMainPageButtonIcon: {
        marginRight: '10px',
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
    return styles;
  };
