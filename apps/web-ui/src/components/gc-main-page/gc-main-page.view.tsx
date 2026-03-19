import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/Lock';
import URLSearchParams from '@ungap/url-search-params';
import * as React from 'react';

import {
  GcDaySummary,
  GcMeals,
  GcProductListDialog,
  GcProducts,
  GcTooltip,
  keyboardEventHelper as keh,
  logRender,
  Product,
  themeCustomData,
} from '..';
import { dateUtils as du } from '../../shared';
import { logEvent, usu } from '../../utils';
import {
  GcDayBottomMenuContainer as GcDayBottomMenu,
} from './gc-day-bottom-menu/gc-day-bottom-menu.container';
import {
  GcMainPageStylesCallback,
  StyleProps,
} from './gc-main-page.styles';
import { Props } from './gc-main-page.types';

const maxToolBarHeight = themeCustomData.custom.mainBarHeight.upCol4s;
const scrollThreshold = 200 + maxToolBarHeight /* there is space on top */;

export interface State {
  addProductDialogVisible: boolean;
}

class GcMainPageView extends React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    addProductDialogVisible: false,
  };

  private setSummaryScrolledState?: (scrolled: boolean) => void;
  private savedScrolled = false;
  private prevLocked?: boolean;
  private isAddProductDialogRendered = false;

  private buttonTransitionDuration = {
    enter: this.props.theme.transitions.duration.enteringScreen,
    exit: this.props.theme.transitions.duration.leavingScreen,
  };

  constructor(props: Props & StyleProps) {
    super(props);
    this.checkForFoodListRedirect(props);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.mobileLayout !== prevProps.mobileLayout) {
      this.mealsScrollHandler(0);
    }
  }

  public render() {
    logRender(this);
    const { classes, mobileLayout, locked } = this.props;

    const prevLocked = this.prevLocked;
    this.prevLocked = locked;

    return (
      <div
        tabIndex={1}
        className={classes.root}
        onKeyUp={this.keyUp}
        onClick={this.focusSelfIfNeeded}
      >

        {!mobileLayout && <GcProducts />}

        <div className={classes.day}>
          <GcDaySummary
            onGetScrolledStateChangeCallback={this.getScrolledStateChangeCallback}
          />
          <GcMeals
            onShowProductAddDialog={this.openProductDialog}
            onScroll={this.mealsScrollHandler}
            needScrollToProduct={this.needScrollToProduct}
            onGetEditingProduct={this.getEditingProduct}
          />
          <GcTooltip title="Unlock Current Day">
            <Zoom
              in={locked}
              timeout={this.buttonTransitionDuration}
              style={!prevLocked
                ? { transitionDelay: `${this.buttonTransitionDuration.exit}ms` }
                : undefined
              }
            >
              <Fab
                color="secondary"
                className={classes.bottomActionButton}
                onClick={this.unlockDay}
              >
                <LockIcon />
              </Fab>
            </Zoom>
          </GcTooltip>
          {
            mobileLayout &&
            <GcTooltip title={'Add food'}>
              <Zoom
                in={!locked}
                timeout={this.buttonTransitionDuration}
                style={prevLocked
                  ? { transitionDelay: `${this.buttonTransitionDuration.exit}ms` }
                  : undefined
                }
              >
                <Fab
                  color={'primary'}
                  className={classes.bottomActionButton}
                  onClick={this.openProductDialog}
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </GcTooltip>
          }
          <GcDayBottomMenu />
        </div>
        {this.renderAddProductDialog()}
      </div>
    );
  }

  private renderAddProductDialog = () => {
    const { addProductDialogVisible } = this.state;
    if (!this.isAddProductDialogRendered && !addProductDialogVisible) {
      return null;
    }
    this.isAddProductDialogRendered = true;

    return (
      <GcProductListDialog
        open={addProductDialogVisible}
        onClose={this.closeProductDialog}
      >
        <GcProducts
          dialogMode={true}
          afterAddProductToMeal={this.closeProductDialog}
        />
      </GcProductListDialog>
    );
  }

  private getScrolledStateChangeCallback = (setScrolledState: (scrolled: boolean) => void) =>
    this.setSummaryScrolledState = setScrolledState

  private mealsScrollHandler = (scrollTop: number) => {
    const scrolled = this.props.mobileLayout &&
      (scrollTop > maxToolBarHeight + scrollThreshold);
    if (scrolled !== this.savedScrolled) {
      this.savedScrolled = scrolled;
      this.props.onSetHeaderScrolledState(scrolled);
      if (this.setSummaryScrolledState) {
        this.setSummaryScrolledState(scrolled);
      }
    }
  }

  private unlockDay = () => {
    logEvent('UnlockDay');
    const { getSettings, onUnlockDay } = this.props;
    if (getSettings) {
      onUnlockDay(getSettings().selectedDate);
    }
  }

  private openProductDialog = () => {
    logEvent('OpenAddProductDialog');
    this.setState({ addProductDialogVisible: true });
  }

  private closeProductDialog = () => {
    logEvent('CloseAddProductDialog');
    this.setState({ addProductDialogVisible: false });
  }

  private keyUp = (event: React.KeyboardEvent) => {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      if (keh.getKey(event) === keh.keys.KeyN) {
        if (this.props.getSettings) {
          const showNutrients = !this.props.getSettings().showNutrients;
          logEvent(`${showNutrients ? 'Show' : 'Hide'}Nutrients-keyboard`);
          this.props.onChangeRemoteSettings(
            usu.setShowNutrients(showNutrients),
          );
        }
      }
    }
  }

  private focusSelfIfNeeded = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (document.activeElement === document.body) {
      event.currentTarget.focus();
    }
  }

  private needScrollToProduct = (
    productId: Product['id'],
    mealTime: number,
  ) => {
    const { getSettings } = this.props;
    if (getSettings) {
      const productToScrollTo = getSettings().productToScrollTo;
      return Boolean(
        productToScrollTo &&
        productToScrollTo.productId === productId &&
        productToScrollTo.mealTime === mealTime,
      );
    }
    return false;
  }

  private getEditingProduct = (mealTime: number) => {
    const { getSettings } = this.props;
    if (getSettings) {
      const productToScrollTo = getSettings().productToScrollTo;
      if (productToScrollTo && productToScrollTo.showWeightInput) {
        if (productToScrollTo.mealTime === mealTime) {
          return productToScrollTo.productId;
        }
      }
    }
    return '';
  }

  private checkForFoodListRedirect(props: Props) {
    const productId = new URLSearchParams(props.location.search).get('productId');
    if (productId) {
      const today = du.getFormattedDate(du.getCurrentDate());
      const productWeight = 100;
      const mealTime = du.getMealTime(
        du.setMinutesForToday(Math.floor(du.getMinutesForToday() / 10) * 10),
      );

      props.onChangeDate(du.getFormattedDate(today));
      props.onAddProductToDate(productId, today, productWeight, mealTime);
      props.history.replace('/');
    }
  }
}

export const GcMainPageViewStyled =
  withStyles(GcMainPageStylesCallback, { withTheme: true })(GcMainPageView);
