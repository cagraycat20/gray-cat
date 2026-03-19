import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

type ClassKey =
  | 'root'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        margin: '48px 15px',
      },
    };
    return styles;
  };
