import { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../types';

type ClassKey =
  'root' ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    return {
      root: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
      },
    };
  };
