import {
  CSSProperties,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

interface StyleSheet {
  root: CSSProperties;
  input: CSSProperties;
  button: CSSProperties;
  buttonIcon: CSSProperties;
  rightButton: CSSProperties;
  leftButton: CSSProperties;
}

export type StyleProps = WithStyles<keyof StyleSheet>;

export const stylesCallback:
  StyleRulesCallback<keyof StyleSheet> = (theme) => {
    const styles: StyleSheet = {
      root: {
        flex: 1,
        display: 'flex',
        minWidth: '0px',
        alignItems: 'flex-end',
      },
      input: {
        flex: 1,
      },
      button: {
        height: '24px',
        width: '24px',
      },
      buttonIcon: {
        fontSize: '21px',
      },
      leftButton: {
        margin: '0px 9px 4px 0px !important',
      },
      rightButton: {
        margin: '0px 0px 4px 9px !important',
      },
    };
    return styles;
  };
