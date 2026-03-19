import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../../shared/theme';

export type ClassKey =
    'totalContainer'
  | 'totalMoneySpent'
  | 'totalMoneySpentValue'
  | 'totalConsumedWeight'
  | 'totalConsumedWeightValue'
  | 'nutrientsTotalContainer'
  | 'nutrientContainer'
  | 'nutrientContainerMargin'
  | 'nutrientNameRow'
  | 'nutrientValueRow'
  | 'facebookIconRoot'
  | 'facebookButton'
  | 'facebookIcon'
  | '@keyframes facebookButton-emergence'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { breakpoints, gridLine, fontSizes, spacing } = theme.custom;

  const styles: StyleRules<ClassKey> = {
    totalContainer: {
      backgroundColor: '#fff',
      display: 'grid',
      gridTemplateRows: '22px 22px auto',
      gridTemplateColumns: '85px 130px auto',
      padding: '8px 16px',
      [theme.breakpoints.down(breakpoints.col4s)]: {
        gridTemplateColumns: '67px 130px auto',
        gridTemplateRows: '18px 18px auto',
      },
    },
    totalMoneySpent: {
      gridColumn: '1 / 2',
      gridRow: '1 / 2',
      fontSize: fontSizes.small + 'px',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: fontSizes.base + 'px',
      },
    },
    totalMoneySpentValue: {
      gridColumn: '2 / 3',
      gridRow: '1 / 2',
      fontSize: fontSizes.small + 'px',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: fontSizes.base + 'px',
      },
    },
    totalConsumedWeight: {
      gridColumn: '1 / 2',
      gridRow: '2 / 3',
      fontSize: fontSizes.small + 'px',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: fontSizes.base + 'px',
      },
    },
    totalConsumedWeightValue: {
      gridColumn: '2 / 3',
      gridRow: '2 / 3',
      fontSize: fontSizes.small + 'px',
      [theme.breakpoints.up(breakpoints.col4s)]: {
        fontSize: fontSizes.base + 'px',
      },
    },
    nutrientsTotalContainer: {
      gridColumn: '1 / 4',
      gridRow: '3 / 4',
      display: 'flex',
      paddingTop: theme.custom.spacing.base,
      borderTop: '1px solid #0202021f',
    },
    nutrientContainer: {
      borderRadius: 2,
      position: 'relative',
      cursor: 'pointer',
      flex: 1,
      display: 'grid',
      textAlign: 'center',
    },
    nutrientContainerMargin: {
      marginRight: gridLine + 'px',
    },
    nutrientNameRow: {
    },
    nutrientValueRow: {
      fontWeight: 100,
      lineHeight: 1.3,
    },
    facebookIconRoot: {
      gridRow: '1 / 3',
      display: 'flex',
      justifyContent: 'flex-end',
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
      height: 'fit-content',
      alignSelf: 'center',
      padding: spacing.small,
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
        height: 24,
        width: 24,
      },
    },
  };

  return styles;
};
