import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'content'
  | 'contentWithSearchView'
  | 'mainView'
  | 'searchView'
  | 'topArea'
  | 'header'
  | 'headerButton'
  | 'inputContainer'
  | 'inputRoot'
  | 'inputLeftIcon'
  | 'inputClearIcon'
  | 'mainViewContentContainer'
  | 'scrollbars'
  | 'hint'
  | 'comparingContainer'
  | 'productContainer'
  | 'selectProductButton'
  | 'productName'
  | 'divider'
  | 'searchPageTabsRoot'
  | 'searchPageTabsIndicator'
  | 'searchPageInputContainer'
  | 'searchPageInputRoot'
  | 'searchPageInputRootFocused'
  | 'searchPageInput'
  | 'searchPageScrollBars'
  | 'searchPageProductsContainer'
  | 'searchPageProductContainer'
  | 'searchPageExceedTheLimit'
  | 'actions'
  | 'media'
  | 'nutrient'
  | 'setPriceButton'
;

const scrollBarPadding = 6;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { halfOfGridLine, gridLine, breakpoints, card, spacing, fontSizes } = theme.custom;

    const styles: StyleRules<ClassKey> = {
      root: {
        flex: 1,
        height: '750px',
        maxWidth: '500px',
        overflowX: 'hidden',
      },
      content: {
        flex: 1,
        display: 'flex',
        width: '200%',
        transition: theme.transitions.create('transform'),
        overflow: 'hidden',
      },
      contentWithSearchView: {
        transform: 'translateX(-50%)',
      },
      mainView: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      },
      searchView: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      },
      topArea: {
        borderBottom: '1px solid #0000001a',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      header: {
        backgroundColor: theme.palette.primary.main,
        borderBottom: '1px solid ' + theme.palette.grey[300],
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${gridLine}px 12px ${gridLine}px 12px`,
        height: '50px',
        color: theme.palette.grey[50],
      },
      headerButton: {
        height: '32px',
        width: '32px',
      },
      inputContainer: {
        position: 'relative',
      },
      inputRoot: {
        borderRadius: '3px',
        backgroundColor: '#ffffffab',
        transition: theme.transitions.create('background-color'),
        border: '1px solid #00000026',
      },
      inputLeftIcon: {
        position: 'absolute',
        left: '3px',
        fontSize: '24px',
        top: 'calc(50% - 12px)',
        pointerEvents: 'none',
        color: '#7d7c7c',
      },
      inputClearIcon: {
        position: 'absolute',
        right: '3px',
        fontSize: '24px',
        top: 'calc(50% - 12px)',
        color: theme.palette.grey[600],
      },
      mainViewContentContainer: {
        flex: 1,
        position: 'relative',
      },
      scrollbars: {
        flexDirection: 'column',
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
      },
      hint: {
        fontSize: fontSizes.small,
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        marginTop: spacing.base,
        marginRight: spacing.large,
        marginBottom: 0,
        marginLeft: spacing.large,
      },
      comparingContainer: {
        marginTop: spacing.xxxlarge,
        display: 'flex',
      },
      productContainer: {
        flex: 1,
        textAlign: 'center',
      },
      selectProductButton: {
        marginLeft: spacing.large,
        marginRight: spacing.large,
        fontSize: fontSizes.small,
      },
      productName: {
        fontSize: fontSizes.large,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: spacing.large,
        marginRight: spacing.large,
      },
      divider: {
        width: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      },
      searchPageTabsRoot: {
        margin: `-${gridLine}px auto`,
        paddingRight: '15px',
      },
      searchPageTabsIndicator: {
        backgroundColor: theme.palette.grey[100],
      },
      searchPageInputContainer: {
        margin: `auto`,
      },
      searchPageInputRoot: {
        minWidth: '225px',
        height: '37px',
      },
      searchPageInputRootFocused: {
        backgroundColor: 'white',
      },
      searchPageInput: {
        padding: '6px 0  6px 30px',
      },
      searchPageScrollBars: {
      },
      searchPageProductsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
        width: (card.small.width + 2 * halfOfGridLine) * 3 + scrollBarPadding + 'px !important',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: (card.small.width + 2 * halfOfGridLine) * 2 + scrollBarPadding + 'px !important',
        },
      },
      searchPageProductContainer: {
        margin: halfOfGridLine + 'px',
      },
      searchPageExceedTheLimit: {
        margin: '5px',
        color: theme.palette.grey[600],
        width: '100%',
        textAlign: 'center',
      },
      actions: {
        display: 'none',
      },
      media: {
        margin: '8px 12px',
        height: 120,
      },
      nutrient: {
        margin: spacing.large,
      },
      setPriceButton: {
        borderRadius: 2,
        padding: `${theme.custom.spacing.xsmall}px ${theme.custom.spacing.large}px`,
        minHeight: 'unset',
        fontSize: theme.custom.fontSizes.small,
        marginTop: spacing.base,
      },
    };
    return styles;
  };
