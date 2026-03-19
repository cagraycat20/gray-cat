import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
  'card' |
  'cardSize' |
  'smallCardSize' |
  'header' |
  'name' |
  'media';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { card, breakpoints} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      card: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        transform: 'rotate(5deg)',
      },
      cardSize: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.width + 'px',
          height: card.small.height + 'px',
          left: `-${card.small.width / 2}px`,
          top: `-${card.small.height / 2}px`,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.width + 'px',
          height: card.normal.height + 'px',
          left: `-${card.normal.width / 2}px`,
          top: `-${card.normal.height / 2}px`,
        },
      },
      smallCardSize: {
        width: card.small.width + 'px',
        height: card.small.height + 'px',
        left: `-${card.small.width / 2}px`,
        top: `-${card.small.height / 2}px`,
      },
      header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down(breakpoints.col4)]: {
          padding: '3px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          padding: '4px',
        },
      },
      name: {
        overflow: 'hidden',
        color: theme.palette.grey[600],
        alignSelf: 'center',
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
      media: {
        flex: 1,
      },
    };
    return styles;
  };
