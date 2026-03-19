import IconButton, {
  IconButtonClassKey,
} from '@material-ui/core/IconButton';
import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const stylesCallback:
  StyleRulesCallback<IconButtonClassKey> = () => {
    const styles: StyleRules<IconButtonClassKey> = {
      root: {
        padding: '0',
      },
      colorInherit: {},
      colorPrimary: {},
      colorSecondary: {},
      disabled: {},
      label: {},
    };
    return styles;
  };

export const GcClickableItem =
  withStyles(stylesCallback)(IconButton);
