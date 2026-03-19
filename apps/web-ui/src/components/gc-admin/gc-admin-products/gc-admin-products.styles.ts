import {
  CSSProperties,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

interface StyleSheet {
  root: CSSProperties;
  content: CSSProperties;
  protein: CSSProperties;
  fat: CSSProperties;
  carbs: CSSProperties;
  calories: CSSProperties;
  head: CSSProperties;
  body: CSSProperties;
  footer: CSSProperties;
  imageColumn: CSSProperties;
  descriptionColumn: CSSProperties;
  caloriesColumn: CSSProperties;
  fatColumn: CSSProperties;
  carbsColumn: CSSProperties;
  proteinColumn: CSSProperties;
  keyWordsColumn: CSSProperties;
  commentColumn: CSSProperties;
  nameColumn: CSSProperties;
  problemColumn: CSSProperties;
  cell: CSSProperties;
  cellWithoutBorderBottom: CSSProperties;
  filterField: CSSProperties;
  clearButton: CSSProperties;
  similarProductsContainer: CSSProperties;
  emptySimilarProductsContainer: CSSProperties;
  similarProductsRoot: CSSProperties;
  noSimilarProducts: CSSProperties;
  wide: CSSProperties;
  short: CSSProperties;
}

export type StyleProps = WithStyles<keyof StyleSheet>;

export const gcAdminProductsStylesCallback: StyleRulesCallback<keyof StyleSheet> = (theme: ExtTheme) => (
 {
  root: {
    overflow: 'auto',
    flex: 1,
  },
  content: {
    overflowX: 'auto',
  },
  head: {
    display: 'block',
  },
  body: {
    display: 'block',
    height: 'calc(100vh - 322px)',
    overflowY: 'auto',
  },
  footer: {
    display: 'block',
  },
  imageColumn: {
    minWidth: 100,
    maxWidth: 100,
    width: 100,
  },
  keyWordsColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  commentColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
  },
  nameColumn: {
    minWidth: 200,
    maxWidth: 200,
    width: 200,
  },
  descriptionColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
  },
  caloriesColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
  },
  fatColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
  },
  carbsColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
  },
  proteinColumn: {
    minWidth: 150,
    maxWidth: 150,
    width: 150,
  },
  problemColumn: {
    width: '100%',
  },
  cell: {
    padding: '4px 24px',
  },
  cellWithoutBorderBottom: {
    borderBottom: 'none',
  },
  filterField: {
    fontSize: 'small',
    width: '100%',
  },
  clearButton: {
    padding: 2,
  },
  similarProductsContainer: {
    position: 'relative',
    height: 115,
  },
  similarProductsRoot: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  emptySimilarProductsContainer: {
    height: 20,
  },
  noSimilarProducts: {
    color: 'rgba(0, 0, 0, 0.47)',
  },
  wide: {
    width: 'calc(100vw - 56px)',
  },
  short: {
    width: 'calc(100vw - 240px)',
  },
  ...theme.custom.nutrientStylesText,
});
