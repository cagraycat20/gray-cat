import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
import TodayIcon from '@material-ui/icons/Today';
import * as React from 'react';
import { dateUtils as du } from '../..';
import { csn } from '../../../shared';
import { logEvent } from '../../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-day-bottom-menu.styles';
import { Props } from './gc-day-bottom-menu.types';

export interface State {
  menuVisible?: boolean;
}

class GcDayBottomMenuView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  private buttonClasses = {
    label: this.props.classes.buttonLabel,
    root: this.props.classes.buttonRoot,
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    const { menuVisible } = this.state;

    return (
      <ClickAwayListener onClickAway={this.hideMenu}>
        <div
          className={csn(
            classes.root,
            { [classes.rootWithMenu]: menuVisible },
          )}
        >
          <div className={classes.showIconContainer}>
            {
              menuVisible &&
              <ArrowDownIcon
                className={classes.showIcon}
                onClick={this.hideMenu}
              />
            }
            {
              !menuVisible &&
              <ArrowUpIcon
                className={classes.showIcon}
                onClick={this.showMenu}
              />
            }
          </div>
          {this.renderMenu()}
        </div>
      </ClickAwayListener>
    );
  }

  private renderMenu = () => {
    const { classes } = this.props;
    const { menuVisible } = this.state;

    return (
      <div
        className={csn(
          classes.menu,
          { [classes.menuVisible]: menuVisible },
        )}
      >
        <Button
          classes={this.buttonClasses}
          variant="outlined"
          size="small"
          color="primary"
          onClick={this.yesterdayButtonClick}
        >
          <NavigateBeforeIcon />
          Yesterday
        </Button>
        <Button
          classes={this.buttonClasses}
          variant="outlined"
          size="small"
          color="primary"
          onClick={this.todayButtonClick}
        >
          <TodayIcon />
          Today
        </Button>
        <Button
          classes={this.buttonClasses}
          variant="outlined"
          size="small"
          color="primary"
          onClick={this.tomorrowButtonClick}
        >
          <NavigateNextIcon />
          Tomorrow
        </Button>
      </div>
    );
  }

  private showMenu = () => {
    logEvent('OpenBottomMenu');
    this.setState({ menuVisible: true });
  }

  private hideMenu = () => this.setState({ menuVisible: false });

  private yesterdayButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    logEvent('BottomMenu-YesterdayClick');
    this.props.onChangeDate(du
      .getFormattedDate(du.subtractDays(du.getCurrentDate(), 1)));
    this.hideMenu();
  }

  private todayButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    logEvent('BottomMenu-TodayClick');
    this.props.onChangeDate(du.getFormattedDate(du.getCurrentDate()));
    this.hideMenu();
  }

  private tomorrowButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    logEvent('BottomMenu-TomorrowClick');
    this.props.onChangeDate(du
      .getFormattedDate(du.addDays(du.getCurrentDate(), 1)));
    this.hideMenu();
  }

}

export const GcDayBottomMenuViewStyled =
  withStyles(stylesCallback)(GcDayBottomMenuView);
