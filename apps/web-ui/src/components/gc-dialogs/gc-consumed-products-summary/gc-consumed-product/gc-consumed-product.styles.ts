import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../../shared/theme';

type ClassKey =
    'productPaper'
  | 'productPaperMainInfoContainer'
  | 'media'
  | 'productNameContainer'
  | 'productName'
  | 'setPriceButton'
  | 'moneySpent'
  | 'productWeight'
  | 'productNutrientsContainer'
  | 'nutrientsRoot'
  | 'nutrientContainer'
  | 'nutrientValue'
  | 'nutrientPercentage'
  | 'nutrientPercentageShade'
  ;

export type StyleProps = WithStyles<ClassKey>;

const minMobileBreakpoint = 375;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    productPaper: {
      margin: theme.custom.spacing.base,
    },
    productPaperMainInfoContainer: {
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
      marginRight: theme.custom.spacing.base,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    productName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: theme.custom.fontSizes.large,
    },
    setPriceButton: {
      borderRadius: '2px',
      padding: `${theme.custom.spacing.xsmall}px ${theme.custom.spacing.large}px`,
      minHeight: 'unset',
      fontSize: theme.custom.fontSizes.small,
      marginBottom: '3px',
    },
    moneySpent: {
      [theme.breakpoints.down(minMobileBreakpoint)]: {
        fontSize: theme.custom.fontSizes.small,
        margin: '1px 0 2px',
      },
    },
    productWeight: {
      textAlign: 'left',
      [theme.breakpoints.down(minMobileBreakpoint)]: {
        fontSize: theme.custom.fontSizes.small,
      },
    },
    productNutrientsContainer: {
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
      position: 'relative',
      cursor: 'pointer',
      marginRight: theme.custom.gridLine + 'px',
      flex: 1,
      display: 'grid',
      textAlign: 'center',
      minHeight: 34,
    },
    nutrientValue: {
      color: '#fff',
      lineHeight: 'normal',
      textAlign: 'left',
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: theme.custom.spacing.small,
      paddingLeft: theme.custom.spacing.small,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    nutrientPercentage: {
      color: '#fff',
      lineHeight: 'normal',
      textAlign: 'right',
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: theme.custom.spacing.small,
      paddingLeft: theme.custom.spacing.small,
      fontSize: theme.custom.fontSizes.small,
    },
    nutrientPercentageShade: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      position: 'absolute',
      width: '100%',
      height: '50%',
      bottom: 0,
    },
    ...theme.custom.nutrientProps,
  };

  return styles;
};
