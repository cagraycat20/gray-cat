import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../../shared/theme';

export type ClassKey =
    'root'
  | 'header'
  | 'titleContainer'
  | 'title'
  | 'titleSuffix'
  | 'starContainer'
  | 'leftStar'
  | 'rightStar'
  | 'star'
  | 'valuesContainer'
  | 'leftValue'
  | 'rightValue'
  | 'calculatedLeftValue'
  | 'calculatedRightValue'
  | 'inactive'
  | 'content'
  | 'protein'
  | 'fat'
  | 'carbs'
  | 'calories'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { fontSizes, spacing } = theme.custom;

  const styles: StyleRules<ClassKey> = {
    root: {
      border: '1px solid rgba(0, 0, 0, 0.15)',
    },
    header: {
      position: 'relative',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      paddingBottom: spacing.small,
      paddingTop: spacing.small,
      textAlign: 'center',
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: fontSizes.base,
    },
    titleSuffix: {
      marginLeft: 4,
      paddingBottom: spacing.small,
      paddingTop: spacing.small,
      color: '#fff',
      fontSize: fontSizes.base,
    },
    starContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
    },
    leftStar: {
      flex: 1,
      textAlign: 'center',
      color: '#fff',
      display: 'flex',
      paddingRight: spacing.large,
    },
    rightStar: {
      flex: 1,
      textAlign: 'center',
      color: '#fff',
      display: 'flex',
      paddingLeft: spacing.large,
    },
    star: {
      margin: 'auto',
    },
    valuesContainer: {
      flex: 1,
    },
    leftValue: {
      marginTop: spacing.small,
      marginRight: spacing.large,
      textAlign: 'center',
    },
    rightValue: {
      marginTop: spacing.small,
      marginLeft: spacing.large,
      textAlign: 'center',
    },
    calculatedLeftValue: {
      marginBottom: spacing.small,
      marginRight: spacing.large,
      textAlign: 'center',
    },
    calculatedRightValue: {
      marginBottom: spacing.small,
      marginLeft: spacing.large,
      textAlign: 'center',
    },
    inactive: {
      opacity: 0.33,
    },
    content: {
      display: 'flex',
      minHeight: 50,
    },
    ...theme.custom.nutrientProps,
  };

  return styles;
};
