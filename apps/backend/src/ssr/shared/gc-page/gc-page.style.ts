import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../../types';
import { layoutParams as lp } from '../../shared/layout-params';

type SharedPageClassKey =
  | 'topArea'
  | 'mainImage'
  | 'title'
  | 'contentBlock'
  | 'highlightedText'
  | 'textDivider'
  | 'alignLeft'
  | 'listNumber'
  | 'image'
;

type ClassKey =
  | SharedPageClassKey
  | '@global body'
  | 'root'
  | 'header'
  | 'headerContent'
  | 'appButton'
  | 'appButtonIcon'
  | '@keyframes appButtonIconAnimation'
  | 'appButtonText'
  | 'appButtonTextMobile'
  | 'logo'
  | 'contentContainer'
  | 'content'
  | 'goToMainPageButton'
  | 'goToMainPageButtonIcon'
  | 'discussContainer'
  | 'footer'
  | 'footerContent'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export type SharedPageClasses = WithStyles<SharedPageClassKey>['classes'];

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      ['@global body']: {
        margin: 0,
      },
      root: {
      },
      header: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: '60px',
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          height: '75px',
        },
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        boxShadow: '0px 2px 5px #00000080',
        zIndex: theme.zIndex.appBar,
      },
      headerContent: {
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          flex: 1,
          padding: '0 10px',
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          width: lp.maxContentSize + 'px',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      appButton: {
        backgroundColor: '#ba68c8',
        color: 'white',
        ['&:hover']: {
          backgroundColor: '#bb7bc5',
        },
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          padding: '6px 8px 6px 4px',
        },
      },
      appButtonIcon: {
        marginRight: '5px',

        animationName: 'appButtonIconAnimation',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-out',
      },
      ['@keyframes appButtonIconAnimation']: {
        '25%': {
          transform: 'scale(1.2, 1.2)',
          // transform: 'translateX(2px)',
        },
        '75%': {
          transform: 'scale(0.95, 0.95)',
          // transform: 'translateX(-2px)',
        },
      },
      appButtonText: {
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          display: 'none',
        },
      },
      appButtonTextMobile: {
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          display: 'none',
        },
      },
      logo: {
        width: '160px',
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          width: '260px',
          marginLeft: '5px',
        },
      },
      contentContainer: {
        paddingTop: '60px',
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          paddingTop: '75px',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '50px',
        overflowX: 'hidden',
      },
      content: {
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          flex: 1,
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          width: lp.maxContentSize + 'px',
        },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        fontFamily: theme.typography.fontFamily,
      },
      goToMainPageButton: {
        margin: '35px auto 0',
        minWidth: '175px',
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
        ['&:hover']: {
          backgroundColor: theme.palette.primary.light + '99',
        },
      },
      goToMainPageButtonIcon: {
        marginRight: '10px',
      },
      discussContainer: {
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          flex: 1,
          margin: '0 13px 20px',
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          margin: '0 auto 50px',
          width: lp.maxContentSize + 'px',
        },
      },
      footer: {
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          height: '75px',
        },
        borderTop: '1px solid #8080804f',
        display: 'flex',
        justifyContent: 'center',
      },
      footerContent: {
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          flex: 1,
          textAlign: 'center',
          padding: theme.spacing.unit,
          flexDirection: 'column',
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          width: lp.maxContentSize + 'px',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      // shared page classes

      topArea: {
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px 0 35px',
        marginBottom: '25px',
        backgroundColor: theme.custom.colors.productListBackground,
      },
      mainImage: {
        maxWidth: '100%',
        margin: '25px 0',
      },
      title: {
        margin: '25px 0 10px',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          padding: '10px',
          fontSize: '4rem',
        },
      },
      contentBlock: {
        fontSize: '1.4rem',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          padding: '10px',
        },
      },
      highlightedText: {
        color: theme.palette.primary.dark,
      },
      textDivider: {
        borderTop: '1px solid ' + theme.palette.grey[400],
        minWidth: '200px',
        alignSelf: 'flex-start',
        margin: '10px 0',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          margin: '0 10px',
        },
      },
      alignLeft: {
        alignSelf: 'flex-start',
      },
      listNumber: {
        color: theme.palette.primary.dark,
      },
      image: {
        maxWidth: '100%',
        margin: '0 0 40px',
      },
    };
    return styles;
  };
