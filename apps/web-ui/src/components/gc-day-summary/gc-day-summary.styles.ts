import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared';

type ClassKey =
  | 'root'
  | 'firstRowBackground'
  | 'firstRowBackgroundScrolled'
  | 'content'
  | 'dateSection'
  | 'dateContainer'
  | 'dateContainerContent'
  | 'dateSecondRow'
  | 'dateLongDayName'
  | 'dateShortDayName'
  | 'dateDay'
  | 'dateYear'
  | 'daysPopup'
  | 'daysPopupRoot'
  | 'daysPopupHeader'
  | 'daysPopupButton'
  | 'daysPopupCloseButton'
  | 'daysPopupFooter'
  | 'navButton'
  | 'nutrientsSummaryButton'
  | 'nutrientsSummaryButtonContent'
  | 'nutrientContainer'
  | 'nutrientValue'
  | 'nutrientPerKilo'
  | 'weightContainer'
  | 'weightButton'
  | 'weightIcon'
  | 'weight'
  | 'weightUnits'
  | 'weightInputContainer'
  | 'weightInputDialog'
  | 'weightInputDialogContent'
  | 'desiredWeightInput'
  | 'desiredWeightHint'
  | 'menuButtonContainer'
  | 'menuButton'
  | 'facebookButton'
  | '@keyframes facebookButton-emergence'
  | 'facebookIcon'
  | 'tutorial'
  | 'tutorialRoot'
  | 'tutorialNutrientsContainer'
  | 'tutorialNutrient'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { gridLine, halfOfGridLine, card,
      contentWidth, breakpoints, minScreenSize, dayHeaderHeight } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'absolute',
        left: 0,
        right: 0,
        minHeight: dayHeaderHeight + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          backgroundColor: theme.palette.grey[200],
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          backgroundColor: theme.palette.grey[50],
        },
        userSelect: 'none',
        boxShadow: '0px 2px 7px #8a8a8a82',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        willChange: 'transform',
        transition: theme.transitions.create('transform', {duration: '.4s'}),
      },
      firstRowBackground: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'none',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          backgroundColor: '#5f6982',
          top: '0',
          left: '0',
          right: '0',
          height: '32px',
          transition: 'background-color 0.5s',
        },
      },
      firstRowBackgroundScrolled: {
        backgroundColor: theme.palette.primary.main + '!important',
      },
      content: {
        position: 'relative',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: contentWidth.col2s + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: contentWidth.col4s + 'px',
          display: 'flex',
          alignItems: 'center',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: contentWidth.col4 + 'px',
        },
        [theme.breakpoints.up(breakpoints.col5)]: {
          width: contentWidth.col5 + 'px',
        },
      },
      dateSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          top: '0px',
          height: '34px',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          margin: `5px ${gridLine}px 5px 0px`,
        },
        [theme.breakpoints.down(breakpoints.col4)]: {
          width: card.small.width + 'px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: card.normal.width + 'px',
        },
        [theme.breakpoints.up(breakpoints.col5)]: {
          marginRight: Math.floor(0.5 * card.normal.width + 1.5 * gridLine),
        },
      },
      dateContainer: {
        height: 'unset',
        width: 'unset',
        borderRadius: '4px',
        alignSelf: 'stretch',
        [theme.breakpoints.up(breakpoints.col4)]: {
          margin: '0px 5px',
        },
      },
      dateContainerContent: {
        flexDirection: 'column',
        padding: '3px',
        minWidth: '87px',
      },
      dateLongDayName: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'none',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
        },
      },
      dateSecondRow: {
        display: 'flex',
      },
      dateShortDayName: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginRight: '2px',
          color: theme.palette.grey[50],
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          display: 'none',
        },
      },
      dateDay: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          color: theme.palette.grey[50],
        },
      },
      dateYear: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'none',
        },
      },
      daysPopup: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          maxWidth: 'unset',
        },
        [theme.breakpoints.down(minScreenSize + 1)]: {
          maxHeight: '100%',
          height: '100%',
          top: '0 !important',
        },
      },
      daysPopupRoot: {
        height: '530px',
        [theme.breakpoints.down(minScreenSize + 1)]: {
          height: '100%',
        },
        display: 'flex',
        flexDirection: 'column',
      },
      daysPopupHeader: {
        padding: '10px 15px',
        backgroundColor: theme.palette.grey[50],
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0px 1px 5px ' + theme.palette.grey[500],
        position: 'relative',
      },
      daysPopupFooter: {
        padding: '15px',
        display: 'flex',
        boxShadow: '0px -2px 2px #80808054',
      },
      daysPopupButton: {
        padding: '8px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          minWidth: 'unset',
        },
      },
      daysPopupCloseButton: {
        height: '30px',
        width: '30px',
        marginLeft: 'auto',
        position: 'absolute',
        right: '15px',
      },
      navButton: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '30px',
          height: '30px',
          color: theme.palette.grey[50],
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: '26px',
          height: '26px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          width: '32px',
          height: '32px',
        },
      },
      nutrientsSummaryButton: {
        height: 'unset',
        width: 'unset',
        borderRadius: '3px',
        alignSelf: 'stretch',
        margin: '5px 0',
        paddingLeft: halfOfGridLine + 'px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: 0,
          left: '0px',
          right: '0px',
          bottom: '3px',
          position: 'absolute',
        },
      },
      nutrientsSummaryButtonContent: {
        padding: '3px',
      },
      nutrientContainer: {
        marginRight: gridLine + 'px',
        flex: 1,
        [theme.breakpoints.down(breakpoints.col4)]: {
          height: '27px !important',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          height: '40px !important',
        },
      },
      nutrientValue: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          margin: '1px 0 0 2px',
          fontSize: '11px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          margin: '3px 0 0 3px',
        },
      },
      nutrientPerKilo: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          height: '14px',
          fontSize: '11px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          height: '18px',
        },
      },
      weightContainer: {
        [theme.breakpoints.up(breakpoints.col4s)]: {
          display: 'flex',
        },
        [theme.breakpoints.up(breakpoints.col5)]: {
          marginLeft: 0.5 * card.normal.width + 0.5 * gridLine,
        },
      },
      weightButton: {
        display: 'flex',
        borderRadius: '3px',
        padding: '5px 10px',
        alignItems: 'center',
        width: 'auto',
        height: '40px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          color: theme.palette.grey[50],
          height: 34,
          padding: '0 2px',
        },
      },
      weightIcon: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          display: 'none',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'block',
          height: '19px',
          width: '19px',
          alignSelf: 'center',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          alignSelf: 'center',
        },
      },
      weight: {
        color: theme.palette.grey[600],
        marginRight: '2px',
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: '18px',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          color: theme.palette.grey[50],
          fontSize: '14px',
        },
      },
      weightUnits: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          color: '#ffffffd6',
          fontSize: '10px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          color: '#9e9e9e',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          marginBottom: '2px',
        },
      },
      weightInputContainer: {
        width: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: '15px',
      },
      weightInputDialog: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: 'unset',
        },
      },
      weightInputDialogContent: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          padding: '0 0 24px',
        },
      },
      desiredWeightInput: {
        margin: '10px 0',
      },
      desiredWeightHint: {
        color: theme.palette.grey[500],
        fontWeight: 100,
        padding: '0 10px',
      },
      menuButtonContainer: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          display: 'flex',
          justifyContent: 'flex-end',
          flex: 1,
          position: 'absolute',
          right: '-8px',
          top: '2px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          marginLeft: 'auto',
        },
      },
      facebookButton: {
        color: '#597cc7',
        borderRadius: '3px',
        [theme.breakpoints.up(breakpoints.col4s)]: {
          marginRight: '1px !important',
        },
        animationName: 'facebookButton-emergence',
        animationDuration: '0.7s',
        animationIterationCount: 1,
      },
      '@keyframes facebookButton-emergence': {
        '0%': {
          transform: 'scale(0.3, 0.3)',
          opacity: 0,
        },
        '40%': {
          transform: 'scale(1.15, 1.15)',
          opacity: 1,
        },
      },
      facebookIcon: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          height: '19px',
          width: '19px',
        },
      },
      menuButton: {
        [theme.breakpoints.up(breakpoints.col4)]: {
          marginRight: '9px',
          height: '32px',
          width: '32px',
        },
        [theme.breakpoints.down(breakpoints.col4)]: {
          height: '30px',
          width: '30px',
          marginRight: '4px',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginRight: '0',
          color: theme.palette.grey[50],
        },
      },
      tutorial: {
        right: '2px !important',
      },
      tutorialRoot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      },
      tutorialNutrientsContainer: {
        display: 'flex',
        [theme.breakpoints.up(breakpoints.col4s)]: {
          margin: '15px 0 20px',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: '15px 0 10px',
        },
      },
      tutorialNutrient: {
        width: '67px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2px',
        padding: '3px 0',

      },
    };
    return styles;
  };
