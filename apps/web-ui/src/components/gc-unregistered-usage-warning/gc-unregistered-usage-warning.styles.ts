import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

type ClassKey =
  'root' |
  'content';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
      },
      content: {
      },
    };
    return styles;
  };
