import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'input'
  | 'imageContainer'
  | 'imageContainerHover'
  | 'imageContainerHoverText'
  | 'imageContainerHoverButtonText'
  | 'mobileButtonContainer'
  | 'textColor'
  | 'textLightColor'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      input: {
        margin: '0px 4px',
        display: 'flex',
      },
      imageContainer: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width:  '170px',
          height: '90px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width:  '270px',
          height: '150px',
        },
        margin: '25px auto',
        position: 'relative',
        alignSelf: 'center',
        borderRadius: '4px',
        backgroundSize: 'cover',
        boxShadow: '#80808054 0px 0px 3px',
        '&:hover > *:first-child': {
          opacity: 1,
        },
      },
      imageContainerHover: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        opacity: 0,
        transition: theme.transitions.create('opacity'),
        backgroundColor: '#fffefebd',
        border: '2px dashed ' + theme.palette.grey[400],
        padding: '10px 15px',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        cursor: 'pointer',
      },
      imageContainerHoverText: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          fontSize: '0.9rem',
        },
      },
      imageContainerHoverButtonText: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          fontSize: '0.575rem',
          lineHeight: '0.8rem',
        },
      },
      mobileButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
      },
      textColor: {
        color: '#525252',
      },
      textLightColor: {
        color: theme.palette.grey[500],
      },
    };
    return styles;
  };
