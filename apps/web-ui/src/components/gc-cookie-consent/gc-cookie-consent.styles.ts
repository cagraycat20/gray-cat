import amber from '@material-ui/core/colors/amber';
import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  'root' |
  '@keyframes root-emerging' |
  'content' |
  'link' |
  'button';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 10,
        zIndex: 5000,
        lineHeight: '150%',
        transform: 'translateY(100%)',
        animation: '.3s linear 10s normal forwards running root-emerging',
      },
      '@keyframes root-emerging': {
        to: {
          transform: 'unset',
        },
      },
      content: {
        margin: theme.spacing.unit,
        fontFamily: theme.typography.fontFamily,
      },
      link: {
        color: theme.palette.common.white,
      },
      button: {
        color: amber[500],
      },
    };
    return styles;
  };
