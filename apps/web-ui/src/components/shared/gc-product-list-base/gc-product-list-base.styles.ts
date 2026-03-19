import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'topAreaContainer'
  | 'menuSubheader'
  | 'menuImage'
  | 'dialogRoot'
  | 'dialogTopArea'
  | 'dialogFilterContainer'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { productList: { gridLine, breakdownPadding, backgroundColor },
      card, contentWidth, favoritesBarWidth } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: favoritesBarWidth + 'px',
        backgroundColor,
      },
      topAreaContainer: {
        // gridLine - 1 to fit minimal screen (320) with 2 columns
        maxWidth: (card.small.width + gridLine - 1) * 3 + gridLine + 'px',
        [theme.breakpoints.down(
          contentWidth.get(3, true) + breakdownPadding * 2 + gridLine)
        ]: {
          maxWidth: contentWidth.get(2, true, gridLine) + gridLine + 'px',
        },
      },
      menuSubheader: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid ' + theme.palette.grey[200],
      },
      menuImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        margin: '7px 10px 5px -8px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      dialogRoot: {
        flex: 1,
      },
      dialogTopArea: {
        width: '100%',
        alignSelf: 'center',
        paddingRight: gridLine + 'px',
        marginLeft: '-2px',
      },
      dialogFilterContainer: {
        width: 'unset !important',
      },
    };
    return styles;
  };
