import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import * as React from 'react';
import { Tab, Tabs } from '../../../shared/types/admin.types';
import { GcClickableItem } from '../../shared';
import { StyleProps, stylesCallback } from './gc-navigation.styles';
import { OwnProps } from './gc-navigation.types';
import { GcTabViewStyled } from './gc-tab/gc-tab.view';

class GcNavigationView extends React.PureComponent<OwnProps & StyleProps> {

  public render(): JSX.Element {
    const { classes, expanded, onExpansionClick } = this.props;

    return (
      <div>
        <div className={classes.expandContainer}>
          <GcClickableItem
            className={classes.expandItem}
            onClick={onExpansionClick}
          >
            {expanded ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </GcClickableItem>
        </div>
        <List>
          {Tabs.map(this.renderTab)}
        </List>
      </div>
    );
  }

  private renderTab = (tab: Tab): JSX.Element => {
    const { expanded, selectedTab, onTabSelected } = this.props;

    return (
      <GcTabViewStyled
        key={tab.key}
        tab={tab}
        expanded={expanded}
        selected={selectedTab === tab.key}
        onTabSelected={onTabSelected}
      />
    );
  }

}

export const GcNavigationViewStyled =
  withStyles(stylesCallback)(GcNavigationView);
