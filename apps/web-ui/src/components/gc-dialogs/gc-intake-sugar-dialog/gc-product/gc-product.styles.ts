import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../../shared/theme';

type ClassKey =
    'paper'
  | 'paperMainInfoContainer'
  | 'media'
  | 'productNameContainer'
  | 'productName'
  | 'nutrientsContainer'
  | 'nutrientsRoot'
  | 'nutrientContainer'
  | 'nutrientValue'
  | 'nutrientUnit'
  | 'caloriesBar'
  | 'caloriesBarContent'
  | 'caloriesBarEndLabel'
  | 'caloriesBarStartLabel'
  ;

export type StyleProps = WithStyles<ClassKey>;

const minMobileBreakpoint = 375;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    paper: {
      margin: theme.custom.spacing.base,
    },
    paperMainInfoContainer: {
      display: 'flex',
      paddingTop: theme.custom.spacing.base,
      paddingRight: theme.custom.spacing.base,
      paddingBottom: 0,
      paddingLeft: theme.custom.spacing.base,
    },
    media: {
      backgroundColor: 'transparent',
      height: 70,
      [theme.breakpoints.down(minMobileBreakpoint)]: {
        height: 65,
      },
    },
    productNameContainer: {
      marginLeft: theme.custom.spacing.base,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
    },
    productName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    nutrientsContainer: {
      position: 'relative',
      marginTop: theme.custom.spacing.small,
      paddingLeft: theme.custom.spacing.base,
      paddingBottom: theme.custom.spacing.base,
    },
    nutrientsRoot: {
      display: 'flex',
      [theme.breakpoints.up(theme.custom.breakpoints.col4s)]: {
        flexBasis: theme.custom.card.small.width * 2 + theme.custom.gridLine * 2 + 'px',
      },
      [theme.breakpoints.up(theme.custom.breakpoints.col4)]: {
        flexBasis: theme.custom.card.normal.width * 2 + theme.custom.gridLine * 2 + 'px',
        alignSelf: 'stretch',
      },
    },
    nutrientContainer: {
      borderRadius: 2,
      marginRight: theme.custom.gridLine + 'px',
      flex: 1,
      display: 'flex',
      textAlign: 'center',
      height: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nutrientValue: {
      textAlign: 'left',
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: theme.custom.spacing.small,
      paddingLeft: theme.custom.spacing.small,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    nutrientUnit: {
      color: '#ffffffd6',
      marginTop: 3,
    },
    caloriesBar: {
      border: '1px solid grey',
      borderRadius: 3,
      height: 14,
      position: 'relative',
    },
    caloriesBarContent: {
      bottom: 0,
      top: 0,
      left: 0,
      position: 'absolute',
      borderRadius: '0 4px 4px 0px',
    },
    caloriesBarEndLabel: {
      top: '100%',
      right: 0,
      position: 'absolute',
    },
    caloriesBarStartLabel: {
      top: '100%',
      left: 0,
      position: 'absolute',
    },
    ...theme.custom.nutrientProps,
  };

  return styles;
};
