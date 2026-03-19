import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'progress'
  | 'content'
  | 'contentEmerging'
  | '@keyframes content-emerging'
  | 'divider'
  | 'selectionHighlight'
  | 'todayHighlight'
  | 'dateContainer'
  | 'dateContainerToday'
  | 'longDayName'
  | 'shortDayName'
  | 'shortDate'
  | 'nutrientsRoot'
  | 'nutrientContainer'
  | 'nutrientValue'
  | 'nutrientPerKilo'
  | 'weightContainer'
  | 'weightValue'
  | 'weightUnit'
  | 'selectedColor'
  | 'todayColor'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'relative',
      },
      progress: {
        position: 'absolute',
        left: 'calc(50% - 15px)',
        top: 'calc(50% - 15px)',
        maxWidth: '30px',
      },
      content: {
        color: theme.palette.grey[700],
        textAlign: 'unset',
        display: 'flex',
        cursor: 'pointer',
        userSelect: 'none',
        transition: theme.transitions.create('background-color'),
        '&:hover': {
          backgroundColor: theme.palette.grey[100],
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          flexDirection: 'column',
          width: 'calc(100% - 5px)',
          padding: '5px 0px 10px 10px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          padding: '5px 10px 5px 25px',
          width: 'calc(100% - 10px)',
        },
      },
      contentEmerging: {
        animationName: 'content-emerging',
        animationDuration: '.3s',
        animationIterationCount: '1',
        animationTimingFunction: 'linear',
      },
      '@keyframes content-emerging': {
        from: {
          opacity: 0,
        },
        to: {
        },
      },
      divider: {
        marginRight: '10px',
      },
      selectionHighlight: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          boxShadow: 'inset 5px 0px ' + theme.palette.primary.main,
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          boxShadow: 'inset 10px 0px ' + theme.palette.primary.main,
        },
      },
      todayHighlight: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          boxShadow: 'inset 5px 0px ' + theme.palette.secondary.light,
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          boxShadow: 'inset 10px 0px ' + theme.palette.secondary.light,
        },
      },
      dateContainer: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '183px',
          height: '30px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: '120px',
        },
      },
      dateContainerToday: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '183px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: '120px',
        },
      },
      longDayName: {
        color: theme.palette.grey[700],
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'none',
        },
      },
      shortDayName: {
        color: theme.palette.grey[700],
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginRight: '1px',
          fontSize: '16px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          display: 'none',
        },
      },
      shortDate: {
        color: theme.palette.grey[700],
        [theme.breakpoints.down(breakpoints.col4s)]: {
          fontSize: '14px',
        },
      },
      nutrientsRoot: {
        flex: 1,
      },
      nutrientContainer: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '60px',
          height: '27px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          height: '35px',
          width: '75px',
        },
        marginRight: '5px',
      },
      nutrientValue: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: '1px 0 0 2px',
          fontSize: '11px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          margin: '2px 0 0 3px',
        },
      },
      nutrientPerKilo: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          height: '14px !important',
          fontSize: '11px !important',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          height: '18px !important',
        },
      },
      weightContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          right: '13px',
          top: '9px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          alignSelf: 'center',
          width: '135px',
        },
      },
      weightValue: {
        margin: '0 2px',
        color: theme.palette.grey[700],
        [theme.breakpoints.down(breakpoints.col4s)]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          fontSize: '1.525rem',
        },
      },
      weightUnit: {
        color: theme.palette.grey[700],
      },
      selectedColor: {
        color: theme.palette.primary.dark + '!important',
      },
      todayColor: {
        color: theme.palette.secondary.light + '!important',
      },
    };
    return styles;
  };
