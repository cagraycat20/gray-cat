import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import {
  ExtTheme,
} from '../../../shared/theme';

type ClassKey =
  'root' |
  'background' |
  'content' |
  'summary' |
  'summaryItem' |
  'summaryAmPmColumn' |
  'summaryAmPm' |
  'summaryValue' |
  'summaryItemSelected' |
  'footer' |
  'footerButton'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const styles: StyleRules<ClassKey> = {
      root:  {
      },
      content:  {
        minWidth: '300px',
      },
      background: {
        backgroundColor: '#7c7c7c57',
      },
      summary: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.dark,
        height: '80px',
        paddingLeft: '40px',
      },
      summaryItem: {
        color: theme.palette.grey[50],
        fontSize: '50px',
        opacity: 0.4,
      },
      summaryAmPmColumn: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '12px',
      },
      summaryAmPm: {
        color: theme.palette.grey[50],
        fontSize: '20px',
        lineHeight: 'unset',
        cursor: 'pointer',
        opacity: 0.4,
      },
      summaryValue: {
        cursor: 'pointer',
        minWidth: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      summaryItemSelected: {
        opacity: 1,
      },
      footer: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '0 10px 10px 0',
      },
      footerButton: {
        marginLeft: '5px',
        minWidth: '70px',
      },
    };
    return styles;
  };
