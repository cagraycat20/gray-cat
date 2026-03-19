import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  StyleProps,
  stylesCallback,
} from './gc-cookie-consent.styles';

interface State {
  show: boolean;
}

class GcCookieConsentView extends React.PureComponent<StyleProps, State> {

  public state = {show: true};

  public componentWillMount() {
    this.setState({show: !localStorage.getItem('agreed_to_consent')});
  }

  public render(): JSX.Element {
    const { classes: {root, content, link, button} } = this.props;

    return (
      <>
      {this.state.show &&
        <div className={root}>
          <div className={content}>
            This site uses cookies to deliver our services.
            By using our site, you acknowledge that you have read and understand
            our <Link className={link} to="/cookies">Cookie&nbsp; Policy</Link>, <Link className={link} to="/privacy">
            Privacy&nbsp;Policy</Link> and
            our <Link className={link} to="/terms">Terms&nbsp;of&nbsp;Use</Link>.
            Your use of ProtoMeal is subject to these policies and terms.
          </div>
          <Button className={button} onClick={this.buttonClick}>Got It</Button>
        </div>
      }
      </>
    );
  }

  private buttonClick = () => {
    this.setState({show: false});
    localStorage.setItem('agreed_to_consent', String(true));
  }
}

export const GcCookieConsentStyled =
  withStyles(stylesCallback)(GcCookieConsentView);
