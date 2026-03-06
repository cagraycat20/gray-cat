import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../types';

export type ClassKey =
  | 'root'
  | 'title'
  | 'searchContainer'
  | 'searchField'
  | 'searchInput'
  | 'productLink'
  | 'productRoot'
  | 'productImageContainer'
  | 'productImage'
  | 'productName'
  | 'nutrientsContainer'
  | 'nutrient'
  | 'nutrientCaption'
  | 'nutrientValueContainer'
  | 'nutrientValue'
  | 'nutrientValueSuffix'
  | 'divider'
  | 'paginationContainer'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

const mobileBreakDown = 600;
export const imageSize = {
  mobile: {
    height: 180,
  },
  normal: {
    height: 90,
    width: 160,
  },
};
const nutrientHeightSmall = 35;
const nutrientHeight = 44;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { spacing, fontSizes } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
      title: {
        color: theme.palette.grey[800],
        padding: '10px',
      },
      searchContainer: {
        display: 'flex',
        padding: theme.custom.spacing.base,
        alignItems: 'center',
        backgroundColor: '#fff,',
        justifyContent: 'flex-end',
      },
      searchField: {
        marginRight: theme.custom.spacing.base,
      },
      searchInput: {
        padding: '8px 14px 8px 0',
      },
      productLink: {
        textDecoration: 'none',
        transition: theme.transitions.create('background-color'),
        ['&:hover']: {
          backgroundColor: '#42a5f54a',
        },
        [theme.breakpoints.up(mobileBreakDown)]: {
          paddingLeft: theme.custom.spacing.base,
          paddingTop: theme.custom.spacing.base,
        },
      },
      productRoot: {
        display: 'flex',
        position: 'relative',
        height: imageSize.mobile.height,
        [theme.breakpoints.up(mobileBreakDown)]: {
          height: imageSize.normal.height,
        },
      },
      productImageContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        [theme.breakpoints.down(mobileBreakDown)]: {
          right: 0,
        },
      },
      productImage: {
        backgroundColor: '#fff',
        [theme.breakpoints.down(mobileBreakDown)]: {
          height: '100%',
          width: '100%',
        },
        [theme.breakpoints.up(mobileBreakDown)]: {
          maxHeight: imageSize.normal.height,
          maxWidth: imageSize.normal.width,
        },
      },
      productName: {
        position: 'absolute',
        [theme.breakpoints.down(mobileBreakDown)]: {
          top: spacing.base,
          left: spacing.base,
          maxWidth: `calc(100% - ${4 * spacing.base}px)`,
          color: '#fff',
          backgroundColor: '#00000099',
          padding: '4px 8px',
          borderRadius: '2px',
        },
        [theme.breakpoints.up(mobileBreakDown)]: {
          top: 0,
          left: imageSize.normal.width + theme.custom.spacing.base,
          right: 0,
          lineHeight: '1.6',
          fontSize: fontSizes.xlarge,
        },
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: fontSizes.large,
        lineHeight: 1,
      },
      nutrientsContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        [theme.breakpoints.down(mobileBreakDown)]: {
          backgroundColor: '#0000007a',
          padding: `${spacing.base}px 0 ${spacing.base}px ${spacing.base}px`,
        },
        [theme.breakpoints.up(mobileBreakDown)]: {
          left: imageSize.normal.width + spacing.base,
        },
      },
      nutrient: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginRight: spacing.base,
        borderRadius: 2,
        minWidth: 50,
        height: nutrientHeightSmall,
        [theme.breakpoints.up(mobileBreakDown)]: {
          height: nutrientHeight,
        },
      },
      nutrientCaption: {
        backgroundColor: '#00000024',
        color: '#ffffff9c',
        fontSize: fontSizes.small,
        [theme.breakpoints.up(mobileBreakDown)]: {
          fontSize: fontSizes.base,
        },
      },
      nutrientValueContainer: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        fontSize: fontSizes.base,
        [theme.breakpoints.up(mobileBreakDown)]: {
          fontSize: fontSizes.large,
        },
      },
      nutrientValue: {
        lineHeight: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1em',
      },
      nutrientValueSuffix: {
        color: '#ffffff9c',
        fontSize: '0.8em',
        alignSelf: 'center',
        padding: '3px 0 0 2px',
        lineHeight: 1,
      },
      divider: {
        marginTop: theme.custom.spacing.base,
        marginRight: theme.custom.spacing.base,
      },
      paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.custom.spacing.base,
        color: 'rgba(0, 0, 0, 0.54)',
      },
    };
    return styles;
  };
