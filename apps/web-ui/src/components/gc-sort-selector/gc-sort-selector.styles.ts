import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
    'container'
  | 'directionButtonContainer'
  | 'directionButton'
  | 'directionButtonLabel'
  | 'arrow'
  | 'text'
  | 'fieldSelect'
  | 'selectElement'
  | 'selectIcon'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const styles: StyleRules<ClassKey> = {
    container: {
      display: 'flex',
    },
    directionButtonContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      borderLeft: '1px solid #00000017',
    },
    directionButton: {
      minWidth: '38px',
      padding: '0',
    },
    directionButtonLabel: {
      flexDirection: 'column',
      fontWeight: 300,
      fontSize: '10px',
      color: '#5e5e5e',
    },
    arrow: {
      marginBottom: 'auto',
      marginTop: 'auto',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    text: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: theme.custom.fontSizes.small,
      color: 'rgba(0, 0, 0, 0.54)',
    },
    fieldSelect: {
      '&:before': {
        borderColor: 'rgba(0, 0, 0, 0.15)',
      },
      fontSize: theme.custom.fontSizes.base,
    },
    selectElement: {
      padding: '14px 65px 12px 12px',
    },
    selectIcon: {
      right: '40px',
    },
  };

  return styles;
};
