import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../../../shared/theme';

type ClassKey =
  'root'
| 'card'
| 'header'
| 'name'
| 'media'
| 'weightRoot'
| 'weightValue'
| 'weightSuffix'
| 'scrollableContentRoot'
| 'scrollableContent'
| 'food'
| 'selected'
| 'unselected'
;

export type StyleProps = WithStyles<ClassKey>;

export const GcMealCardStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { card, breakpoints, spacing, fontSizes } = theme.custom;

    const styles: StyleRules<ClassKey> = {
      root:  {
        position: 'relative',
      },
      card: {
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: card.borderRadius + 'px',
        marginTop: 10,
        padding: spacing.small,
        '&:focus': {
          outline: 'unset',
        },
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(breakpoints.col4)]: {
          padding: '3px 4px 3px 5px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          padding: '4px 4px 4px 8px',
        },
      },
      name: {
        overflow: 'hidden',
        marginLeft: spacing.small,
        fontSize: fontSizes.large,
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: fontSizes.small,
          fontWeight: 500,
        },
      },
      media: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        transition: theme.transitions.create('opacity'),
      },
      weightRoot: {
        position: 'absolute',
        right: spacing.small,
        bottom: spacing.small,
        width: 67,
        height: 20,
        borderRadius: 2,
        border: '1px solid #ffffff33',
        backgroundColor: 'rgba(50, 50, 50, 0.8)',
      },
      weightValue: {
        flex: 1,
        textAlign: 'center',
        border: 'unset',
        padding: '0',
        backgroundColor: 'unset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: fontSizes.small,
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: card.normal.nutrients.nutrientValue.fontSize,
        },
      },
      weightSuffix: {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: '0px',
        color: '#fafafaa3',
        lineHeight: 1.4,
        right: '1px',
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: '10px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: '11px',
        },
      },
      scrollableContentRoot: {
        height: 114,
      },
      scrollableContent: {
        display: 'flex',
      },
      food: {
        width: 145,
        minWidth: 145,
        margin: spacing.small,
      },
      selected: {
        border: `2px solid ${theme.palette.primary.main}`,
      },
      unselected: {
        border: '2px solid transparent',
      },
    };
    return styles;
  };
