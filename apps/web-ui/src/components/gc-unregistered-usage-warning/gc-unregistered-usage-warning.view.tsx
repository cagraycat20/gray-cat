import * as React from 'react';
import { GcLoginOfferDialog } from '..';
import { Props } from './gc-unregistered-usage-warning.types';

export interface State {
  open: boolean;
}

const delay = 1000 * 60 * 15;

export class GcUnregisteredUsageWarningView extends
  React.PureComponent<Props, State> {
  public state: State = {
    open: false,
  };

  private timeout?: NodeJS.Timeout;

  public componentDidMount() {
    this.restartTimeout();
  }

  public render(): JSX.Element | null {
    const { canOpen } = this.props;
    const { open } = this.state;
    return (
      <GcLoginOfferDialog
        open={canOpen && open}
        onClose={this.close}
        onCancel={this.dontRemindClick}
        title="Log in to secure your data"
        text={
          `If you don't log in, all your data will be stored on the local device only
          and won't be saved in the database of Protomeal.
          Consider logging in. It will take about 10 seconds.`
        }
        cancelButtonText="Don't remind me"
      />
    );
  }

  private restartTimeout = () => {
    this.clearTimeout();
    this.timeout = setTimeout(this.timeoutCallback, delay);
  }

  private clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  private timeoutCallback = () => {
    this.setState({open: true});
  }

  private close = () => {
    this.setState({open: false});
    this.restartTimeout();
  }

  private dontRemindClick = () => {
    this.setState({open: false});
    this.clearTimeout();
    this.props.onDontRemind();
  }
}
