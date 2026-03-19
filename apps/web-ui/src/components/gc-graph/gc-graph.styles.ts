import green from '@material-ui/core/colors/green';
import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
    'dialogPaper'
  | 'root'
  | 'graph'
  | 'topBar'
  | 'topBarRangeSelector'
  | 'topBarRight'
  | 'rangeLabel'
  | 'button'
  | 'proteinCheck'
  | 'fatCheck'
  | 'carbsCheck'
  | 'caloriesCheck'
  | 'checked'
  | 'range'
  | 'rangeSelected'
  | 'noData'
  | 'noDataText'
  | 'displayContainer'
  | 'graphTypeContainer'
  | 'radio'
  | 'radioChecked'
  | 'dialogTitle'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const desktopGraphHeight = 600;

export const gcGraphStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      dialogPaper: {
        overflow: 'hidden',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '100%',
          height: '100%',
          maxWidth: 'unset',
          maxHeight: 'unset',
          margin: '0',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: '90%',
          height: 'auto',
          maxWidth: '90%',
          maxHeight: '90%',
        },
      },
      root: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'stretch',
        height: '100%',
      },
      graph: {
        [theme.breakpoints.up(breakpoints.col4s)]: {
          height: desktopGraphHeight,
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          flex: 'auto',
        },
      },
      topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        color: 'white',
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
      },
      topBarRangeSelector: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      },
      topBarRight: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginLeft: 'auto',
        },
      },
      rangeLabel: {
        marginTop: 'auto',
        marginBottom: 'auto',
        minWidth: '3rem',
        textAlign: 'center',
      },
      button: {
        width: '40px',
        height: '40px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
      proteinCheck: {
        color: theme.custom.colors.protein,
        '&$checked': {
          color: theme.custom.colors.protein,
        },
      },
      fatCheck: {
        color: theme.custom.colors.fat,
        '&$checked': {
          color: theme.custom.colors.fat,
        },
      },
      carbsCheck: {
        color: theme.custom.colors.carbs,
        '&$checked': {
          color: theme.custom.colors.carbs,
        },
      },
      caloriesCheck: {
        color: theme.custom.colors.calories,
        '&$checked': {
          color: theme.custom.colors.calories,
        },
      },
      checked: {
        // just to create ref to '&$checked'
      },
      range: {
        marginLeft: theme.spacing.unit * 2,
      },
      rangeSelected: {
        color: theme.palette.primary.main,
      },
      noData: {
        flex: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataText: {
        color: theme.palette.grey[400],
      },
      displayContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
      },
      graphTypeContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
      },
      radio: {
        '&$radioChecked': {
          color: green[400],
        },
      },
      radioChecked: {},
      dialogTitle: {
        margin: '0 auto',
        color: 'white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

    };
    return styles;
  };
