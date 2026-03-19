import {
  CSSProperties,
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'root'
  | 'container'
  | 'slide'
  | 'emptySlide'
  | 'emptySlideText'
  | 'topGapStyle'
  | 'contentWidth'
  | 'customTimeDndAreaContainer'
  | 'emptyContentContainer'
  | 'emptyContent'
  | '@keyframes emptyContent-emergence'
  | 'emptyContentDndArea'
  | 'emptyContentDndItem'
  | 'emptyContentDndLastItem'
  | '@keyframes dndItem-emergence'
  | 'dndItemContent'
  | 'dndItemContentOver'
  | 'bottomSpace'
  | 'dragCaptionColor'
  | 'dragHereCaption'
  | 'demo'
  | 'button'
  | 'buttonIcon'
  ;

const bottomGapHeight = 65;

export type StyleProps = WithStyles<ClassKey>;

export const gcDayStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { contentWidth, breakpoints, colors, dayHeaderHeight } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
      },
      container: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
      },
      slide: {
        height: '100%',
        position: 'relative',
      },
      emptySlide: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      },
      emptySlideText: {
        position: 'absolute',
        left: '50%',
        top: '174px',
        transform: 'translate(-148px, -50%)',
        fontSize: '18px',
        width: '300px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        padding: '5px',
        borderRadius: '2px',
        zIndex: 1,
        color: '#989898',
      },
      topGapStyle: {
        height: dayHeaderHeight + 'px',
      },
      contentWidth: {
        [theme.breakpoints.up(breakpoints.col2s)]: {
          width: contentWidth.col2s + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: contentWidth.col4s + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: contentWidth.col4 + 'px',
        },
        [theme.breakpoints.up(breakpoints.col5)]: {
          width: contentWidth.col5 + 'px',
        },
      },
      customTimeDndAreaContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '200px',
      },
      emptyContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `calc(100% - ${dayHeaderHeight}px)`,
      },
      emptyContent: {
        flex: 'auto',
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        opacity: 0,
        transform: 'scale(0, 0)',

        animationName: 'emptyContent-emergence',
        animationIterationCount: 1,
        animationDuration: '.4s',
        animationFillMode: 'forwards',
      },
      '@keyframes emptyContent-emergence': {
        '0%': {
          opacity: 0,
          transform: 'scale(0.8 ,0.8) translateY(50px)',
        },
        '100%': {
          opacity: 1,
          transform: 'unset',
        },
      },
      emptyContentDndArea: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        display: 'flex',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.grey[50],
      },
      emptyContentDndItem: {
        width: '50%',
        height: '200px',
      },
      emptyContentDndLastItem: {
        flex: 1,
      },
      '@keyframes dndItem-emergence': {
        '100%': {
          opacity: 1,
        },
      },
      dndItemContent: {
        height: 'calc(100% - 10px)',
        margin: '5px',
        border: '2px dashed #b7b7b7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        transition: theme.transitions.create('background-color'),
        opacity: 0,

        animationName: 'dndItem-emergence',
        animationIterationCount: 1,
        animationDuration: '.6s',
        animationFillMode: 'forwards',
      },
      dndItemContentOver: {
        backgroundColor: colors.dndOver,
      },
      bottomSpace: {
        height: bottomGapHeight + 'px',
      },
      dragCaptionColor: {
        color: theme.palette.grey[600],
      },
      dragHereCaption: {
        margin: '20px',
      },
      demo: {
        border: '15px solid #d9d9d9',
        borderRadius: '14px',
        marginBottom: '10px',
      },
      button: {
        marginTop: '15px',
        height: '55px',
        alignSelf: 'stretch',
      },
      buttonIcon: {
        marginRight: '10px',
      },
    };
    return styles;
  };

export const thumbStyle: CSSProperties = {
  zIndex: 1,
  backgroundColor: '#4c4c4c2e',
  borderRadius: '2px',
  cursor: 'pointer',
};

// this style is required to fix layout slide in firefox
export const viewStyle: CSSProperties = {
  overflow: 'hidden scroll',
  marginBottom: '0px',
};

export const slideContainerStyle: CSSProperties = {
  height: '100%',
};
