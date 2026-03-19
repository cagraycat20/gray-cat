import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { csn } from '../../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-dialog.styles';
import { Props } from './gc-dialog.types';

export interface State {
}

class GcDialogView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  public classes = {
    paper: csn(
      this.props.classes.paper,
      {[this.props.classes.paperNoMaxWidth]: this.props.noMaxWidth},
      this.props.contentClassName,
    ),
  };

  public render(): JSX.Element | null {
    const { open, onClose, onOkClick, okButtonText,
      actionsClassName, okButtonIsInactive,
      children, additionalDialogActions, cancelButtonIsInactive } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        classes={this.classes}
      >
        {children}
        <DialogActions
          className={actionsClassName}
        >
          {additionalDialogActions}
          <Button
            onClick={onClose}
            color="primary"
            disabled={cancelButtonIsInactive}
          >
            {'Cancel'}
          </Button>
          <Button
            onClick={onOkClick}
            color="primary"
            autoFocus={true}
            disabled={okButtonIsInactive}
          >
            {okButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export const GcDialogViewStyled =
  withStyles(stylesCallback)(GcDialogView);
