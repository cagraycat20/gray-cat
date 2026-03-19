import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Subscription } from 'rxjs';
import {
  logError,
  upsError,
} from '../../../../utils';
import { canvasSize } from '../../../../utils/collage.utils';
import { GcSpinner, GcSpinnerButton } from '../../../shared';
import { StyleProps, stylesCallback } from './gc-collage.styles';
import { Props } from './gc-collage.types';
import { drawTiledCollage } from './tiled-collage';

export interface State {
  shareSub?: Subscription;
  isDrawing?: boolean;
}

class GcCollageView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {};

  private ref: HTMLCanvasElement | null = null;

  public render(): JSX.Element {
    const {open, TransitionComponent, classes, onClose, products} = this.props;
    return (
      <Dialog
        classes={{
          paper: classes.root,
        }}
        open={open}
        onClose={onClose}
        TransitionComponent={TransitionComponent}
        disableBackdropClick={true}
      >
        <DialogTitle className={classes.header}>Share on Facebook</DialogTitle>
        <DialogContent className={classes.content}>
          <div className={classes.canvasWrap}>
            <canvas
              className={classes.canvas}
              ref={this.onCanvasRef}
              width={canvasSize.w}
              height={canvasSize.h}
            />
            {this.state.isDrawing && <GcSpinner/>}
          </div>
        </DialogContent>
        <DialogActions>
          {products.length > 1 &&
            <Button
              className={classes.rightButton}
              onClick={this.updateCanvas}
              disabled={!!this.state.shareSub || this.state.isDrawing}
            >
              Shuffle Tiles
            </Button>
          }
          <Button
            color="primary"
            onClick={this.cancelClick}
          >
            Cancel
          </Button>
          <GcSpinnerButton
            color="primary"
            autoFocus={true}
            inProgress={!!this.state.shareSub}
            disabled={this.state.isDrawing}
            onClick={this.shareClick}
          >
            Share
          </GcSpinnerButton>
        </DialogActions>
      </Dialog>
    );
  }

  public componentWillUnmount() {
    this.cancelShareProgress();
  }

  private onCanvasRef = (ref: HTMLCanvasElement | null) => {
    this.ref = ref;
    this.updateCanvas();
  }

  private cancelShareProgress = () => {
    if (this.state.shareSub) {
      this.state.shareSub.unsubscribe();
      this.setState({shareSub: undefined});
    }
  }

  private shareComplete = () => {
    this.setState({shareSub: undefined});
    this.props.onClose();
  }

  // tslint:disable-next-line: no-any
  private shareError = (e: any) => {
    this.setState({shareSub: undefined});
    logError(e);
    this.props.onError(upsError);
  }

  private shareClick = () => {
    const {info, onShare} = this.props;

    if (info && this.ref) {
      const shareSub = onShare(this.ref.toDataURL('image/jpeg'), info.products)
        .subscribe(this.shareComplete, this.shareError);

      this.setState({shareSub});
    }
  }

  private cancelClick = () => {
    this.cancelShareProgress();
    this.props.onClose();
  }

  private updateCanvas = async () => {
    const {info} = this.props;

    if (this.ref) {
      const ctx = this.ref.getContext('2d');

      if (ctx && info) {
        this.setState({isDrawing: true});
        await drawTiledCollage(ctx, info);
        this.setState({isDrawing: false});
      }
    }
  }
}

export const GcCollageViewStyled =
  withStyles(stylesCallback)(GcCollageView);
