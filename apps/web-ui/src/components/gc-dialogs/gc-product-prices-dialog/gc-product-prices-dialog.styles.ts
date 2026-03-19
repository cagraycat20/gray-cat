import {
  CSSProperties,
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
  | 'controlPanel'
  | 'sortByFromControl'
  | 'sortByCaption'
  | 'filterInputContainer'
  | 'filterInputRoot'
  | 'filterInput'
  | 'filterInputWithText'
  | 'title'
  | 'cardsContainer'
  | 'cardsInnerContainer'
  | 'cardContainer'
  | 'addButton'
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
  | 'addPriceButton'
;

const topAreaHeight = 105;
const scrollBarPadding = 6;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { halfOfGridLine, gridLine,
      breakpoints, card } = theme.custom;
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
        minHeight: topAreaHeight + 'px',
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
      controlPanel: {
        flex: 1,
        display: 'flex',
        padding: '0 5px',
        alignItems: 'center',
      },
      sortByFromControl: {
        margin: '4px 5px 0px 5px',
        minWidth: '150px',
      },
      sortByCaption: {
        fontSize: '12px',
      },
      filterInputContainer: {
        margin: ' 0 0 -4px auto',
        [theme.breakpoints.up(breakpoints.col2s)]: {
          margin: ' 0 4px -4px auto',
        },
      },
      filterInputRoot: {
        height: '37px',
      },
      filterInput: {
        padding: '6px 0  6px 28px',
      },
      filterInputWithText: {
        padding: '6px 28px',
      },
      title: {
      },
      cardsContainer: {
        flex: 1,
        position: 'relative',
      },
      cardsInnerContainer: {
        flexDirection: 'column',
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
      },
      cardContainer: {
        padding: '5px 10px',
        maxWidth: '460px',
        margin: '0 auto',
      },
      addButton: {
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
      addPriceButton: {
        margin: '0 auto 0 10px',
      },
    };
    return styles;
  };

export const viewStyle: CSSProperties = {
  overflow: 'hidden scroll',
  marginBottom: '0px',
};
