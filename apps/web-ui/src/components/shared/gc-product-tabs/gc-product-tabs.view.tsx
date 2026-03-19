import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import * as React from 'react';
import { LocalSettings } from '../..';
import { AllIcon } from '../../../assets/icons/all.icon';
import { csn } from '../../../shared';
import { logEvent } from '../../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-tabs.styles';

export type ProductListMode = LocalSettings['productList']['mode'];

interface Props {
  mode: ProductListMode;
  onModeChange: (mode: ProductListMode) => void;
}

interface State {
}

class GcProductTabsView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  private tabs: Array<ProductListMode> = ['all', 'favorites', 'popular'];
  private tabIndexes = {
    all: 0,
    favorites: 1,
    popular: 2,
  };

  private tabClasses = {
    root: this.props.classes.tabRoot,
    wrapper: this.props.classes.tabWrapper,
    labelContainer: this.props.classes.tabLabelContainer,
    textColorPrimary: this.props.classes.tabTextColorPrimary,
  };

  public render(): JSX.Element {
    const { classes, mode } = this.props;

    return (
      <Tabs
        className={classes.tabs}
        classes={{
          flexContainer:
            csn({ [classes.tabsFlexContainer]: true }),
        }}
        value={this.tabIndexes[mode]}
        onChange={this.tabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          classes={this.tabClasses}
          label="All"
          title="Show all products"
          icon={<AllIcon className={classes.tabIcon} />}
        />
        <Tab
          classes={this.tabClasses}
          label="Favorites"
          icon={<StarIcon className={classes.tabIcon} />}
          title="Show favorite products"
        />
        <Tab
          classes={this.tabClasses}
          label="Popular"
          title="Show popular products"
          icon={<ThumbUpIcon className={classes.tabIcon} />}
        />
      </Tabs>
    );
  }

  private tabChange = (event: React.ChangeEvent<Element>, value: number) => {
    logEvent(`ProductListTabChange-${this.props.mode}To${this.tabs[value]}`);
    this.props.onModeChange(this.tabs[value]);
  }
}

export const GcProductTabsViewStyled =
  withStyles(stylesCallback)(GcProductTabsView);
