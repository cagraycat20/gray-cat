import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
  WithStylesAndTheme,
} from '../../shared/theme';

type ClassKey =
  'dropMarker' |
  '@keyframes drop-marker' |
  'card' |
  'mediaContainer' |
  'media' |
  'nameRow' |
  'name' |
  'nutrients' |
  'nutrientsVisible' |
  'nutrientsRoot' |
  'nutrientContainer' |
  'nutrientValue';

export type StyleProps = WithStylesAndTheme<ClassKey>;

const nameRowHeight = 25;

export const gcProductCardStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { card } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      dropMarker: {
        position: 'absolute',
        width: '3px',
        top: '-1px',
        bottom: '-1px',
        left: '-6.5px',
        animationName: 'drop-marker',
        animationDuration: '800ms',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
      },
      '@keyframes drop-marker': {
        from: {
          backgroundColor: '#6c819e',
        },
        to: {
          backgroundColor: theme.palette.grey[200],
        },
      },
      card: {
        height: card.small.height + 'px',
        width: card.small.width + 'px',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: card.borderRadius + 'px',
        '&:hover > *:first-child': {
          backgroundColor: '#c3e5ff',
        },
      },
      mediaContainer: {
        flex: 1,
        position: 'relative',
        height: card.small.height - nameRowHeight + 'px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#ccc',
      },
      media: {
        height: card.small.height - nameRowHeight + 'px',
      },
      nameRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        transition: theme.transitions.create('background-color'),
        height: nameRowHeight + 'px',
      },
      name: {
        overflow: 'hidden',
        color: '#444',
        alignSelf: 'center',
      },
      nutrients: {
        position: 'absolute',
        bottom: '-' + card.small.nutrients.nutrientsRoot.height,
        left: '0px',
        right: '0px',
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.create('transform'),
      },
      nutrientsVisible: {
        transform: `translateY(-${card.small.nutrients.nutrientsRoot.height})`,
      },
      nutrientsRoot: {
        ...card.small.nutrients.nutrientsRoot,
      },
      nutrientContainer: {
        ...card.small.nutrients.nutrientContainer,
      },
      nutrientValue: {
        ...card.small.nutrients.nutrientValue,
      },
    };
    return styles;
  };
