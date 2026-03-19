import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../shared/theme';

type ClassKey =
  | 'tabs'
  | 'tabsFlexContainer'
  | 'tabRoot'
  | 'tabWrapper'
  | 'tabLabelContainer'
  | 'tabTextColorPrimary'
  | 'tabIcon'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { productList: { gridLine }} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      tabs: {
        minHeight: 'unset',
        margin: `0 0 ${gridLine}px ${gridLine}px`,
      },
      tabsFlexContainer: {
        justifyContent: 'center',
      },
      tabRoot: {
        minHeight: '34px',
        minWidth: '55px',
        marginRight: '15px',
        paddingTop: '4px',
      },
      tabWrapper: {
        flexDirection: 'row',
      },
      tabLabelContainer: {
        padding: '5px',
      },
      tabTextColorPrimary: {
        color: theme.palette.grey[500],
      },
      tabIcon: {
        fontSize: '16px',
      },
    };
    return styles;
  };
