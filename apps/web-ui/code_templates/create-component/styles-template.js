module.exports = () => {
  return (
`import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

type ClassKey =
  | 'root'
  | 'content'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        height: '70px',
      },
      content: {
        backgroundColor: 'red',
        color: 'blue',
        fontSize: '16px',
        height: '100%',
        width: '100%',
      },
    };
    return styles;
  };
`)
}
