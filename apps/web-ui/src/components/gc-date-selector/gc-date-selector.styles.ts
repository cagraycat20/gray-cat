import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
    'periodContainer'
  | 'periodButton'
  | 'periodButtonValueContainer'
  | 'periodButtonValueRow'
  | 'periodButtonValue'
  | 'periodButtonSubValue'
  | 'periodButtonIcon'
  | 'dateTo'
  | 'period'
  | 'selectedPeriod'
  | 'customDateTypeContainer'
  | 'customDateTypeButtonsContainer'
  | 'dateRange'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    periodContainer: {
      width: '100%',
      textAlign: 'right',
      position: 'relative',
    },
    periodButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      maxWidth: '100%',
    },
    periodButtonValueContainer: {
      display: 'grid',
    },
    periodButtonValueRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    periodButtonValue: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginLeft: theme.custom.spacing.small,
      marginRight: theme.custom.spacing.small,
      textAlign: 'right',
    },
    periodButtonSubValue: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginLeft: theme.custom.spacing.small,
      marginRight: theme.custom.spacing.small,
      textAlign: 'right',
      fontSize: theme.custom.fontSizes.small,
      color: 'rgba(0, 0, 0, 0.54)',
      [theme.breakpoints.down(350)]: {
        fontSize: theme.custom.fontSizes.xsmall,
      },
    },
    periodButtonIcon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    dateTo: {
      marginTop: theme.custom.spacing.xlarge,
    },
    period: {
      padding: theme.custom.spacing.base,
      width: '100%',
      textAlign: 'left',
      display: 'block',
    },
    selectedPeriod: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    customDateTypeContainer: {
      marginTop: 14,
      marginRight: theme.custom.spacing.base,
      marginBottom: theme.custom.spacing.base,
      marginLeft: theme.custom.spacing.base,
      display: 'grid',
    },
    customDateTypeButtonsContainer: {
      textAlign: 'right',
      marginTop: theme.custom.spacing.base,
    },
    dateRange: {
      fontSize: theme.custom.fontSizes.small,
      color: 'rgba(0, 0, 0, 0.54)',
    },
    ...theme.custom.nutrientProps,
  };

  return styles;
};
