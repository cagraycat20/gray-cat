import { StyleRules, StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { ExtTheme } from '../../../shared';

type ClassKey =
  | 'paper'
  | 'head'
  | 'body'
  | 'footer'
  | 'filterField'
  | 'clearButton'
  | 'userIdColumn'
  | 'creationTimeColumn'
  | 'lastUpdateTimeColumn'
  | 'isAdminColumn'
  | 'isAdminFilter'
  | 'filterText'
  | 'datePickerTo'
  | 'progressRoot'
  | 'progress'
  ;

export type StyleProps = WithStyles<ClassKey>;

export const stylesCallback: StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
  const { fontSizes, spacing } = theme.custom;

  const styles: StyleRules<ClassKey> = {
    paper: {
      height: '100%',
    },
    head: {
      display: 'block',
    },
    body: {
      display: 'block',
      height: 'calc(100vh - 230px)',
      overflowY: 'auto',
    },
    footer: {
      display: 'block',
    },
    filterField: {
      fontSize: 'small',
      width: '100%',
    },
    clearButton: {
      padding: 2,
    },
    userIdColumn: {
      width: '100%',
    },
    creationTimeColumn: {
      width: 200,
      minWidth: 200,
      maxWidth: 200,
    },
    lastUpdateTimeColumn: {
      width: 200,
      minWidth: 200,
      maxWidth: 200,
    },
    isAdminColumn: {
      width: 100,
      minWidth: 100,
      maxWidth: 100,
    },
    isAdminFilter: {
      paddingLeft: 16,
    },
    filterText: {
      fontSize: fontSizes.small,
      color: 'rgba(0, 0, 0, 0.5)',
    },
    datePickerTo: {
      marginTop: spacing.small,
    },
    progressRoot: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    progress: {
      alignSelf: 'center',
    },
  };

  return styles;
};
