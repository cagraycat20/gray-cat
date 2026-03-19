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
  'card' |
  'header' |
  'avatar' |
  'name' |
  'menuButton' |
  'menuIcon' |
  'media' |
  'mediaEditing' |
  'dynamicFooter' |
  'dynamicFooterRaised' |
  'weightContainer' |
  'weightContainerWithNutr' |
  'weightContainerCentered' |
  'weightContainerCenteredWithNutr' |
  'weightValue' |
  'weightChange' |
  'weightInc' |
  '@keyframes product-weight-inc' |
  'weightDec' |
  '@keyframes product-weight-dec' |
  'weightInput' |
  'nutrientsRoot' |
  'nutrientContainer' |
  'nutrientValue' |
  'weightEditingLine' |
  'weightEditingLineHidden' |
  'weightEditingButton' |
  'weightEditingButtonHiddenLeft' |
  'weightEditingButtonHiddenRight' |
  'weightEditingButtonLabel' |
  'weightIcon' |
  'weightSuffix' |
  'productEmerging' |
  '@keyframes product-emerging' |
  'productAdded' |
  '@keyframes product-added' |
  'weightPending' |
  '@keyframes product-weight-pending';

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const GcProductCardWithWeightStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { card, halfOfGridLine, breakpoints} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root:  {
        position: 'relative',
      },
      card: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.width + 'px',
          height: card.small.height + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.width + 'px',
          height: card.normal.height + 'px',
        },
        margin: halfOfGridLine + 'px',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: card.borderRadius + 'px',
        '&:focus': {
          outline: 'unset',
        },
        '&:hover > div:first-child > *:last-child': {
          opacity: 1,
        },
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(breakpoints.col4)]: {
          padding: '3px 4px 3px 5px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          padding: '4px 4px 4px 8px',
        },
      },
      avatar: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          height: card.small.avatar + 'px',
          width: card.small.avatar + 'px',
          marginRight: '4px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          height: card.normal.avatar + 'px',
          width: card.normal.avatar + 'px',
          margin: '0px 5px 0px 3px',
        },
      },
      name: {
        overflow: 'hidden',
        color: theme.palette.grey[600],
        alignSelf: 'center',
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      menuButton: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.menuButton + 'px',
          height: card.small.menuButton + 'px',
          opacity: 0.5,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.menuButton + 'px',
          height: card.normal.menuButton + 'px',
          opacity: 0.1,
        },
        marginLeft: 'auto',

        transition: theme.transitions.create('opacity'),
      },
      menuIcon: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize:  card.small.menuButton + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize:  card.normal.menuButton + 'px',
        },
        marginLeft: 'auto',
      },
      media: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        transition: theme.transitions.create('opacity'),
      },
      mediaEditing: {
        opacity: 0.6,
      },
      dynamicFooter: {
        position: 'absolute',
        [theme.breakpoints.down(breakpoints.col4)]: {
          bottom: '-' + card.small.nutrients.nutrientsRoot.height,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          bottom: '-' + card.normal.nutrients.nutrientsRoot.height,
        },
        left: '0px',
        right: '0px',
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.create('transform'),
      },
      dynamicFooterRaised: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          transform: `translateY(-${card.small.nutrients.nutrientsRoot.height})`,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          transform: `translateY(-${card.normal.nutrients.nutrientsRoot.height})`,
        },
      },
      weightContainer: {
        backgroundColor: 'rgba(50,50,50, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: `0 ${halfOfGridLine}px ${halfOfGridLine}px 0`,
        borderRadius: '2px',
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.nutrientsRootPadding +
            card.small.nutrientContainerWidth * 2,
          height: '20px', // card.small.nutrients.nutrientContainer.height,
          bottom: card.small.nutrientsRootPadding + 'px',
          right: card.small.nutrientsRootPadding + 'px',
          border: '1px solid #ffffff33',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.nutrients.nutrientContainer.width,
          height: card.normal.nutrients.nutrientContainer.height,
          bottom: card.normal.nutrientsRootPadding + 'px',
          right: card.normal.nutrientsRootPadding + 'px',
        },
        position: 'absolute',
        transition: theme.transitions
          .create(['transform', 'width', 'bottom', 'background-color']),
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'rgba(35,35,35, 0.85)',
        },
      },
      weightContainerWithNutr: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          bottom: card.small.nutrientsRootHeight +
            card.small.nutrientsRootPadding + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          bottom: card.normal.nutrientsRootHeight +
            card.normal.nutrientsRootPadding + 'px',
        },
      },
      weightContainerCentered: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.nutrientContainerWidth * 2 +
            card.small.nutrientsRootPadding,
        transform: `translate(-${Math.floor(
          (card.small.width - card.small.nutrientsRootPadding) / 2 -
          card.small.nutrientContainerWidth -
            card.small.nutrientsRootPadding)}px,
          -${card.small.nutrients.nutrientsRoot.height})`,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.nutrientContainerWidth * 2 +
            card.normal.nutrientsRootPadding,
        transform: `translate(-${Math.floor(
          (card.normal.width - card.normal.nutrientsRootPadding) / 2 -
          card.normal.nutrientContainerWidth -
            card.normal.nutrientsRootPadding)}px,
          -${card.normal.nutrients.nutrientsRoot.height})`,
        },
      },
      weightContainerCenteredWithNutr: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.nutrientContainerWidth * 2 +
            card.small.nutrientsRootPadding,
          transform:
          `translate(-${Math.floor(card.small.width / 2 -
              card.small.nutrientContainerWidth -
                card.small.nutrientsRootPadding)}px, 0)`,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.nutrientContainerWidth * 2 +
            card.normal.nutrientsRootPadding,
          transform:
          `translate(-${Math.floor(
              (card.normal.width - card.normal.nutrientsRootPadding) / 2 -
              card.normal.nutrientContainerWidth -
                card.normal.nutrientsRootPadding)}px, 0)`,
        },
      },
      weightValue: {
        color: theme.palette.grey[50],
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: '12px', // card.small.nutrients.nutrientValue.fontSize,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: card.normal.nutrients.nutrientValue.fontSize,
        },
      },
      weightInput: {
        flex: 1,
        width: 0,
        minWidth: 0,
        textAlign: 'center',
        border: 'unset',
        padding: '0',
        backgroundColor: 'unset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        '&:focus': {
          outline: 'unset',
        },
      },
      weightChange: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        right: '0px',
        left: '0px',
        backgroundColor: 'rgba(50,50,50, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5%',
        transform: 'scale(0,0)',
        opacity: 0,
      },
      weightInc: {
        animationName: 'product-weight-inc',
        animationDuration: '1.3s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-out',
      },
      '@keyframes product-weight-inc': {
        '0%': {
          opacity: 0,
          transform: 'translateY(-115%)',
        },
        '35%': {
          opacity: 1,
          transform: 'translateY(-115%)',
        },
        '65%': {
          opacity: 1,
          transform: 'translateY(-115%)',
        },
        '100%': {
          opacity: 0,
          transform: 'translateY(-115%)',
        },
      },
      weightDec: {
        animationName: 'product-weight-dec',
        animationDuration: '1.3s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-out',
      },
      '@keyframes product-weight-dec': {
        from: {
          opacity: 1,
          transform: 'scale(1,1)',
        },
        to: {
          transform: 'translateY(-200%) scale(1,1)',
        },
      },
      nutrientsRoot: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          ...card.small.nutrients.nutrientsRoot,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          ...card.normal.nutrients.nutrientsRoot,
        },
      },
      nutrientContainer: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          ...card.small.nutrients.nutrientContainer,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          ...card.normal.nutrients.nutrientContainer,
        },
      },
      nutrientValue: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          ...card.small.nutrients.nutrientValue,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          ...card.normal.nutrients.nutrientValue,
        },
      },
      weightEditingLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        [theme.breakpoints.down(breakpoints.col4)]: {
          bottom: card.small.nutrientsRootHeight +
            card.small.nutrientsRootPadding + 'px',
          padding: `0 ${card.small.nutrientsRootPadding}px`,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          bottom: card.normal.nutrientsRootHeight +
            card.normal.nutrientsRootPadding + 'px',
            padding: `0 ${card.normal.nutrientsRootPadding}px`,
        },
        display: 'flex',
        justifyContent: 'space-between',
        opacity: 1,
        visibility: 'visible',
      },
      weightEditingLineHidden: {
        visibility: 'hidden',
        transition: `visibility 0s linear ${theme.transitions.duration.standard}ms`,
      },
      weightEditingButton: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.nutrients.nutrientContainer.width,
          height: '20px', // card.small.nutrients.nutrientContainer.height,
          fontSize: card.small.nutrients.nutrientValue.fontSize,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.nutrients.nutrientContainer.width,
          height: card.normal.nutrients.nutrientContainer.height,
          fontSize: card.normal.nutrients.nutrientValue.fontSize,
        },
        borderRadius: '2px',
        backgroundColor: 'rgba(50,50,50, 0.8)',
        boxShadow: 'inset 0px 0px 4px grey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#7a7b7b',
        },
        transition: theme.transitions.create('transform'),
      },
      weightEditingButtonHiddenLeft: {
        transform: `translateX(-120px)`,
      },
      weightEditingButtonHiddenRight: {
        transform: `translateX(120px)`,
      },
      weightEditingButtonLabel: {
        color: theme.palette.grey[200],
      },
      weightIcon: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: '16px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: '20px',
        },
      },
      weightSuffix: {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: '0px',
        color: '#fafafaa3',
        lineHeight: 1.4,
        right: '1px',
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: '10px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: '11px',
        },
      },
      productEmerging: {
        animationName: 'product-emerging',
        animationDuration: '.3s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-out',
      },
      '@keyframes product-emerging': {
        '0%': {
          opacity: 0,
          transform: 'scale(0, 0)',
        },
        '75%': {
          opacity: 0.75,
          transform: 'scale(1.08, 1.08)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1, 1)',
        },
      },
      productAdded: {
        animationName: 'product-added',
        animationDuration: '.2s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-out',
      },
      '@keyframes product-added': {
        '0%': {
          transform: 'scale(1.2, 1.2)',
        },
        '75%': {
          transform: 'scale(0.9, 0.9)',
        },
        '100%': {
          transform: 'scale(1, 1)',
        },
      },
      weightPending: {
        animationName: 'product-weight-pending',
        animationDuration: '.4s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-out',
        animationDirection: 'alternate',
      },
      '@keyframes product-weight-pending': {
        from: {
          opacity: 0.7,
          transform: 'scale(0.9, 0.9)',
        },
        to: {
          transform: 'scale(1.05, 1.05)',
        },
      },
    };
    return styles;
  };
