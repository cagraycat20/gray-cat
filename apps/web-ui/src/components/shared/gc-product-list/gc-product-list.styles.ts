import {
  CSSProperties,
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../../shared/theme';

type ClassKey =
  'root' |
  'productsContentContainer' |
  'productsContent' |
  'groupCaption' |
  'itemContainer' |
  '@keyframes item-emerging'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { productList: {gridLine, breakdownPadding}, card, contentWidth } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'relative',
        flex: 1,
        MozUserSelect: 'none',
        userSelect: 'none',
      },
      productsContentContainer: {
      },
      productsContent: {
        display: 'flex',
        flexWrap: 'wrap',
        transition: theme.transitions.create('opacity'),
        margin: '0 auto',
        paddingRight: gridLine + 'px',
        maxWidth: (card.small.width + gridLine) * 3 +
          gridLine + 1 /*for button shadow*/ + 'px',
        [theme.breakpoints.down(
          contentWidth.get(3, true, gridLine) +
            gridLine + breakdownPadding * 2)
        ]: {
          maxWidth: contentWidth.get(2, true, gridLine) + gridLine + 'px',
        },
      },
      groupCaption: {
        color: theme.palette.grey[50],
        width: 'calc(100% - 20px)',
        margin: '10px 10px 3px',
        animationName: 'item-emerging',
        animationDuration: '.3s',
        animationIterationCount: '1',
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
        opacity: 0,
      },
      itemContainer: {
        // gridLine - 1 to fit minimal screen (320) with 2 columns
        padding: `0 0 ${gridLine}px ${gridLine - 1}px`,
        animationName: 'item-emerging',
        animationDuration: '.15s',
        animationIterationCount: '1',
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
        opacity: 0,
      },
      '@keyframes item-emerging': {
        '0%': {
          transform: 'scale(0.5, 0.5)',
        },
        '100%': {
          opacity: 1,
          transform: 'unset',
        },
      },
    };
    return styles;
  };

export const thumbStyle: CSSProperties = {
  backgroundColor: '#ffffff66',
  borderRadius: '2px',
  cursor: 'pointer',
};

export const scrollBarsStyle: React.CSSProperties = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
};
