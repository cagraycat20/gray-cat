import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

type ClassKey =
  'root' |
  'logo' |
  'dish';

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        position: 'relative',
        display: 'flex',
      },
      logo: {
        width: '100%',
        height: '100%',
      },
      dish: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: '71%',
      },
    };
    return styles;
  };
