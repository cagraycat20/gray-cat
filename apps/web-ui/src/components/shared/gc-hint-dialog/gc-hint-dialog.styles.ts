import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared/theme';

type ClassKey =
  | 'root'
  | 'content'
  | 'img'
  | 'imgHidden'
  | 'text'
;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { fontSizes, spacing } = theme.custom;

    const styles: StyleRules<ClassKey> = {
      root: {
        flex: 1,
        height: '750px',
        maxWidth: '500px',
      },
      content: {
        flex: 1,
        display: 'flex',
        transition: theme.transitions.create('transform'),
        position: 'relative',
        alignItems: 'center',
      },
      img: {
        width: '100%',
        height: '100%',
        padding: 8,
        objectFit: 'contain',
        transition: theme.transitions.create('opacity', {duration: '0.5s'}),
      },
      imgHidden: {
        opacity: 0,
      },
      text: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontSize: fontSizes.xlarge,
        padding: spacing.base,
      },
    };

    return styles;
  };
