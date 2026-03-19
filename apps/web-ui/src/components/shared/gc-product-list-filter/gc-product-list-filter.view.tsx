import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import {
  Subject,
  Subscription,
} from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import {
  GcClickableItem,
  GcTooltip,
  keyboardEventHelper as keh,
  LocalSettings,
  nutrientClasses,
  Product,
  productHelper as ph,
} from '../..';
import { csn } from '../../../shared';
import { logEvent } from '../../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-list-filter.styles';

interface Props {
  className?: string;
  loggedIn: boolean;
  productList: LocalSettings['productList'];
  onChangeProductList: (productList: LocalSettings['productList']) => void;
  onShowLoginOfferDialog: () => void;
  onEditProduct: (product: Product) => void;
  onFilterTextChange: (text: string) => void;
}

interface State {
  filterEditingText: string;
  menuAnchor?: HTMLElement;
}

class GcProductListFilterView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    filterEditingText: '',
  };

  private filterInputHandler$ = new Subject();
  private filterInputTimer?: number;
  private nutrientFilterClick = ph.nutrientOnlyProps.reduce(
    (result, iter) => {
      result[iter] = () => {
        const newProductList = { ...this.props.productList };
        newProductList.filter[iter] = !newProductList.filter[iter];
        this.props.onChangeProductList(newProductList);
        logEvent('NutrientFilterClick-' + iter);
      };
      return result;
    },
    {},
  );

  private subscriptions = new Subscription();

  public componentDidMount() {
    this.subscriptions.add(this.filterInputHandler$
      .pipe(throttleTime(100))
      .subscribe(() => this.restartFilterInputTimer()));
  }

  public componentWillUnmount() {
    this.subscriptions.unsubscribe();
    this.cancelFilterInputTimer();
  }

  public render(): JSX.Element {
    const { classes, productList, loggedIn,
      onShowLoginOfferDialog, className } = this.props;
    const { filterEditingText, menuAnchor } = this.state;
    return (
      <div
        className={csn(
          className,
          classes.filterContainer,
          {
            [classes.filterContainerVisible]:
              productList.mode === 'all',
          },
        )}
      >
        <div
          className={classes.filterInputContainer}
          onKeyUp={this.stopPropagation}
        >
          <input
            className={classes.filterInput}
            value={filterEditingText}
            placeholder="Enter food name"
            onKeyDown={this.filterKeyDown}
            onChange={this.filterInputChange}
          />

          <SearchIcon className={classes.filterInputIcon} />
          {
            filterEditingText &&
            <ClearIcon
              className={classes.filterClearIcon}
              onMouseDown={this.clearFilterText}
            />
          }
        </div>
        <GcTooltip title="Add new food">
          <GcClickableItem
            className={classes.newProductButton}
            onClick={loggedIn ? this.openMenu : onShowLoginOfferDialog}
          >
            <AddIcon className={classes.newProductIcon} />
          </GcClickableItem>
        </GcTooltip>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.createProduct}>Create New Food</MenuItem>
          <MenuItem onClick={this.createComplexProduct}>Create New Dish</MenuItem>
        </Menu>

        <div className={classes.filterNutrientContainer}>
          {
            ph.nutrientOnlyProps.map((iter, index) => (
              <GcTooltip
                key={iter}
                title={`Filter by main nutrient (${ph.nutrientCaptions[iter]})`}
              >
                <div
                  className={csn(
                    classes.filterNutrient,
                    {
                      [classes.filterNutrientSelected]: productList.filter[iter],
                      [classes.filterNutrientVisible]: productList.mode === 'all',
                    },
                  )}
                  style={
                    productList.mode === 'all'
                      ? {
                        transition: `background-color 200ms 0s, transform 100ms ${
                          250 + index * 100}ms`,
                      }
                      : undefined
                  }
                  onClick={this.nutrientFilterClick[iter]}
                >
                  <div
                    className={csn(
                      classes.filterNutrientMarker,
                      nutrientClasses[iter],
                    )}
                    style={!productList.filter[iter]
                      ? { opacity: 0.7 }
                      : undefined
                    }
                  />

                  <Typography
                    className={csn(
                      classes.filterNutrientText,
                      { [classes.filterNutrientTextUnselected]: !productList.filter[iter] },
                    )}
                  >
                    {iter.toUpperCase()}
                  </Typography>
                </div>
              </GcTooltip>
            ))
          }
        </div>
      </div>
    );
  }

  private stopPropagation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }

  private filterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (keh.getKey(event) === keh.keys.Escape) {
      this.changeFilterEditingText('');
    }
  }

  private clearFilterText = (event: React.SyntheticEvent<Element>) => {
    event.preventDefault();
    this.changeFilterEditingText('');
  }

  private cancelFilterInputTimer = () => {
    if (this.filterInputTimer) {
      clearTimeout(this.filterInputTimer);
      this.filterInputTimer = undefined;
    }
  }

  private submitFilterText = () =>
    this.props.onFilterTextChange(this.state.filterEditingText)

  private restartFilterInputTimer = () => {
    this.cancelFilterInputTimer();
    this.filterInputTimer =
      window.setTimeout(this.submitFilterText, 300);
  }

  private handleFilterInputChange = () => this.filterInputHandler$.next();

  private changeFilterEditingText = (text: string) => this.setState(
    { filterEditingText: text },
    this.handleFilterInputChange,
  )

  private filterInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.changeFilterEditingText(event.target.value)

  private addProduct = (complex?: boolean) => {
    const newProduct = ph.createProduct();
    newProduct.name = this.state.filterEditingText;
    if (complex) {
      newProduct.ingredients = [];
    }
    logEvent(`OpenNew${complex ? 'Dish' : 'Food'}Dialog`);
    this.props.onEditProduct(newProduct);
  }

  private openMenu = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ menuAnchor: event.currentTarget })

  private closeMenu = () => this.setState({ menuAnchor: undefined });

  private createProduct = () => {
    this.addProduct();
    this.closeMenu();
  }

  private createComplexProduct = () => {
    this.addProduct(true);
    this.closeMenu();
  }

}

export const GcProductListFilterViewStyled =
  withStyles(stylesCallback)(GcProductListFilterView);
