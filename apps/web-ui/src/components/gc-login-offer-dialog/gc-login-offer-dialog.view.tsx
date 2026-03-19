import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import {
  StyleProps,
  stylesCallback,
} from './gc-login-offer-dialog.styles';
import { Props } from './gc-login-offer-dialog.types';

export interface State {
  open: boolean;
}

class GcLoginOfferDialogView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    open: false,
  };

  private dialogClasses = {
    paper: this.props.classes.root,
  };

  public render(): JSX.Element | null {
    const { open, title, text, cancelButtonText,
      onLogIn, onClose, onCancel } = this.props;

    return (
      <Dialog
        classes={this.dialogClasses}
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCancel}
            color="primary"
          >
            {cancelButtonText || 'Later'}
          </Button>
          <Button
            onClick={onLogIn}
            color="primary"
            autoFocus={true}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export const GcLoginOfferDialogViewStyled =
  withStyles(stylesCallback)(GcLoginOfferDialogView);
