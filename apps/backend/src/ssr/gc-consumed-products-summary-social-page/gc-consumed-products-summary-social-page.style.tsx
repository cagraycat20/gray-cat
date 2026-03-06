import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../types';

type ClassKey =
  | '@global body'
  | '@global html'
  | 'root'
  | 'bar'
  | 'barContent'
  | 'logoContainer'
  | 'logo'
  | 'tryForFreeButton'
  | 'content'
  | 'header'
  | 'nutrientsMarkContainer'
  | 'nutrientsMark'
  | 'datePrefix'
  | 'mealContainer'
  | 'mealHeader'
  | 'mealTime'
  | 'nutrientsContainer'
  | 'nutrient'
  | 'nutrientNameArea'
  | 'nutrientName'
  | 'nutrientValueArea'
  | 'mealNutrientValueArea'
  | 'nutrientValue'
  | 'mealNutrientValue'
  | 'nutrientValueMiddleArea'
  | 'nutrientValueBottomArea'
  | 'nutrientValueBottomAreaBorder'
  | 'nutrientValueBottomAreaOverlay'
  | 'productCard'
  | 'productCardInfo'
  | 'productName'
  | 'productWeight'
  | 'lastProductCard'
  | 'productImage'
  | 'whiteText'
  ;

const cardWidth = 330;
const cardWidthSmall = 320;
const contentWidth = cardWidth * 3;

const barHeight = 65;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      ['@global body']: {
        margin: 0,
        height: '100%',
      },
      ['@global html']: {
        height: '100%',
      },
      root: {
        backgroundColor: '#1b1b1b',
        paddingTop: '65px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        MozUserSelect: 'none',
        minHeight: 'calc(100% - 65px)',
      },
      bar: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: barHeight + 'px',
        backgroundColor: theme.palette.primary.dark,
        zIndex: theme.zIndex.appBar,
        boxShadow: '0px 3px 5px #151515',
        display: 'flex',
        justifyContent: 'center',
      },
      barContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 25px',
        [theme.breakpoints.down(contentWidth)]: {
          padding: '8px',
        },
        flex: 1,
      },
      logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        height: barHeight + 'px',
      },
      logo: {
        width: 200,
        [theme.breakpoints.down(contentWidth)]: {
          width: 185,
        },
      },
      tryForFreeButton: {
        borderColor: theme.palette.grey[50],
        [theme.breakpoints.down(contentWidth)]: {
          fontSize: '12px',
          padding: '5px',
        },
      },
      content: {
        maxWidth: contentWidth + 'px',
        [theme.breakpoints.down(contentWidth)]: {
          maxWidth: cardWidthSmall + 'px',
        },
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      },
      header: {
        backgroundColor: '#035463',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 5px #151515',
        zIndex: 1,
        padding: '10px 0 5px',
      },
      nutrientsMarkContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down(contentWidth)]: {
          marginTop: '7px',
        },
      },
      datePrefix: {
        color: theme.palette.grey[50],
      },
      nutrientsMark: {
        color: theme.palette.grey[50],
        fontSize: '28px',
        [theme.breakpoints.down(contentWidth)]: {
          fontSize: '20px',
        },
      },
      mealContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
      },
      mealHeader: {
        backgroundColor: '#333333',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        minHeight: '100px',
        [theme.breakpoints.down(contentWidth)]: {
          flexDirection: 'column',
        },
      },
      mealTime: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        [theme.breakpoints.up(contentWidth)]: {
          position: 'absolute',
          left: '0',
          bottom: '0',
          top: '0',
          width: '170px',
        },
        [theme.breakpoints.down(contentWidth)]: {
          marginTop: '10px',
        },
      },
      nutrientsContainer: {
        display: 'flex',
        width: '440px',
        alignItems: 'center',
        [theme.breakpoints.down(contentWidth)]: {
          width: cardWidthSmall + 'px',
        },
      },
      nutrient: {
        flex: 1,
        width: '70px',
        margin: '10px 5px',
        transition: theme.transitions.create(
          ['transform'],
          {duration: '.4s'},
        ),
        ['&:hover']: {
          transform: 'translateY(5px)',
        },
      },
      nutrientNameArea: {
        border: '2px solid white',
        borderBottom: 'unset',
        padding: '3px',
        display: 'flex',
        justifyContent: 'center',
      },
      nutrientName: {
        [theme.breakpoints.down(contentWidth)]: {
          fontSize: '11px',
        },
      },
      nutrientValueArea: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '50px',
        [theme.breakpoints.down(contentWidth)]: {
          height: '44px',
        },
      },
      mealNutrientValueArea: {
        [theme.breakpoints.up(contentWidth)]: {
          height: '70px !important',
          marginTop: '10px',
        },
      },
      nutrientValue: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        fontSize: '18px',
        [theme.breakpoints.down(contentWidth)]: {
          fontSize: '16px',
        },
      },
      mealNutrientValue: {
        [theme.breakpoints.down(contentWidth)]: {
          top: '6px !important',
        },
        [theme.breakpoints.up(contentWidth)]: {
          top: '18px !important',
        },
      },
      nutrientValueMiddleArea: {
        flex: 2,
        border: '2px solid white',
      },
      nutrientValueBottomArea: {
        flex: 1,
        position: 'relative',
      },
      nutrientValueBottomAreaBorder: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        borderRight: '50px solid transparent',
        borderLeft: '50px solid transparent',
        borderTop: '15px solid white',
        [theme.breakpoints.down(contentWidth)]: {
          borderRight: '35px solid transparent',
          borderLeft: '35px solid transparent',
          borderTop: '10px solid white',
        },
      },
      nutrientValueBottomAreaOverlay: {
        position: 'absolute',
        top: '-2px',
        bottom: '0px',
        left: '2px',
        right: '2x',
        borderTop: '14px solid transparent',
        borderRight: '48px solid transparent',
        borderLeft: '48px solid transparent',
        [theme.breakpoints.down(contentWidth)]: {
          borderTop: '9px solid transparent',
          borderRight: '33px solid transparent',
          borderLeft: '33px solid transparent',
        },
      },
      productCard: {
        position: 'relative',
        minWidth: cardWidth + 'px',
        minHeight: '200px',
        [theme.breakpoints.down(contentWidth)]: {
          minWidth: cardWidthSmall + 'px',
          minHeight: '180px',
        },
        ['&:hover > h6:first-of-type']: {
          transform: 'translate(5px, 5px)',
          backgroundColor: '#000000bd',
        },
        ['&:hover > h6:last-of-type']: {
          transform: 'translate(-5px, -5px)',
          backgroundColor: '#000000bd',
        },
      },
      productCardInfo: {
        position: 'absolute',
        padding: '5px 15px',
        backgroundColor: '#0000008a',
        borderRadius: '3px',
      },
      lastProductCard: {
        flex: 1,
      },
      productImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      productName: {
        left: '10px',
        top: '10px',
        maxWidth: 'calc(100% - 60px)',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        [theme.breakpoints.down(contentWidth)]: {
          fontSize: '16px',
        },
        transition: theme.transitions.create(
          ['transform', 'background-color'],
          {duration: '.5s'},
        ),
      },
      productWeight: {
        right: '10px',
        bottom: '10px',
        [theme.breakpoints.down(contentWidth)]: {
          fontSize: '16px',
        },
        transition: theme.transitions.create(
          ['transform', 'background-color'],
          {duration: '.5s'},
        ),
      },
      whiteText: {
        color: theme.palette.grey[50],
      },
    };
    return styles;
  };
