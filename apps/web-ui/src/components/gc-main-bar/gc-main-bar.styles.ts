import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';
import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { menuHeader } from '../../assets';
import { ExtTheme } from '../../shared/theme';

type ClassKey =
  | 'toolBar'
  | 'titleContainer'
  | 'titleLogo'
  | 'button'
  | 'settingsContainer'
  | 'settingsContent'
  | '@keyframes loginButton-anim'
  | 'loginButton'
  | 'userInfoInMenu'
  | 'userInfoInMainMenu'
  | 'avatar'
  | 'avatarInMenu'
  | 'userMenuBottomGroup'
  | 'userMenuBottomLink'
  | 'mainMenuButtonIcon'
  | 'checkboxFormGroup'
  | 'bodyWeightUnitContainer'
  | 'bodyWeightUnitCaption'
  | 'bodyWeightUnitRadioGroup'
  | 'radio'
  | 'radioChecked'
  | 'priceSuffixInput'
  | 'mealsContainer'
  | 'mealsCaption'
  | 'meal'
  | 'uatEnv'
  | 'rcEnv'
  | 'devEnv'
  | 'feedbackButton'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const gcMainBarStylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { breakpoints, mainBarHeight } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      toolBar: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          minHeight: mainBarHeight.downCol4s,
          paddingRight: '8px',
          paddingLeft: '8px',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          minHeight: mainBarHeight.upCol4s,
        },
      },
      titleContainer: {
        [theme.breakpoints.down(breakpoints.col4s)]: {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        [theme.breakpoints.up(breakpoints.col4s)]: {
          marginLeft: 6,
          marginRight: 32,
        },
        textDecoration: 'unset',
      },
      titleLogo: {
        [theme.breakpoints.up(breakpoints.col4s)]: {
          width: 260,
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          width: 180,
        },
      },
      settingsContainer: {
        flex: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: '4px',
      },
      button: {
        [theme.breakpoints.up(breakpoints.col4s)]: {
          marginRight: '2px',
          width: '40px',
          height: '40px',
        },
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginRight: '1px',
          width: '32px',
          height: '32px',
        },
      },
      settingsContent: {
      },
      '@keyframes loginButton-anim': {
        '10%': {
          transform: 'scale(0.8, 0.8)',
        },
        '20%': {
          transform: 'scale(1.1, 1.1)',
        },
        '30%': {
          transform: 'unset',
        },
      },
      loginButton: {
        animationName: 'loginButton-anim',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-out',
        [theme.breakpoints.down(breakpoints.col4s)]: {
          marginRight: '-8px',
        },
      },
      userInfoInMenu: {
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid ' + theme.palette.grey[300],
      },
      userInfoInMainMenu: {
        backgroundImage: `url(${menuHeader})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '20px 15px',
      },
      avatar: {
        height: '32px',
        width: '32px',
        margin: '4px',
      },
      avatarInMenu: {
        height: '45px',
        width: '45px',
        marginRight: '10px',
      },
      userMenuBottomGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
        fontFamily: theme.typography.fontFamily,
      },
      userMenuBottomLink: {
        textDecoration: 'none',
        fontSize: '12px',
        color: theme.palette.text.secondary,
      },
      mainMenuButtonIcon: {
        marginRight: '10px !important',
        marginLeft: '-6px',
      },
      checkboxFormGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
      },
      bodyWeightUnitContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px 10px 0 10px',
      },
      bodyWeightUnitCaption: {
        width: '100%',
      },
      bodyWeightUnitRadioGroup: {
        width: '100%',
      },
      radio: {
        '&$radioChecked': {
          color: theme.palette.primary.main,
        },
      },
      radioChecked: {

      },
      priceSuffixInput: {
        margin: '10px 15px 10px 0px',
      },
      mealsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px',
        maxWidth: '240px',

      },
      mealsCaption: {
        width: '100%',
        marginBottom: '5px',
      },
      meal: {
        margin: '2px',
      },
      uatEnv: {
        backgroundColor: amber[400],
      },
      rcEnv: {
        backgroundColor: teal[400],
      },
      devEnv: {
        backgroundColor: green[400],
      },
      feedbackButton: {
        transform: 'rotate(-90deg)',
        position: 'fixed',
        right: -40,
        top: '45vh',
        zIndex: theme.zIndex.appBar,
      },
    };
    return styles;
  };
