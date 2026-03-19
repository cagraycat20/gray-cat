import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

import { GcLogo } from '..';
import auth from '../../services/Auth';
import { Feedback } from '../../types';
import { logError } from '../../utils';
import { apiCall } from '../../utils/request.utils';
import { GcClickableItem, GcSpinner } from '../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-feedback.styles';
import { Props } from './gc-feedback.types';

export interface State {
  feedback: string;
  email: string;
  name: string;
  contactMe: boolean;
  inProgress: boolean;
  showErrors: boolean;
}

class GcFeedbackView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    feedback: '',
    email: auth.email,
    name: auth.name,
    contactMe: false,
    inProgress: false,
    showErrors: false,
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    const {showErrors, feedback, email, name} = this.state;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.closeDialog}
        disableBackdropClick={true}
        classes={{paper: classes.paper}}
      >
        <Paper className={classes.header}>
          <GcLogo className={classes.logo}/>
          <GcClickableItem
            className={classes.closeButton}
            color="inherit"
            onClick={this.closeDialog}
            aria-label="Close"
          >
            <CloseIcon />
          </GcClickableItem>
        </Paper>
        <DialogContent className={classes.content}>
          <TextField
            className={classes.feedbackField}
            label="Feedback"
            multiline={true}
            rows="7"
            value={feedback}
            onChange={(event) => this.setState({feedback: event.target.value})}
            margin="normal"
            variant="outlined"
            error={showErrors && !feedback}
            autoFocus={true}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={this.state.contactMe}
                onChange={(event) => this.setState({contactMe: event.target.checked})}
              />
            }
            label="Contact me"
          />
          {this.state.contactMe &&
            <>
              <TextField
                label="Email"
                value={email}
                onChange={(event) => this.setState({email: event.target.value})}
                margin="normal"
                variant="outlined"
                error={showErrors && !email}
              />
              <TextField
                label="Name"
                value={name}
                onChange={(event) => this.setState({name: event.target.value})}
                margin="normal"
                variant="outlined"
                error={showErrors && !name}
              />
            </>
          }
          <Button
            className={classes.sendButton}
            color="primary"
            variant="contained"
            onClick={this.sendFeedback}
          >
            Send Feedback
          </Button>
          {this.state.inProgress && <GcSpinner/>}
        </DialogContent>
      </Dialog>
    );
  }

  private closeDialog = () => {
    this.setState({
      feedback: '',
      inProgress: false,
      showErrors: false,
    });
    this.props.onClose();
  }

  private sendFeedback = async () => {
    const {feedback, email, name, contactMe} = this.state;

    if (!feedback) {
      this.setState({showErrors: true});
      return;
    }

    if (contactMe && (!email || !name)) {
      this.setState({showErrors: true});
      return;
    }

    const feedbackRequest: Partial<Feedback> = contactMe
      ? {text: feedback, name, email}
      : {text: feedback, name: '', email: ''};

    this.setState({inProgress: true});
    try {
      try {
        await apiCall(
          'POST',
          'feedbacks',
          undefined,
          feedbackRequest,
        ).toPromise();
        this.closeDialog();
        this.props.onSuccess();
      } catch (e) {
        logError(e);
        this.props.onError();
      }
    } finally {
      this.setState({inProgress: false});
    }
  }
}

export const GcFeedbackViewStyled =
  withStyles(stylesCallback)(GcFeedbackView);
