import {
  CSSProperties,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

interface StyleSheet {
  root: CSSProperties;
  item: CSSProperties;
}

export type StyleProps = WithStyles<keyof StyleSheet>;

export const stylesCallback:
  StyleRulesCallback<keyof StyleSheet> = (theme) => {
    const styles: StyleSheet = {
      root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      item: {
        flex: 'none',
        minHeight: '50px',
      },
    };
    return styles;
  };
