import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { notFound } from '../assets';
import { GcPage } from '../shared/gc-page/gc-page.view';
import { StyleProps, stylesCallback } from './gc-page-not-found.style';

function renderContent(classes: StyleProps['classes']) {
  return (
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
  );
}

const GcPageNotFoundView: React.SFC<StyleProps> = ({ classes }) => {
  return (
    <GcPage
      title="ProtoMeal - 404"
      content={renderContent(classes)}
    />
  );
};

export const GcPageNotFound =
  withStyles(stylesCallback, { withTheme: true })(GcPageNotFoundView);
