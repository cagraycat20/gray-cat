import {
  StyleRules,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

type ClassKey =
  'root' |
  'header' |
  'content' |
  'headerColor' |
  'suggestionInput' |
  'suggestionSubmitButton' |
  'rightIcon'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme) => {
    const styles: StyleRules<ClassKey> = {
      root: {
        backgroundColor: theme.palette.grey[100],
        display: 'flex',
        flexDirection: 'column',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: theme.palette.primary.main,
      },
      headerColor: {
        color: theme.palette.grey[50],
      },
      content: {
        padding: '10px',
        minHeight: '400px',
        maxHeight: '600px',
        overflow: 'auto',
      },
      suggestionInput: {
        margin: '10px 20px 10px',
      },
      suggestionSubmitButton: {
        alignSelf: 'flex-end',
        width: '100px',
        margin: '0 20px 20px',
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
    };
    return styles;
  };
