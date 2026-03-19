import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../shared/theme';

export type ClassKey =
  | 'dropArea'
  | 'dropAreaContent'
  | 'dropAreaText'
  | 'dropAreaIcon'
  | 'dropAreaIconOver'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { productList: {backgroundColor}} = theme.custom;
    const styles: StyleRules<ClassKey> = {
      dropArea: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        backgroundColor,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.create('opacity'),
      },
      dropAreaContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        border: '2px dashed #b7b7b7',
        borderRadius: '5px',
        transition: theme.transitions.create('backgroundColor'),
      },
      dropAreaText: {
        color: theme.palette.grey[400],
      },
      dropAreaIcon: {
        color: theme.palette.grey[400],
        fontSize: '100px',
        transform: 'scale(0.8, 0.8)',
        transition: theme.transitions.create('transform'),
      },
      dropAreaIconOver: {
        transform: 'scale(1, 1)',
      },
    };
    return styles;
  };
