import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'header'
  | 'headerButton'
  | 'dialogContent'
  | 'contentContainer'
  | 'contentContainerInSearchMode'
  | 'content'
  | 'nameInput'
  | 'ingredientsContainer'
  | 'ingredientsCaption'
  | 'nutrientsRoot'
  | 'nutrientContainer'
  | 'nutrientName'
  | 'nutrientValueContainer'
  | 'nutrientValue'
  | 'nutrientValueSuffix'
  | 'nutrientsHint'
  | 'ingredientsDivider'
  | 'ingredientScrollBars'
  | 'ingredients'
  | 'addNewCard'
  | 'scrollPadding'
  | 'searchPageRoot'
  | 'searchPageHeader'
  | 'searchHeaderBackButton'
  | 'searchPageInputContainer'
  | 'searchPageSearchIcon'
  | 'searchPageClearIcon'
  | 'searchPageInputRoot'
  | 'searchPageInputRootFocused'
  | 'searchPageInput'
  | 'searchPageScrollBars'
  | 'searchPageProductsContainer'
  | 'searchPageProductContainer'
  | 'searchPageExceedTheLimit'
;

const bigDialogPadding = 25;
const scrollBarPadding = 6;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { halfOfGridLine, gridLine, contentWidth,
      breakpoints, dialogMargin, card, colors } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      nameInput: {
        marginTop: '20px',
      },
      ingredientsContainer: {
        paddingTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      },
      ingredientsCaption: {
        top: '-25px',
        position: 'relative',
        alignSelf: 'center',
        padding: '0 10px',
        backgroundColor: 'white',
        marginBottom: '-15px',
      },
      header: {
        padding: '10px 25px',
        backgroundColor: theme.palette.primary.main,
        marginBottom: '15px',
        minHeight: '52px',
        display: 'flex',
        justifyContent: 'space-between',
      },
      dialogContent: {
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      contentContainer: {
        position: 'relative',
        transition: theme.transitions.create('transform', {duration: '0.5s'}),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      },
      contentContainerInSearchMode: {
        transform: 'translateX(-100%)',
      },
      content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'center',
        [theme.breakpoints.up(breakpoints.col2s)]: {
          width: breakpoints.col2s + 'px',
          marginLeft: scrollBarPadding + 'px',
        },
        [theme.breakpoints.up(
          breakpoints.col4s + 2 * dialogMargin + 2 * bigDialogPadding,
        )]: {
          width: contentWidth.col4s + 'px',
          margin: ` 0 ${bigDialogPadding}px`,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: contentWidth.col4 + 'px',
        },
      },
      nutrientsRoot: {
        display: 'flex',
        margin: `0 0 ${halfOfGridLine}px -${gridLine}px`,
        minHeight: '36px',
        alignSelf: 'center',
      },
      nutrientContainer: {
        width: card.small.width / 2 - halfOfGridLine,
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.width / 2 - halfOfGridLine + 12 + 'px',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: `0 ${halfOfGridLine}px`,
        borderRadius: '2px',
      },
      nutrientName: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: 100,
        color: theme.palette.grey[50],
        marginBottom: '2px',
        lineHeight: 1.4,
        backgroundColor: colors.nutrientNameRowBackground,
      },
      nutrientValueContainer: {
        display: 'flex',
      },
      nutrientValue: {
        lineHeight: 1.2,
        [theme.breakpoints.up(breakpoints.col4)]: {
          lineHeight: 1.4,
        },
      },
      nutrientValueSuffix: {
        color: '#ffffffad',
        fontSize: '0.7rem',
        margin: '0 0 1px 1px',
        alignSelf: 'flex-end',
      },
      nutrientsHint: {
        color: theme.palette.grey[500],
        alignSelf: 'center',
        padding: '5px 10px 0px 0px',
      },
      ingredientsDivider: {
        margin: `15px ${scrollBarPadding}px 10px 0px`,
      },
      ingredientScrollBars: {
        flex: 1,
        minHeight: '310px',
        [theme.breakpoints.up(
          breakpoints.col4s + 2 * dialogMargin + 2 * bigDialogPadding,
        )]: {
          width: 'calc(100% + 8px) !important',
        },
      },
      ingredients: {
        display: 'flex',
        flexWrap: 'wrap',
        overflowY: 'auto',
      },
      addNewCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: card.borderRadius + 'px',
        width: card.small.width + 'px',
        height: card.small.height + 'px',
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.width + 'px',
          height: card.normal.height + 'px',
        },
        border: '1px solid #49acfd78',
        margin: halfOfGridLine + 'px',
        cursor: 'pointer',
        transition: theme.transitions.create('background-color'),
        '&:hover': {
          backgroundColor: '#ceeefd',
        },
      },
      scrollPadding: {
        marginRight: scrollBarPadding + 'px',
      },
      searchPageRoot: {
        position: 'absolute',
        left: '100%',
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      searchPageHeader: {
        alignSelf: 'stretch',
      },
      headerButton: {
        height: '32px',
        width: '32px',
      },
      searchHeaderBackButton: {
        margin: '0 5px 0 -10px',
      },
      searchPageSearchIcon: {
        position: 'absolute',
        left: '3px',
        top: '3px',
        pointerEvents: 'none',
        color: '#7d7c7c',
      },
      searchPageClearIcon: {
        position: 'absolute',
        right: '3px',
        top: '3px',
        color: 'red',
      },
      searchPageInputContainer: {
        position: 'relative',
        marginRight: '15px',
      },
      searchPageInputRoot: {
        borderRadius: '3px',
        backgroundColor: '#ffffffab',
        transition: theme.transitions.create('background-color'),
        minWidth: '225px',
      },
      searchPageInputRootFocused: {
        backgroundColor: 'white',
      },
      searchPageInput: {
        paddingLeft: '30px',
      },
      searchPageScrollBars: {
        marginLeft: scrollBarPadding + 'px',
        width: (card.small.width + 2 * halfOfGridLine) * 2 + scrollBarPadding + 'px !important',
        [theme.breakpoints.up(
          breakpoints.col4s + 2 * dialogMargin + 2 * bigDialogPadding,
        )]: {
          width: (card.small.width + 2 * halfOfGridLine) * 4 + scrollBarPadding + 'px !important',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: (card.small.width + 2 * halfOfGridLine) * 6 + scrollBarPadding + 'px !important',
        },
      },
      searchPageProductsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
      },
      searchPageProductContainer: {
        margin: halfOfGridLine + 'px',
      },
      searchPageExceedTheLimit: {
        margin: '5px',
        color: theme.palette.grey[600],
      },
    };
    return styles;
  };
