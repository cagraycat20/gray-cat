import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import {
  createMuiTheme,
  MuiThemeProvider,
  StyleRulesCallback,
  withStyles,
} from '@material-ui/core/styles';
import {
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import {
  CSSProperties,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import * as React from 'react';

const theSmallestWidth = 320;

// all elements aligned as grid with def. line size
const halfOfGridLine = 4;
const gridLine = halfOfGridLine * 2;
// elements in product list aligned as grid with def. line size
const prodListGridLine = 10;
// width of fav. if in left side position
const favoritesBarWidth = theSmallestWidth;
// gcDialog margin
const dialogMargin = 40;

const productDialogPadding = 20;

const smallNutrientsRootHeight = 24;
const normalNutrientsRootHeight = 32;
const smallNutrientsRootPadding = 4;
const normalNutrientsRootPadding = 5;
const smallNutrientContainerWidth = 31.5;
const normalNutrientContainerWidth = 51;

const mainBarHeight = {
  upCol4s: 64,
  downCol4s: 56,
};

const dayHeaderHeight = 68;

function cardNutrientsRoot(small: boolean): CSSProperties {
  return ({
    height: (small ? smallNutrientsRootHeight : normalNutrientsRootHeight) + 'px',
    display: 'flex',
    paddingLeft: (small
      ? smallNutrientsRootPadding
      : normalNutrientsRootPadding) + 'px',
    alignItems: 'center',
    backgroundColor: '#fff',
  });
}

function cardNutrientContainer(small: boolean): CSSProperties {
  return ({
    width: (small
      ? smallNutrientContainerWidth
      : normalNutrientContainerWidth) + 'px',
    height: (small ? 16 : 24) + 'px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '1px',
    justifyContent: 'center',
    marginRight: (small
      ? smallNutrientsRootPadding
      : normalNutrientsRootPadding) + 'px',
  });
}

function cardNutrientValue(small: boolean): CSSProperties {
  return ({
    fontSize:  (small ? 0.675 : 0.875) + 'rem',
    color: '#fff',
    lineHeight: 'normal',
  });
}

const card = {
  borderRadius: 3,
  small: {
    width: 146,
    height: 100,
    avatar: 18,
    menuButton: 20,
    nutrientsRootHeight: smallNutrientsRootHeight,
    nutrientsRootPadding: smallNutrientsRootPadding,
    nutrientContainerWidth: smallNutrientContainerWidth,
    nutrients: {
      nutrientsRoot: cardNutrientsRoot(true),
      nutrientContainer: cardNutrientContainer(true),
      nutrientValue: cardNutrientValue(true),
    },
  },
  normal: {
    width: 229,
    height: 140,
    avatar: 22,
    menuButton: 24,
    nutrientsRootHeight: normalNutrientsRootHeight,
    nutrientsRootPadding: normalNutrientsRootPadding,
    nutrientContainerWidth: normalNutrientContainerWidth,
    nutrients: {
      nutrientsRoot: cardNutrientsRoot(false),
      nutrientContainer: cardNutrientContainer(false),
      nutrientValue: cardNutrientValue(false),
    },
  },
};

function contentWidth(columns: number, smallCards: boolean, gridLineWidth: number = gridLine): number {
  return ((smallCards ? card.small.width : card.normal.width) + gridLineWidth) * columns;
}

function breakPointValue(columns: number, smallCards: boolean): number {
  return (
    gridLine + contentWidth(columns, smallCards) +
      (smallCards ? 0 : favoritesBarWidth)
  );
}

export const colors = {
  protein: '#f28585', // '#E06666',
  fat: '#e4c463', // '#F1C232',
  carbs: '#7caa7e', // green[600],
  calories: '#999999',

  weight: blue[600],

  productListBackground: '#484d5a',
  productListButton: '#5d5d5d',
  productListButtonHover: '#737373',

  mainColor: blue,

  nutrientNameRowBackground: '#0000001a',
};

export const sizes = {
  nutrientsBar: 40,
};

export const fontSizes = {
  xsmall: 10,
  small: 12,
  base: 14,
  large: 16,
  xlarge: 18,
};

export const spacing = {
  xsmall: 2,
  small: 4,
  base: 8,
  large: 12,
  xlarge: 16,
  xxlarge: 20,
  xxxlarge: 24,
};

export const themeCustomData = {
  custom: {
    nutrientStylesText: {
      protein: {
        color: colors.protein,
      },
      fat: {
        color: colors.fat,
      },
      carbs: {
        color: colors.carbs,
      },
      calories: {
        color: colors.calories,
      },
    },

    nutrientProps: {
      protein: { backgroundColor: colors.protein },
      fat: {backgroundColor: colors.fat},
      carbs: {backgroundColor: colors.carbs},
      calories: {backgroundColor: colors.calories},
    },

    emptyNutrientStyles: {
      protein: { backgroundColor: colors.protein  + '60'},
      fat: {backgroundColor: colors.fat + '60'},
      carbs: {backgroundColor: colors.carbs + '60'},
      calories: {backgroundColor: colors.calories + '60'},
    },

    breakpoints: {
      col2s: breakPointValue(2, true),
      col4s: breakPointValue(4, true),
      col4sWithFavorites: breakPointValue(4, true) + favoritesBarWidth,
      col4: breakPointValue(4, false),
      col5: breakPointValue(5, false),
    },

    contentWidth: {
      col2s: contentWidth(2, true),
      col4s: contentWidth(4, true),
      col4: contentWidth(4, false),
      col5: contentWidth(5, false),
      get: contentWidth,
    },

    productList: {
      gridLine: prodListGridLine,
      backgroundColor: colors.productListBackground,
      buttonColor: colors.productListButton,
      buttonHoverColor: colors.productListButtonHover,
      breakdownPadding: 10,
    },

    gridLine,
    halfOfGridLine,
    favoritesBarWidth,
    card,
    minScreenSize: 320,
    mainBarHeight,
    dayHeaderHeight,
    dialogMargin,
    productDialogPadding,

    colors: {
      ...colors,
      dndOver: blue[100],
    },

    sizes: {
      ...sizes,
    },

    spacing: {
      ...spacing,
    },

    fontSizes: {
      ...fontSizes,
    },
  },
};

export type  ExtTheme = Theme & typeof themeCustomData;

export type WithStylesAndTheme<ClassKey extends string> =
  WithStyles<ClassKey> & {theme: ExtTheme};

/* global_classes */
export const globalClasses = {
  gcWhiteText: 'gcWhiteText',
  gcGreyText: 'gcGreyText',
  gcAlignSelfCenter: 'gcAlignSelfCenter',
  gcButtonIcon: 'gcButtonIcon',

  gcFontXsmall: 'gcFontXsmall',
  gcFontSmall: 'gcFontSmall',
  gcFontBase: 'gcFontBase',
  gcFontLarge: 'gcFontLarge',
  gcFontXlarge: 'gcFontXlarge',

  gcNutrientCaptionRow: 'gcNutrientCaptionRow',
  gcProteinBackgroundColor: 'gcProteinBackgroundColor',
  gcFatBackgroundColor: 'gcFatBackgroundColor',
  gcCarbsBackgroundColor: 'gcCarbsBackgroundColor',
  gcCaloriesBackgroundColor: 'gcCaloriesBackgroundColor',
  gcEmptyProteinBackgroundColor: 'gcEmptyProteinBackgroundColor',
  gcEmptyFatBackgroundColor: 'gcEmptyFatBackgroundColor',
  gcEmptyCarbsBackgroundColor: 'gcEmptyCarbsBackgroundColor',
  gcEmptyCaloriesBackgroundColor: 'gcEmptyCaloriesBackgroundColor',
};

export const nutrientClasses = {
  protein: globalClasses.gcProteinBackgroundColor,
  fat: globalClasses.gcFatBackgroundColor,
  carbs: globalClasses.gcCarbsBackgroundColor,
  calories: globalClasses.gcCaloriesBackgroundColor,
};

export const emptyNutrientClasses = {
  protein: globalClasses.gcEmptyProteinBackgroundColor,
  fat: globalClasses.gcEmptyFatBackgroundColor,
  carbs: globalClasses.gcEmptyCarbsBackgroundColor,
  calories: globalClasses.gcEmptyCaloriesBackgroundColor,
};

const globalClassesStyles:
  StyleRulesCallback<keyof typeof globalClasses> = (currentTheme: ExtTheme) => {
    return {
      gcWhiteText: {
        color: '#fff',
      },
      gcGreyText: {
        color: grey[500],
      },
      gcAlignSelfCenter: {
        alignSelf: 'center',
      },
      gcButtonIcon: {
        marginRight: '5px',
      },
      gcNutrientCaptionRow: {
        backgroundColor: colors.nutrientNameRowBackground,
        fontWeight: 100,
      },
      gcFontXsmall: {
        fontSize: fontSizes.xsmall + 'px',
      },
      gcFontSmall: {
        fontSize: fontSizes.small + 'px',
      },
      gcFontBase: {
        fontSize: fontSizes.base + 'px',
      },
      gcFontLarge: {
        fontSize: fontSizes.large + 'px',
      },
      gcFontXlarge: {
        fontSize: fontSizes.xlarge + 'px',
      },
      gcProteinBackgroundColor: currentTheme.custom.nutrientProps.protein,
      gcFatBackgroundColor: currentTheme.custom.nutrientProps.fat,
      gcCarbsBackgroundColor: currentTheme.custom.nutrientProps.carbs,
      gcCaloriesBackgroundColor: currentTheme.custom.nutrientProps.calories,

      gcEmptyProteinBackgroundColor: currentTheme.custom.emptyNutrientStyles.protein,
      gcEmptyFatBackgroundColor: currentTheme.custom.emptyNutrientStyles.fat,
      gcEmptyCarbsBackgroundColor: currentTheme.custom.emptyNutrientStyles.carbs,
      gcEmptyCaloriesBackgroundColor: currentTheme.custom.emptyNutrientStyles.calories,
    };
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[400],
      main: blue[600],
      dark: blue[800],
    },
    secondary: {
      light: deepOrange[400],
      main: deepOrange[600],
      dark: deepOrange[800],
    },
  },
  typography: {
    useNextVariants: true,
  },
  ...themeCustomData,
} as ThemeOptions);

export const styleCallback = (currentTheme: ExtTheme) => {
  const classes = globalClassesStyles(currentTheme);
  const result: Record<string, CSSProperties> = {};
  for (const key in classes) {
    if (classes.hasOwnProperty(key)) {
      // tslint:disable-next-line: no-any
      result['@global .' + key] = (classes as any)[key];
    }
  }
  return result;
};

export function applyTheme(Component: React.ComponentType) {
  return (props: object) => {
    const StyleComponent = withStyles(styleCallback)(Component);
    return (
      <MuiThemeProvider theme={theme}>
        <StyleComponent {...props} />
      </MuiThemeProvider>
    );
  };
}
