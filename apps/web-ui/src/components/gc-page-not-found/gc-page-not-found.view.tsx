import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/HomeRounded';
import * as React from 'react';
import { notFound } from '../../assets';
import {
  StyleProps,
  stylesCallback,
} from './gc-page-not-found.styles';

class GcPageNotFoundView extends React.PureComponent<StyleProps> {

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
        <div className={classes.root}>
          <Typography variant="h4" className={classes.title}>
            Nothing here!
          </Typography>
          <img className={classes.image} alt="404" src={notFound} />
          <Typography variant="body2" className={classes.footnote}>
            <span className={classes.asterisk}>*</span>
            This page contains zero calories
          </Typography>
        </div>
        </div>
        <Button
          href="/"
          variant="contained"
          className={classes.goToMainPageButton}
        >
          <HomeIcon className={classes.goToMainPageButtonIcon} />
            Go to main page
        </Button>
      </div>
    );
  }
}

export const GcPageNotFound =
  withStyles(stylesCallback)(GcPageNotFoundView);
