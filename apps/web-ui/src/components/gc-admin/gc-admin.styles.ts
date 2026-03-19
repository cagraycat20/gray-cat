import { StyleRules, StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared';

type ClassKey =
  | 'root'
  | 'content'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    root: {
      display: 'flex',
      height: '100%',
    },
    content: {
      width: '100%',
    },
  };

  return styles;
};
