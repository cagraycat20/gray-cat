import {
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../../types';

export type ClassKey =
  | 'productLink'
  | 'productContainer'
  | 'productName'
  | 'productImageRoot'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => ({
  productLink: {
    textDecoration: 'none',
    marginRight: theme.custom.spacing.base,
  },
  productContainer: {
    flex: '0 0 auto',
  },
  productName: {
    textAlign: 'center',
    maxWidth: 150,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  productImageRoot: {
    maxHeight: '75px',
  },
});
