import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HistoryIcon from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import * as React from 'react';
import { csn } from '../../../../shared';
import { TAB_KEY_LOGS, TAB_KEY_PRODUCTS, TAB_KEY_USERS } from '../../../../shared/types/admin.types';
import { StyleProps, stylesCallback } from './gc-tab.styles';
import { OwnProps } from './gc-tab.types';

class GcTabView extends React.PureComponent<OwnProps & StyleProps> {

  public render(): JSX.Element {
    const { classes, tab, selected, expanded } = this.props;

    return (
      <ListItem
        button={true}
        key={tab.key}
        className={csn({[classes.selected]: selected}, {[classes.open]: expanded}, {[classes.close]: !expanded})}
        onClick={this.handleItemClick}
      >
        <ListItemIcon className={classes.itemIcon}>
          {this.getItemIcon()}
        </ListItemIcon>
        <ListItemText
          className={csn(
            classes.itemText,
            {[classes.itemTextVisible]: expanded},
            {[classes.itemTextHidden]: !expanded},
          )}
          primary={tab.title}
        />
      </ListItem>
    );
  }

  private getItemIcon(): JSX.Element {
    const { tab } = this.props;

    switch (tab.key) {
      case TAB_KEY_PRODUCTS:
        return <FastfoodIcon />;
      case TAB_KEY_LOGS:
        return <HistoryIcon />;
      case TAB_KEY_USERS:
        return <PeopleIcon />;
    }
  }

  private handleItemClick = () => {
    this.props.onTabSelected(this.props.tab.key);
  }
}

export const GcTabViewStyled =
  withStyles(stylesCallback)(GcTabView);
