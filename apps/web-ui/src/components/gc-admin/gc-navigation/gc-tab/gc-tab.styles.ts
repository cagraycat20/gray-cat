import { StyleRules, StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../../shared';

type ClassKey =
  | 'selected'
  | 'itemIcon'
  | 'itemText'
  | 'open'
  | 'close'
  | 'itemTextVisible'
  | 'itemTextHidden'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    selected: {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
    },
    itemIcon: {
      marginRight: 0,
    },
    itemText: {
      whiteSpace: 'nowrap',
    },
    open: {
      width: 240,
      transition: theme.transitions.create(
        ['width'],
        {duration: theme.transitions.duration.leavingScreen},
      ),
    },
    close: {
      width: 56,
      transition: theme.transitions.create(
        ['width'],
        {
          duration: theme.transitions.duration.leavingScreen,
          delay: theme.transitions.duration.leavingScreen / 2,
        },
      ),
    },
    itemTextVisible: {
      opacity: 1,
      transition: theme.transitions.create(
        'opacity',
        {
          duration: theme.transitions.duration.leavingScreen,
          delay: theme.transitions.duration.leavingScreen / 2,
        },
      ),
    },
    itemTextHidden: {
      opacity: 0,
      transition: theme.transitions.create(
        'opacity',
        {duration: theme.transitions.duration.leavingScreen},
      ),
    },
  };

  return styles;
};
