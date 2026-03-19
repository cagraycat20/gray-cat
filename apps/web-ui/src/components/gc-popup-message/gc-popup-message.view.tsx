import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import {
  GcClickableItem,
  logRender,
  PopupMessage,
 } from '..';
import {
  StyleProps,
  stylesCallback,
} from './gc-popup-message.styles';
import { Props } from './gc-popup-message.types';

export interface State {
  open: boolean;
  needClose: boolean;
}

const DEFAULT_DURATION = 4000;

class GcPopupMessageView extends
  React.PureComponent<Props & StyleProps, State> {
  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State,
  ): Partial<State> | null {
    return {
      needClose: false,
      open: !prevState.needClose && (
        prevState.open
          ? nextProps.messages.length < 1
          : nextProps.messages.length > 0
      ),
    };
  }

  public state: State = {
    open: false,
    needClose: false,
  };

  public render() {
    logRender(this);
    const message: PopupMessage = this.props.messages.length ? this.props.messages[0] : {text: ''};
    const {text, actionButton, attentionIcon, autoHideDuration} = message;

    return [
      (
        <Snackbar
          key="snackbar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={autoHideDuration || DEFAULT_DURATION}
          onClose={this.close}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{text}</span>}
          action={
            actionButton
            ?
              <Button
                key="action"
                aria-label={actionButton.caption}
                color="primary"
                size="small"
                onClick={(event) => {
                  if (actionButton.actions) {
                    actionButton.actions.forEach(
                      (action) => this.props.dispatch(action),
                    );
                  } else if (actionButton.onClick) {
                    actionButton.onClick();
                  }
                  this.closeButtonClick(event);
                }}
              >
                {actionButton.caption}
              </Button>
            :
              <GcClickableItem
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.closeButtonClick}
              >
                <CloseIcon />
              </GcClickableItem>

          }
        />
      ),
      this.state.open && attentionIcon &&
      (
        <div
          key="attention-hover"
          className={this.props.classes.additionalContent}
          onClick={this.closeButtonClick}
        >
          {
            React.createElement(attentionIcon.icon, {
              className: this.props.classes.additionalIcon,
            })
          }
        </div>
      ),
    ];
  }

  private handleExited = () => {
    this.props.onHideMessage();
  }

  private closeButtonClick = (event: React.SyntheticEvent<Element>) =>
    this.setState({needClose: true})

  private close = (event: React.SyntheticEvent<Element>, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({needClose: true});
  }

}

export const GcPopupMessageViewStyled =
  withStyles(stylesCallback, {withTheme: true})(GcPopupMessageView);
