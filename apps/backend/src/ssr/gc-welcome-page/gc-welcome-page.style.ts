import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../types';
import { layoutParams as lp } from '../shared/layout-params';

type ClassKey =
  | 'title'
  | 'subTitle'
  | 'demoContainer'
  | 'demo'
  | 'divider'
  | 'articleContainer'
  | 'articleContainerRightAligned'
  | 'articleImage'
  | 'articleTextContainer'
  | 'articleTextContainerMarginLeft'
  | 'articleTextContainerMarginRight'
  | 'articleTitle'
  | 'articleText'
  | 'articleReadMoreCaption'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      title: {
        fontWeight: 600,
        marginBottom: '15px',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          paddingTop: '10px',
          fontSize: '26px',
          textAlign: 'center',
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          fontSize: '40px',
          paddingTop: '30px',
        },
      },
      subTitle: {
        fontWeight: 400,
        fontSize: '1.2rem',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          fontSize: '14px',
          textAlign: 'center',
        },
      },
      demoContainer: {
        borderRadius: '2px',
        margin: '20px 0 10px',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          maxWidth: 'calc(100% - 50px)',
          margin: '10px 15px 10px',
        },
      },
      demo: {
        maxWidth: '100%',
        border: '2px solid #c1bfbf',
      },
      divider: {
        alignSelf: 'stretch',
        margin: '10px 20px',
      },
      articleContainer: {
        display: 'flex',
        textDecoration: 'none !important',
        borderRadius: '3px',
        transition: theme.transitions.create('background-color'),
        ['&:hover']: {
          backgroundColor: '#def3fd',
          ['& > div > *:last-child']: {
            opacity: 1,
          },
        },
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          flexDirection: 'column',
          padding: '15px',
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          padding: '20px',
        },
      },
      articleContainerRightAligned: {
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          flexDirection: 'row-reverse',
        },
      },
      articleImage: {
        borderRadius: '3px',
        objectFit: 'contain',
        alignSelf: 'center',
        minWidth: '290px',
        minHeight: '275px',
      },
      articleTextContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      articleTextContainerMarginLeft: {
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          marginLeft: '30px',
        },
      },
      articleTextContainerMarginRight: {
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          marginRight: '30px',
        },
      },
      articleTitle: {
        color: theme.palette.primary.dark,
        marginBottom: '15px',
        fontWeight: 600,
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          marginTop: '15px',
          fontSize: '2rem',
        },
      },
      articleText: {
        fontWeight: 400,
        lineHeight: 1.5,
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          lineHeight: 1.4,
          fontSize: '1.2rem',
        },
      },
      articleReadMoreCaption: {
        marginTop: 'auto',
        [theme.breakpoints.down(lp.mobileBreakdown)]: {
          marginTop: '15px',
        },
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          opacity: 0,
        },
        transition: theme.transitions.create('opacity'),
      },
    };
    return styles;
  };
