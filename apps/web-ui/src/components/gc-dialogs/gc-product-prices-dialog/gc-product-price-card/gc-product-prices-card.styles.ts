import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../../shared/theme';

type ClassKey =
  | 'root'
  | 'content'
  | 'img'
  | 'infoContainer'
  | 'nameRow'
  | 'name'
  | 'weightRow'
  | 'inputContainer'
  | 'input'
  | 'inputSuffix'
  | 'nutrientsRow'
  | 'nutrient'
  | 'nutrientPriceValueContainer'
  | 'nutrientPriceValueSuffix'
  | 'nutrientPriceSuffix'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { mainColor } = theme.custom.colors;
    const styles: StyleRules<ClassKey> = {
      root: {
        height: '137px',
        border: '1px solid #cac5c5',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        borderRadius: '3px',
      },
      content: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        paddingBottom: '5px',
      },
      img: {
        objectFit: 'cover',
        width: '100px',
        minWidth: '100px',
        marginRight: '5px',
      },
      infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
      },
      nameRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 0 5px 5px',
      },
      name: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      weightRow: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainColor[50],
      },
      inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: mainColor[100],
        padding: '5px',
        margin: '0 10px',
        flex: 1,
        height: '45px',
      },
      input: {
        border: 'none',
        textAlign: 'center',
        alignSelf: 'stretch',
        outline: 'none',
        width: '100%',
        '&::selection': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
        },
      },
      inputSuffix: {
        lineHeight: 1.9,
      },
      nutrientsRow: {
        display: 'flex',
        height: '37px',
        paddingTop: '5px',
        borderTop: '1px solid #0000001c',
        margin: '0 -2.5px',
      },
      nutrient: {
        flex: 1,
        margin: '0 2.5px',
        color: theme.palette.grey[50],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        width: '0',
      },
      nutrientPriceValueContainer: {
        height: '18px',
        display: 'flex',
        alignItems: 'baseline',
      },
      nutrientPriceValueSuffix: {
        fontSize: '0.5rem',
        opacity: 0.7,
        marginLeft: '2px',
      },
      nutrientPriceSuffix: {
        lineHeight: '12px',
        fontSize: '10px',
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#ffffff8c',
        backgroundColor: '#00000021',
        flex: 1,
      },
    };
    return styles;
  };
