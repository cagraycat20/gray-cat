import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'root'
  | 'rootWidened'
  | 'header'
  | 'content'
  | 'name'
  | 'description'
  | 'nutrientsContainer'
  | 'nutrientLabelContainer'
  | 'nutrientLabelMarker'
  | 'input'
  | 'nutrientInput'
  | 'imageList'
  | 'selectedImage'
  | 'icon'
  | 'searchImageContainer'
  | 'onlyFreeImages'
  | 'inputSearchImage'
  | 'foundImageContainer'
  | 'copyProduct'
  | 'keyWordsContainer'
  | 'keyWord'
  | 'keyWordInput'
  | 'keyWordChipsContainer'
  | 'keyWordChipContainer'
  | 'commentContainer'
  | 'commentInput'
  | 'problemsDialog'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        width: '480px',
        minHeight: '568px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: '100%',
          height: '100%',
          maxHeight: 'unset',
          maxWidth: 'unset',
          margin: 0,
        },
      },
      rootWidened: {
        width: '720px',
        minHeight: '568px',
        maxWidth: '720px',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          margin: 0,
          maxHeight: '100%',
        },
      },
      header: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          padding: '10px 10px 10px',
        },
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          paddingBottom: 0,
        },
      },
      name: {
        marginTop: '10px !important',
      },
      description: {
        marginTop: '10px !important',
      },
      nutrientsContainer: {
        marginTop: '10px',
        display: 'flex',
        flexWrap: 'wrap',
      },
      nutrientLabelContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      nutrientLabelMarker: {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        marginRight: '5px',
      },
      input: {
        margin: '0px 4px',
        display: 'flex',
      },
      nutrientInput: {
        margin: '10px 3px 0',
        flex: '1 0 calc(50% - 6px)',
      },
      imageList: {
        maxHeight: 435,
      },
      selectedImage: {
        border: 'solid 3px blue',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
      searchImageContainer: {
        display: 'block',
      },
      onlyFreeImages: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginLeft: 20,
        },
      },
      inputSearchImage: {
        margin: '0px 34px',
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: '100%',
          margin: 0,
        },
      },
      foundImageContainer: {
        marginTop: 4,
        height: 435,
        [theme.breakpoints.down(breakpoints.col4s)]: {
          padding: '0 34px',
          display: 'flex',
        },
      },
      copyProduct: {
        marginRight: 'auto',
      },
      keyWordsContainer: {
        marginTop: 8,
        position: 'relative',
      },
      keyWord: {
        margin: 2,
      },
      keyWordInput: {
        width: '100%',
        marginTop: 10,
        marginLeft: 4,
        paddingRight: 8,
      },
      keyWordChipsContainer: {
        position: 'absolute',
        top: 19,
        left: 14,
        right: 14,
        maxHeight: 200,
        overflowY: 'auto',
      },
      keyWordChipContainer: {
        display: 'inline-flex',
      },
      commentContainer: {
        marginTop: 18,
        marginLeft: 4,
        marginRight: 4,
      },
      commentInput: {
        width: '100%',
      },
      problemsDialog: {
        margin: '20px',
      },
    };
    return styles;
  };
