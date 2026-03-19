import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { GcProductListDialogHeader } from '..';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-list-dialog.styles';

interface Props {
  open: boolean;
  onClose: () => void;
}

const noPointerEventsStyle: React.CSSProperties = {pointerEvents: 'none'};

interface State {
}

class GcProductListDialogView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  private backdropProps = {classes: {root: this.props.classes.root}};
  private classes = {paper: this.props.classes.paper};

  public render(): JSX.Element {
    const { children, open, onClose } = this.props;
    return (
      <Dialog
        BackdropProps={this.backdropProps}
        classes={this.classes}
        open={open}
        onClose={onClose}
        keepMounted={true}
        style={open ? undefined : noPointerEventsStyle}
      >
        <GcProductListDialogHeader
          onClose={onClose}
        />
        {children}
      </Dialog>
    );
  }
}

export const GcProductListDialogViewStyled =
  withStyles(stylesCallback)(GcProductListDialogView);
