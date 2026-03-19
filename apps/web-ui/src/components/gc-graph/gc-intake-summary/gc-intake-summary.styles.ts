import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
    'root'
  | 'dateRow'
  | 'dateLabel'
  | 'dateHint'
  | 'dateGoButton'
  | 'detailsGroup'
  | 'detailsRow'
  | 'protein'
  | 'fat'
  | 'carbs'
  | 'bodyWeight'
  | 'calories'
  | 'item'
  | 'detailedItem'
  | 'spaceItem'
  ;
export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { breakpoints } = theme.custom;
  const styles: StyleRules<ClassKey> = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      fontFamily: theme.typography.fontFamily,
      padding: theme.spacing.unit,
    },
    dateRow: {
      flex: 'none',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        height: '3rem',
      },
      [theme.breakpoints.down(breakpoints.col4s)]: {
        height: '2.5rem',
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    dateLabel: {
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: '1.5rem',
      },
      [theme.breakpoints.down(breakpoints.col4s)]: {
        fontSize: '1rem',
      },
    },
    dateHint: {
      fontSize: '0.7rem',
      color: '#aaa',
    },
    dateGoButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      minWidth: 0,
    },
    detailsGroup: {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'start',
      position: 'relative',
    },
    detailsRow: {
      flex: 'auto',
      display: 'flex',
      alignItems: 'stretch',
    },
    item: {
      flexBasis: '50%',
    },
    detailedItem: {
      position: 'absolute',
      left: -2,
      top: -2,
      right: -2,
      bottom: -2,
      zIndex: 1,
    },
    spaceItem: {
      flexBasis: theme.spacing.unit,
    },
    protein: {
      backgroundColor: theme.custom.colors.protein,
    },
    fat: {
      backgroundColor: theme.custom.colors.fat,
    },
    carbs: {
      backgroundColor: theme.custom.colors.carbs,
    },
    bodyWeight: {
      backgroundColor: theme.custom.colors.weight,
      flex: 'auto',
    },
    calories : {
      backgroundColor: theme.custom.colors.calories,
    },
  };
  return styles;
};
