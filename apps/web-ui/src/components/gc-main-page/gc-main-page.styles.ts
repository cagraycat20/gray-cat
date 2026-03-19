import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../shared/theme';

type ClassKey =
  'root' |
  'day' |
  'bottomActionButton' |
  'productDialog' |
  'productDialogToolbar' |
  'productDialogToolbarButton' |
  'productsRootInDialog' |
  'productsDialogTopArea' |
  'productsDialogFilterContainer' |
  'productsDialogBackground' |
  'checkbox' |
  'checkboxCaption'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

const productDialogPadding = 20;

export const GcMainPageStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, colors, productList: {gridLine}} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        flex: 1,
        backgroundColor: theme.palette.grey[50],
        display: 'flex',
        '&:focus': {
          outline: 'unset',
        },
      },
      day: {
        flex: 1,
        position: 'relative',
        // overflowY: 'hidden',
      },
      bottomActionButton: {
        position: 'fixed',
        right: '15px',
        bottom: '15px',
      },
      productDialog: {
        width: '520px',
        height: '800px',
        backgroundColor: colors.productListBackground,
        padding: productDialogPadding + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: 0,
          maxHeight: 'unset',
          maxWidth: 'unset',
          height: '100%',
          width: '100%',
          padding: '0',
        },
      },
      productDialogToolbar: {
        [theme.breakpoints.up(breakpoints.col4s)]: {
          margin: `-${productDialogPadding}px -${productDialogPadding}px 0`,
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        padding: '5px 20px',
        zIndex: 1,
      },
      productDialogToolbarButton: {
        color: theme.palette.grey[50],
        width: '40px',
        height: '40px',
      },
      productsRootInDialog: {
        flex: 1,
      },
      productsDialogTopArea: {
        alignSelf: 'center',
        width: '100%',
        paddingRight: gridLine + 'px',
      },
      productsDialogFilterContainer: {
        width: 'unset !important',
      },
      productsDialogBackground: {
        backgroundColor: '#cfcfcfb0',
      },
      checkbox: {
        color: theme.palette.grey[200],
      },
      checkboxCaption: {
        color: theme.palette.grey[50],
      },
    };
    return styles;
  };
