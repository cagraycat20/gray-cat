import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'root'
  | 'content'
  | 'header'
  | 'feedbackField'
  | 'logo'
  | 'closeButton'
  | 'sendButton'
  | 'paper'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        height: '70px',
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'stretch',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '100%',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: 400,
        },
      },
      feedbackField: {
        marginTop: theme.spacing.unit,
      },
      header: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: theme.spacing.unit * 1.5,
        paddingTop: theme.spacing.unit * 1.5,
        marginBottom: theme.spacing.unit * 3,
        backgroundColor: theme.palette.primary.main,
      },
      logo: {
        width: 180,
      },
      closeButton: {
        width: '40px',
        height: '40px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        position: 'absolute',
        right: 0,
        color: 'white',
      },
      sendButton: {
        marginTop: theme.spacing.unit * 3,
      },
      paper: {
        // margin: dialogMargin + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: '0',
          height: '100%',
          maxHeight: '100%',
          width: '100%',
          maxWidth: '100%',
          borderRadius: '0',
        },
      },
    };
    return styles;
  };
