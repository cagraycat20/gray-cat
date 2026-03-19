import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme, WithStylesAndTheme } from '../../shared/theme';

type ClassKey =
  'dialog' |
  'header' |
  'content' |
  'centeredContent' |
  'presets' |
  'preset' |
  'presetSelected' |
  'nutrientsContainer' |
  'nutrientSelection' |
  'options' |
  'optionsContainer' |
  'optionsList' |
  'nutrientCaption' |
  'option' |
  'optionLabel' |
  'optionIcon' |
  'optionIconVisible' |
  '@keyframes optionIcon-emergence' |
  'newOption' |
  'newOptionFontColor' |
  'optionAvatar'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, gridLine } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      dialog: {
        width: '600px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: 0,
          maxHeight: 'unset',
          maxWidth: 'unset',
          height: '100%',
          width: '100%',
          padding: '0',
        },
      },
      header: {
        borderBottom: '1px solid ' + theme.palette.grey[300],
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
      content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '5px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          padding: '5px 0 0 0',
        },
      },
      centeredContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      presets: {
        margin: `0 ${gridLine}px 10px 0`,
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginBottom: '20px',
        },
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'center',
        maxWidth: '285px',
      },
      preset: {
        flex: 1,
        margin: '5px',
        minWidth: '100px',
      },
      presetSelected: {
        color: theme.palette.grey[50],
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.grey[200],
        },
      },
      nutrientsContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0',
        borderBottom: '1px solid ' + theme.palette.grey[200],
      },
      nutrientSelection: {
        position: 'absolute',
        left: '-2px',
        right: '-2px',
        top: 'calc(100% + 5px)',
        borderTop: '3px solid ' + theme.palette.primary.main,
        textAlign: 'center',
        paddingTop: '3px',
      },
      options: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '85px',
      },
      optionsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: ' 9px 0 17px',
      },
      optionsList: {
        maxWidth: '500px',
      },
      nutrientCaption: {
        width: '100%',
        paddingLeft: '10px',
      },
      option: {
        margin: '2px 5px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px',
        minHeight: '32px',
        cursor: 'pointer',
        position: 'relative',
        '&:hover::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#00000025',
          borderRadius: '4px',
          zIndex: -1,
        },
        [theme.breakpoints.down(breakpoints.col4)]: {
          flex: 1,
        },
      },
      optionLabel: {
        padding: '0px 10px',
      },
      '@keyframes optionIcon-emergence': {
        '75%': {
          transform: 'scale(1.5, 1.5)',
        },
        '100%': {
          transform: 'unset',
        },
      },
      optionIcon: {
        color: '#00000042',
        '&:hover': {
          color: '#00000080',
        },
        transform: 'scale(0, 0)',
      },
      optionIconVisible: {
        animationName: 'optionIcon-emergence',
        animationDuration: '.3s',
        animationIterationCount: '1',
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
      },
      newOption: {
        border: '1px solid #42a5f542',
        borderRadius: '6px',
      },
      newOptionFontColor: {
        color: theme.palette.primary.light,
      },
      optionAvatar: {
        height: '22px',
        width: '22px',
        marginLeft: '7px',
      },
    };
    return styles;
  };
