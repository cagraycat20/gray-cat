import { StyleRules, StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared';

type ClassKey =
  | 'expandContainer'
  | 'expandItem'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    expandContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    expandItem: {
      padding: 12,
      marginTop: 8,
    },
  };

  return styles;
};
