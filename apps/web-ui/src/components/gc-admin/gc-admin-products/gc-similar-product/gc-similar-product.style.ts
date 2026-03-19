import {
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../../../shared/theme';

export type ClassKey =
  | 'productContainer'
  | 'productName'
  | 'imageRoot'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => ({
  productContainer: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
    },
    flex: '0 0 auto',
    padding: theme.custom.spacing.small,
  },
  productName: {
    textAlign: 'center',
    maxWidth: 150,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  imageRoot: {
    height: 75,
    width: 150,
  },
});
