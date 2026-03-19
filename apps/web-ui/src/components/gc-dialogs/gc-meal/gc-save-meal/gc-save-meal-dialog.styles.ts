import {
  CSSProperties,
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../../shared/theme';

type ClassKey =
  'root'
| 'content'
| 'contentRoot'
| 'header'
| 'headerButton'
| 'clearMealNameButton'
| 'invisibleClearMealNameButton'
| 'title'
| 'scrollableContent'
| 'mealNameRoot'
| 'mealNameInput'
| 'foodRoot'
| 'foodContainer'
;

export type StyleProps = WithStyles<ClassKey>;

export const GcSaveMealStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { gridLine, spacing, contentWidth } = theme.custom;

    const styles: StyleRules<ClassKey> = {
      root: {
        flex: 1,
        height: '750px',
        maxWidth: '500px',
        overflowX: 'hidden',
      },
      content: {
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      },
      contentRoot: {
        width: '100%',
      },
      header: {
        backgroundColor: theme.palette.primary.main,
        borderBottom: '1px solid ' + theme.palette.grey[300],
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${gridLine}px 12px ${gridLine}px 12px`,
        height: '50px',
        color: theme.palette.grey[50],
      },
      headerButton: {
        height: '32px',
        width: '32px',
      },
      clearMealNameButton: {
        height: '32px',
        width: '32px',
        position: 'absolute',
        right: 14,
        top: 0,
        bottom: 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        color: theme.palette.grey[600],
      },
      invisibleClearMealNameButton: {
        display: 'none',
      },
      title: {
        marginTop: 'auto',
        marginBottom: 'auto',
      },
      scrollableContent: {
        margin: '0 auto',
        width: contentWidth.col2s + 'px',
      },
      mealNameRoot: {
        position: 'relative',
      },
      mealNameInput: {
        margin: 10,
        display: 'flex',
      },
      foodRoot: {
        padding: '0 6px 6px 6px',
      },
      foodContainer: {
        float: 'left',
        width: '50%',
        padding: spacing.small,
      },
    };
    return styles;
  };

export const viewStyle: CSSProperties = {
  overflow: 'hidden scroll',
  marginBottom: '0px',
};
