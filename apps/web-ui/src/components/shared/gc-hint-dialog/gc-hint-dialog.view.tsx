import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { GcDialog, logRender } from '../..';
import { csn } from '../../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-hint-dialog.styles';
import { Props } from './gc-hint-dialog.types';

interface State {
  loaded?: boolean;
}

class GcHintDialogView extends
  React.PureComponent<Props & StyleProps, State> {

  public state: State = {
  };

  public render(): JSX.Element {
    logRender(this);

    const { classes, hint, onClose } = this.props;
    const { loaded } = this.state;

    return (
      <GcDialog
        contentClassName={classes.root}
        open={Boolean(hint)}
        okButtonText="Got it"
        noMaxWidth={true}
        onClose={onClose}
        onOkClick={this.handleGotItClick}
      >
        <div className={classes.content}>
          {
            !loaded &&
            <Typography className={classes.text}>
              {hint ? hint.title : ''}
            </Typography>
          }
          <img
            className={csn(
              classes.img,
              {[classes.imgHidden]: !loaded},
            )}
            alt="protomeal"
            src={hint ? hint.image : undefined}
            onLoad={this.afterLoad}
          />
        </div>
      </GcDialog>
    );
  }

  private handleGotItClick = () => {
    this.props.onAddHiddenHint(this.props.hint!!);
    this.props.onClose();
  }

  private afterLoad = () => {
    this.setState({loaded: true});
  }
}

export const GcHintDialogViewStyled =
  withStyles(stylesCallback)(GcHintDialogView);
