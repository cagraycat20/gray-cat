import {
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../types';

export type ClassKey =
  | 'pageNumber'
  | 'pageNumberSelected'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => ({
  pageNumber: {
    margin: theme.custom.spacing.xsmall,
    minWidth: 40,
  },
  pageNumberSelected: {
    background: 'rgba(0, 0, 0, 0.1)',
  },
});
