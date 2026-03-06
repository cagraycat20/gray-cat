import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../types';

type ClassKey =
  | 'root'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        // border: 'solid 1px red',
      },
    };
    return styles;
  };
