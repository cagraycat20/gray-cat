import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { GcLogo } from '..';
import {
  StyleProps,
  stylesCallback,
} from './gc-intro.styles';
import { Props } from './gc-intro.types';

export interface State {
  fadeOut: boolean;
}

class GcIntroView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    fadeOut: false,
  };

  private hideTimeout: NodeJS.Timeout | null = null;

  public componentWillUnmount() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  public render(): JSX.Element {
    const { classes, onHide } = this.props;
    const { fadeOut } = this.state;

    if (!this.hideTimeout) {
      this.hideTimeout =
        setTimeout(() => this.setState({fadeOut: true}), 1800);
    }

    return (
      <div
        className={classes.root}
        style={fadeOut ? {opacity: 0} : undefined}
        onTransitionEnd={onHide}
      >
        <div className={classes.content}>
          <GcLogo className={classes.logo} />
        </div>
      </div>
    );
  }
}

export const GcIntroViewStyled =
  withStyles(stylesCallback)(GcIntroView);
