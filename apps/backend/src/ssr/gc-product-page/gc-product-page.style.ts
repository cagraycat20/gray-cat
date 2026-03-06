import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../types';
import { layoutParams as lp } from '../shared/layout-params';

export type ClassKey =
  | 'root'
  | 'imageRoot'
  | 'imageEl'
  | 'productName'
  | 'sectionDivider'
  | 'nutrientContainer'
  | 'nutrientName'
  | 'nutrientValues'
  | 'nutrientValuesSeparator'
  | 'nutrientValue'
  | 'nutrientsBar'
  | 'caloriesValueRow'
  | 'caloriesValue'
  | 'caloriesBar'
  | 'caloriesBarStartLabel'
  | 'caloriesBarEndLabel'
  | 'caloriesBarContent'
  | 'caloriesBarCaption'
  | 'nutrient'
  | 'caloriesFromNutrient'
  | 'preferableTimeToEat'
  | 'useOnProtoMealContainer'
  | 'useOnProtoMealButton'
  | 'buttonIcon'
  | 'hint'
  | 'similarProductsContainer'
  | 'similarProductsRoot'
  | 'noSimilarProducts'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const imageSize = {
  width: 450,
  height: 350,
};

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        padding: theme.custom.spacing.base,
        display: 'flex',
        flexDirection: 'column',
      },
      imageRoot: {
        maxWidth: imageSize.width,
        maxHeight: imageSize.height,
        alignSelf: 'center',
        border: '1px solid #75757526',
        display: 'flex',
        overflow: 'hidden',
      },
      imageEl: {
        width: '100%',
        height: '100%',
      },
      productName: {
        margin: '10px 0 5px',
      },
      sectionDivider: {
        width: '250px',
        alignSelf: 'center',
        margin: `0 0 ${theme.custom.spacing.base}px 0`,
      },
      nutrientContainer: {
        border: '2px solid white',
        margin: `0 0 ${theme.custom.spacing.xlarge}px 0`,
        borderRadius: '2px',
      },
      nutrientName: {
      },
      nutrientValues: {
        display: 'flex',
        padding: '15px 0',
        alignItems: 'center',
      },
      nutrientValuesSeparator: {
        borderRadius: '50%',
        height: '10px',
        width: '10px',
      },
      nutrientValue: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1rem',
        [theme.breakpoints.up(lp.mobileBreakdown)]: {
          fontSize: '1.2rem',
        },
      },
      nutrientsBar: {
        height: theme.custom.sizes.nutrientsBar,
        display: 'flex',
        border: '1px solid ' + theme.custom.colors.calories,
        borderRadius: '3px',
      },
      nutrient: {
        width: 50,
        maxWidth: 50,
        flex: 1,
        color: theme.palette.grey[50],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      },
      caloriesValueRow: {
        margin: `${theme.custom.spacing.xlarge}px 0 0 0`,
        display: 'flex',
      },
      caloriesValue: {
        marginLeft: '10px',
      },
      caloriesBar: {
        border: '1px solid grey',
        borderRadius: '3px',
        height: theme.custom.sizes.nutrientsBar,
        position: 'relative',
        marginBottom: '32px',
      },
      caloriesBarEndLabel: {
        top: '100%',
        right: 0,
        position: 'absolute',
      },
      caloriesBarStartLabel: {
        top: '100%',
        left: 0,
        position: 'absolute',
      },
      caloriesBarContent: {
        bottom: 0,
        top: 0,
        left: 0,
        position: 'absolute',
        borderRadius: '0 4px 4px 0px',
      },
      caloriesBarCaption: {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
      },
      caloriesFromNutrient: {
        alignSelf: 'center',
        paddingLeft: theme.custom.spacing.base,
      },
      preferableTimeToEat: {
        marginTop: theme.custom.spacing.base,
      },
      useOnProtoMealContainer: {
        textAlign: 'center',
      },
      useOnProtoMealButton: {
        margin: '16px auto 0',
        minWidth: '175px',
      },
      buttonIcon: {
        marginRight: '8px',
      },
      hint: {
        color: theme.palette.grey[500],
        maxWidth: '375px',
        margin: '16px auto',
      },
      similarProductsContainer: {
        marginTop: '24px',
        borderRight: '1px solid #8080803d',
        borderLeft: '1px solid #8080803d',
      },
      similarProductsRoot: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        marginTop: theme.custom.spacing.small,
        paddingBottom: theme.custom.spacing.small,
      },
      noSimilarProducts: {
        color: 'rgba(0, 0, 0, 0.47)',
        width: '100%',
        textAlign: 'center',
      },
    };
    return styles;
  };
