import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { TAB_KEY_LOGS, TAB_KEY_PRODUCTS, TAB_KEY_USERS, TabKey } from '../../shared/types/admin.types';
import { GcAdminProductsContainer } from './gc-admin-products/gc-admin-products.container';
import { StyleProps, stylesCallback } from './gc-admin.styles';
import { Props } from './gc-admin.types';
import { GcEventLogsContainer } from './gc-event-logs/gc-event-logs.container';
import { GcNavigationViewStyled } from './gc-navigation/gc-navigation.view';
import { GcUsersContainer } from './gc-users/gc-users.container';

interface State {
  tab: TabKey;
  expanded: boolean;
}

class GcAdminView extends React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    tab: TAB_KEY_PRODUCTS,
    expanded: false,
  };

  public render(): JSX.Element {
    const { classes, isAdmin } = this.props;
    const { tab, expanded } = this.state;

    return isAdmin ? (
      <div className={classes.root}>
        <GcNavigationViewStyled
          selectedTab={tab}
          expanded={expanded}
          onTabSelected={this.handleTabSelected}
          onExpansionClick={this.handleExpandClick}
        />
        <div className={classes.content}>
          {this.renderContent()}
        </div>
      </div>
    ) : <div/>;
  }

  private renderContent(): JSX.Element {
    const { tab, expanded } = this.state;

    switch (tab) {
      case TAB_KEY_PRODUCTS:
          return <GcAdminProductsContainer expanded={expanded} />;
      case TAB_KEY_LOGS:
        return <GcEventLogsContainer />;
      case TAB_KEY_USERS:
        return <GcUsersContainer />;
    }
  }

  private handleTabSelected = (tab: TabKey) => {
    this.setState({tab});
  }

  private handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({expanded: !expanded});
  }

}

export const GcAdminViewStyled =
  withStyles(stylesCallback)(GcAdminView);
