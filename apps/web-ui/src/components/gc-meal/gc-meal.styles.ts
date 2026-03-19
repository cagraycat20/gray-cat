import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../shared/theme';

type ClassKey =
  | 'root'
  | 'container'
  | 'containerWithProducts'
  | 'summary'
  | 'time'
  | 'timeButton'
  | 'timeCaption'
  | 'nutrientsRoot'
  | 'nutrientContainer'
  | 'nutrientValue'
  | 'nutrientValueSuffix'
  | 'menuButton'
  | 'content'
  | 'contentWithProducts'
  | '@keyframes drop-container-appear'
  | 'dropContainer'
  | 'dropArea'
  | 'dropAreaOver'
  | 'dndCaptionColor'
  | 'newProduct'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { gridLine, halfOfGridLine, card, contentWidth, breakpoints, colors } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        userSelect: 'none',
        MozUserSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        '&:hover > div:first-child > div:first-child > *:last-child': {
          opacity: 1,
        },
      },
      container: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
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
      containerWithProducts: {
        paddingBottom: '15px',
      },
      summary: {
        cursor: 'pointer',
        position: 'relative',
        marginLeft: halfOfGridLine + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: contentWidth.col2s + 'px',
          height: '56px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          display: 'flex',
          alignItems: 'center',
          padding: gridLine + 'px 0px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          display: 'flex',
          alignItems: 'center',
          padding: gridLine + 'px 0px',
        },
      },
      time: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          top: '4px',
          left: '2px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: card.small.width + gridLine + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.width + gridLine + 'px',
        },
        [theme.breakpoints.up(breakpoints.col5)]: {
          width: Math.floor((card.normal.width + gridLine) * 1.5)  + 'px',
        },
      },
      timeButton: {
        height: 'unset',
        width: 'unset',
        borderRadius: '4px',
        marginRight: '2px',
        [theme.breakpoints.up(breakpoints.col4s)]: {
          padding: '2px 5px',
        },
        '&:hover': {
          [theme.breakpoints.down(breakpoints.col4s)]: {
            backgroundColor: 'unset',
          },
        },
      },
      timeCaption: {
        color: theme.palette.grey[700],
      },
      nutrientsRoot: {
        display: 'flex',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          left: '0px',
          right: '0px',
          bottom: halfOfGridLine + 'px',
          position: 'absolute',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          flexBasis: card.small.width * 2 + gridLine * 2 + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          flexBasis: card.normal.width * 2 + gridLine * 2 + 'px',
          alignSelf: 'stretch',
        },
      },
      nutrientContainer: {
        borderRadius: '2px',
        position: 'relative',
        cursor: 'pointer',
        [theme.breakpoints.down(breakpoints.col4)]: {
          height: '22px !important',
        },
        marginRight: gridLine + 'px',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      nutrientValue: {
        color: '#fff',
        lineHeight: 'normal',
      },
      nutrientValueSuffix: {
        color: '#ffffffd6',
        fontWeight: 100,
        fontSize: '10px',
        margin: '4px 0 0 2px',
      },
      menuButton: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          right: '0px',
          top: '1px',
          height: '23px',
          width: '23px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          transition: theme.transitions.create('opacity'),
          opacity: 0.1,
          margin: '0 4px 0 auto',
          height: '30px',
          width: '30px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          margin: '0 9px 0 auto',
        },
      },
      content: {
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        display: 'flex',
        flex: 1,
        position: 'relative',
      },
      contentWithProducts: {
        paddingBottom: '20px',
        [theme.breakpoints.down(breakpoints.col4)]: {
          minHeight: card.small.height + gridLine + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          minHeight: card.normal.height + gridLine + 'px',
        },
      },
      '@keyframes drop-container-appear': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      dropContainer: {
        animationName: ' drop-container-appear',
        animationDuration: '.3s',
        animationIterationCount: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 'calc(100%)',
        backgroundColor: '#f0f0f0e3',
        border: '1px solid #b7b7b745',
        zIndex: 1,
        display: 'flex',
        transition: '1s',
        opacity: 1,
      },
      dropArea: {
        flex: 1,
        margin: '3px',
        border: '2px dashed #b7b7b7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        transition: theme.transitions.create('background-color'),
      },
      dropAreaOver: {
        backgroundColor: colors.dndOver,
      },
      dndCaptionColor: {
        color: theme.palette.grey[600],
      },
      newProduct: {
        opacity: 0.3,
      },
    };
    return styles;
  };
