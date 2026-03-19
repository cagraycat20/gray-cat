import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../shared/theme';

type ClassKey =
  | 'filterContainer'
  | 'filterContainerVisible'
  | 'filterInputContainer'
  | 'filterInputIcon'
  | 'filterInput'
  | 'filterClearIcon'
  | 'newProductButton'
  | 'newProductIcon'
  | 'filterNutrientContainer'
  | 'filterNutrient'
  | 'filterNutrientVisible'
  | 'filterNutrientSelected'
  | 'filterNutrientMarker'
  | 'filterNutrientText'
  | 'filterNutrientTextUnselected'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { productList: { gridLine, buttonColor, buttonHoverColor}} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      filterContainer: {
        opacity: 0,
        pointerEvents: 'none',
        position: 'relative',
        // gridLine - 1 to fit minimal screen (320) with 2 columns
        marginLeft: `${gridLine - 1}px`,
        overflow: 'hidden',
        height: '0px',
        display: 'flex',
        flexDirection: 'column',
        transform: 'translateX(calc(-100% - 14px))',
        transition:
          theme.transitions.create('transform'),
        width: `calc(100% - ${2 * gridLine - 1}px)`,
      },
      filterContainerVisible: {
        opacity: 1,
        pointerEvents: 'auto',
        height: '65px',
        marginBottom: gridLine - 2 + 'px',
        transform: 'unset',
        transition:
          theme.transitions.create('transform'),
      },
      filterInputContainer: {
        position: 'relative',
        backgroundColor: '#fff',
        height: '30px',
        borderRadius: '2px',
        marginRight: '50px',
      },
      filterInputIcon: {
        position: 'absolute',
        left: '5px',
        top: '3px',
        fontSize: '26px',
        color: theme.palette.primary.dark,
      },
      filterInput: {
        backgroundColor: 'unset',
        border: 'unset',
        width: '100%',
        height: '100%',
        paddingLeft: '35px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        '&:focus': {
          outline: 'unset',
        },
        '&::placeholder': {
          color: theme.palette.grey[400],
        },
      },
      filterClearIcon: {
        position: 'absolute',
        right: '5px',
        top: '3px',
        fontSize: '26px',
        color: '#b76666',
        '&:hover': {
          color: '#f00',
        },
        cursor: 'pointer',
      },
      newProductButton: {
        position: 'absolute',
        right: '1px',
        width: '40px',
        height: '30px',
        borderRadius: '2px',
        boxShadow: '2px 2px 2px #3f3f3f',
        backgroundColor: buttonColor,
        '&:hover': {
          backgroundColor: buttonHoverColor,
        },
      },
      newProductIcon: {
        color: theme.palette.grey[50],
      },
      filterNutrientContainer: {
        display: 'flex',
        flex: 1,
        userSelect: 'none',
        MozUserSelect: 'none',
        overflow: 'hidden',
        paddingBottom: '2px',
      },
      filterNutrient: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '2px',
        cursor: 'pointer',
        boxShadow: '2px 2px 2px #3f3f3f',
        transform: `translateY(calc(-100% - ${gridLine}px))`,
        margin: `${gridLine}px ${gridLine}px 0 0`,
        '&:last-child': {
          marginRight: '1px',
        },
        backgroundColor: buttonColor,
        '&:hover': {
          backgroundColor: buttonHoverColor,
        },
      },
      filterNutrientVisible: {
        transform: 'unset',
      },
      filterNutrientSelected: {
        backgroundColor: '#4a4a4a',
        boxShadow: 'inset 0px 0px 15px #222',
      },
      filterNutrientMarker: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '5px',
      },
      filterNutrientText: {
        lineHeight: 'unset',
        color: theme.palette.grey[100],
      },
      filterNutrientTextUnselected: {
        color: theme.palette.grey[500],
      },
    };
    return styles;
  };
