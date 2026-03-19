import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
  Subject,
  Subscription,
} from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import {
  GcClickableItem,
  GcDialog,
  GcFilteredProducts,
  GcProductCard,
  GcSortSelector,
  GcTooltip,
  LocalSettings,
  logRender,
  NutrientPropName,
  PricesDialog,
  Product,
  productHelper as ph,
  ProductPrice,
} from '../..';
import { csn } from '../../../shared';
import { SortDirection, SortOption } from '../../../shared/types/sort-selector.types';
import {
  GcProductPricesCardViewStyled as GcProductPricesCard,
} from './gc-product-price-card/gc-product-prices-card.view';
import {
  StyleProps,
  stylesCallback,
  viewStyle,
} from './gc-product-prices-dialog.styles';
import { Props } from './gc-product-prices-dialog.types';

interface CardSortOrders {
  [productId: string]: number;
}

interface State {
  isSearchView: boolean;
  filterText: string;
  filterEditingText: string;
  searchEditingText: string;
  searchText: string;
  showSpinner?: boolean;
  changes: {
    [productId: string]: {
      productWeight: number;
      price: number;
      deleted?: boolean;
    },
  };
  productToScrollTo?: Product['id'];
  searchViewTab: 'all' | 'favorites';
}

const sortByOptions: Array<PricesDialog['sortBy']> = [
  ...ph.nutrientProps,
  'totalPrice',
  'none',
];

const sortOptions: Array<SortOption> = [
  { key: 'protein', title: '1g of protein' },
  { key: 'fat', title: '1g of fat' },
  { key: 'carbs', title: '1g of carbs' },
  { key: 'calories', title: '1 Calorie' },
  { key: 'none', title: 'None' },
  { key: 'totalPrice', title: '100g of product' },
];

class GcProductPricesDialogView extends
  React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    filterEditingText: '',
    filterText: '',
    isSearchView: false,
    searchEditingText: '',
    searchText: '',
    changes: {},
    searchViewTab: 'all',
  };

  // private scrollBars?: Scrollbars;
  private searchingWasShowed = false;

  private searchInputHandler$ = new Subject();
  private filterInputHandler$ = new Subject();
  private subscriptions = new Subscription();

  /*
    Whenever sortBy is changed to not "None" value, we save sort orders in this property
    Then, when we edit some value (e.g. price) sort order persist and we avoid jumping cards.
  */
  private savedSortOrders?: CardSortOrders | null;

  public componentDidMount() {
    this.subscriptions.add(
      this.searchInputHandler$
        .pipe(throttleTime(100))
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.setState({ searchText: this.state.searchEditingText });
        }),
    );
    this.subscriptions.add(
      this.filterInputHandler$
        .pipe(throttleTime(100))
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.setState({ filterText: this.state.filterEditingText });
        }),
    );
  }

  public componentWillUnmount() {
    this.subscriptions.unsubscribe();
  }

  public render(): JSX.Element {
    logRender(this);
    const { classes, settings } = this.props;
    const { isSearchView } = this.state;

    const mergedPrices = this.getMergedPrices();

    return (
      <GcDialog
        contentClassName={classes.root}
        open={settings.open}
        okButtonText="Save"
        noMaxWidth={true}
        okButtonIsInactive={isSearchView}
        cancelButtonIsInactive={isSearchView}
        onClose={this.cancelAndClose}
        onOkClick={this.saveChanges}

        additionalDialogActions={
          <Zoom in={!isSearchView}>
            <Button
              classes={{ root: classes.addPriceButton }}
              color="secondary"
              variant="contained"
              onClick={this.goToSearchPage}
            >
              <AddIcon />
              Add price
            </Button>
          </Zoom>}
      >
        <div
          className={csn(
            classes.content,
            { [classes.contentWithSearchView]: isSearchView },
          )}
        >
          {this.renderMainView(mergedPrices)}
          {this.renderSearchView(mergedPrices)}
        </div>
      </GcDialog>
    );
  }

  private renderMainView = (mergedPrices: Array<ProductPrice>) => {
    const { classes } = this.props;
    const { filterText } = this.state;

    return (
      <div className={classes.mainView}>
        <div className={classes.topArea}>
          <div className={classes.header}>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
            >
              Set prices
            </Typography>
            <GcClickableItem
              className={classes.headerButton}
              color="inherit"
              onClick={this.cancelAndClose}
            >
              <ClearIcon />
            </GcClickableItem>
          </div>
          {this.renderControlPanel()}
        </div>
        <div className={classes.cardsContainer}>
          <Scrollbars
            className={classes.cardsInnerContainer}
            renderView={this.renderScrollContent}
          >
            <GcFilteredProducts
              filterText={filterText}
              products={mergedPrices.map(this.findProductCallback)}
              customData={mergedPrices}
              renderForEmptyFilter={true}
              onRenderProduct={this.renderPriceCard}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  private renderScrollContent = ({ style, ...props }: any) =>
    <div {...props} style={{ ...style, ...viewStyle }} />

  private findProductCallback = (productPrice: ProductPrice) =>
    ph.findProduct(this.props.products, productPrice.productId) as Product

  private renderControlPanel = () => {
    const { classes, settings } = this.props;
    const { filterEditingText } = this.state;
    return (
      <div className={classes.controlPanel}>
        <GcSortSelector
          options={sortOptions}
          selectedDirection={settings.sortDirection}
          selectedOption={settings.sortBy}
          sortByTitle="Sort by price for"
          labelWidth={110}
          onSortChanged={this.changeSortBy}
          className={classes.sortByFromControl}
        />

        <div className={csn(classes.inputContainer, classes.filterInputContainer)}>
          <SearchIcon className={classes.inputLeftIcon} />
          <InputBase
            classes={{
              root: csn(classes.inputRoot, classes.filterInputRoot),
              input: csn(
                classes.filterInput,
                { [classes.filterInputWithText]: !!filterEditingText },
              ),
              focused: classes.searchPageInputRootFocused,
            }}
            inputProps={{ tabIndex: -1 }}
            value={filterEditingText}
            onChange={this.filterInputChange}
            placeholder="Search Product"
          />
          {
            filterEditingText &&
            <ClearIcon
              className={classes.inputClearIcon}
              onClick={this.clearFilter}
            />
          }
        </div>

      </div>
    );
  }

  private renderSearchView = (mergedPrices: Array<ProductPrice>) => {
    const { classes } = this.props;
    const { searchText, searchEditingText, searchViewTab } = this.state;
    return (
      <div className={classes.searchView}>
        <div className={classes.topArea}>
          <div className={classes.header}>
            <GcTooltip
              title="Back"
            >
              <GcClickableItem
                className={classes.headerButton}
                onClick={this.goToMainPage}
                color="inherit"
              >
                <BackIcon />
              </GcClickableItem>
            </GcTooltip>
            <Tabs
              classes={{
                root: classes.searchPageTabsRoot,
                indicator: classes.searchPageTabsIndicator,
              }}
              value={searchViewTab}
              onChange={this.searchTabChange}
            >
              <Tab label="All" value="all" />
              <Tab label="Favorites" value="favorites" />
            </Tabs>
          </div>
          <div
            className={csn(
              classes.inputContainer,
              classes.searchPageInputContainer,
            )}
          >
            <SearchIcon className={classes.inputLeftIcon} />
            <InputBase
              classes={{
                root: csn(classes.searchPageInputRoot, classes.inputRoot),
                input: classes.searchPageInput,
                focused: classes.searchPageInputRootFocused,
              }}
              inputProps={{ tabIndex: -1 }}
              value={searchEditingText}
              onChange={this.searchingInputChange}
              placeholder="Search Product"
            />
            {
              searchEditingText &&
              <ClearIcon
                className={classes.inputClearIcon}
                onClick={this.clearSearch}
              />
            }
          </div>
        </div>
        <Scrollbars className={classes.searchPageScrollBars}>
          <div className={classes.searchPageProductsContainer}>
            {
              this.searchingWasShowed &&
              <GcFilteredProducts
                filterText={searchText}
                products={this.getProductsForSearchView(mergedPrices)}
                limit={searchViewTab === 'favorites' ? 0 : 24}
                renderForEmptyFilter={true}
                onRenderProduct={this.renderSearchResultProduct}
                onRenderExceededLimit={this.renderExceededLimit}
              />
            }
          </div>
        </Scrollbars>
      </div >
    );
  }

  private mapFavoritesCallback =
    (iter: Product['id']) => ph.findProduct(this.props.products, iter)

  private getProductsForSearchView = (mergedPrices: Array<ProductPrice>) => {
    const { favorites, products } = this.props;
    let result: Array<Product | undefined>;
    if (this.state.searchViewTab === 'favorites') {
      result = favorites.map(this.mapFavoritesCallback);
    } else {
      result = products;
    }
    const mergedPricesIds = mergedPrices.map((iter) => iter.productId);
    result = result.filter(
      (iter) => !Boolean(iter && mergedPricesIds.indexOf(iter.id) > -1));
    return result;
  }

  private searchTabChange = (event: object, value: State['searchViewTab']) =>
    this.setState({ searchViewTab: value })

  private renderSearchResultProduct = (product: Product) => {
    return (
      <div
        key={product.id}
        className={this.props.classes.searchPageProductContainer}
      >
        <GcProductCard
          product={product}
          onClick={this.searchResultProductClick}
        />
      </div>
    );
  }

  private searchResultProductClick = (element: HTMLElement, productId: Product['id']) => {
    const { changes } = this.state;
    if (!changes[productId] || changes[productId].deleted) {
      this.setState(
        {
          changes: {
            ...changes,
            [productId]: {
              productWeight: 100,
              price: 0,
            },
          },
          isSearchView: false,
          productToScrollTo: productId,
        },
      );
    }
  }

  private filterPricesCallback = (iter: ProductPrice) =>
    !(this.state.changes[iter.productId] && this.state.changes[iter.productId].deleted)

  private getMergedPrices = () => {
    const { prices, settings } = this.props;
    const { changes } = this.state;
    const result = prices.filter(this.filterPricesCallback);

    for (const productId in changes) {
      if (changes.hasOwnProperty(productId)) {
        if (changes[productId].deleted) {
          continue;
        }

        const existingIndex = result
          .findIndex((iter) => iter.productId === productId);

        const changedPrice = {
          productId,
          price: changes[productId].price,
          productWeight: changes[productId].productWeight,
        };
        if (existingIndex > -1) {
          result[existingIndex] = changedPrice;
        } else {
          result.push(changedPrice);
        }
      }
    }

    if (settings.productId && !changes[settings.productId]) {
      result.push({ productId: settings.productId, productWeight: 100, price: 0 });
    }

    return this.sortMergedPrices(result);
  }

  private sortPricesCallback = (price1: ProductPrice, price2: ProductPrice) => {
    const { settings } = this.props;

    if (ph.isNutrientName(this.props.settings.sortBy)) {
      const prod1 = ph.findProduct(this.props.products, price1.productId);
      const prod2 = ph.findProduct(this.props.products, price2.productId);
      if (prod1 && prod2) {
        const nutrient = this.props.settings.sortBy as NutrientPropName;
        return settings.sortDirection === 'asc'
          ? ph.getNutrientPrice(prod1[nutrient], price1) - ph.getNutrientPrice(prod2[nutrient], price2)
          : ph.getNutrientPrice(prod2[nutrient], price2) - ph.getNutrientPrice(prod1[nutrient], price1);
      }
    } else {
      return settings.sortDirection === 'asc'
        ? (price1.price / price1.productWeight) - (price2.price / price2.productWeight)
        : (price2.price / price2.productWeight) - price1.price / price1.productWeight;
    }
    return 0;
  }

  private fillSortOrdersCallback = (iter: ProductPrice, index: number) => {
    if (this.savedSortOrders) {
      this.savedSortOrders[iter.productId] = index;
    }
  }

  private sortWithSavedSortOrdersCallback = (price1: ProductPrice, price2: ProductPrice) => {
    if (this.savedSortOrders) {
      return this.savedSortOrders[price1.productId] -
        this.savedSortOrders[price2.productId];
    } else {
      return 0;
    }
  }

  private sortMergedPrices = (mergedPrices: Array<ProductPrice>) => {
    if (!this.savedSortOrders) {
      this.savedSortOrders = {};
      [...mergedPrices]
        .sort(this.sortPricesCallback)
        .forEach(this.fillSortOrdersCallback);
    }

    if (this.savedSortOrders) {
      mergedPrices.sort(this.sortWithSavedSortOrdersCallback);
    }

    return mergedPrices;
  }

  private renderExceededLimit = () => {
    return (
      <Typography
        className={this.props.classes.searchPageExceedTheLimit}
      >
        There are more products.
        Please specify search criteria.
      </Typography>
    );
  }

  private scrollToPriceCard = (ref: HTMLDivElement | null) => {
    if (ref) {
      ref.scrollIntoView({ block: 'center' });
    }
  }

  private renderPriceCard = (product: Product, prices: Array<ProductPrice>) => {
    const productPrice = prices.find((iter) => iter.productId === product.id);

    if (!productPrice) {
      return null;
    }

    const { classes, products, priceSuffix, settings } = this.props;
    const { productToScrollTo, changes } = this.state;

    const needScrollTo = (productToScrollTo && productPrice.productId === productToScrollTo)
      || (settings.productId && !changes[settings.productId] && productPrice.productId === settings.productId);

    return (
      <div
        key={productPrice.productId}
        className={classes.cardContainer}
        ref={needScrollTo ? this.scrollToPriceCard : undefined}
      >
        <GcProductPricesCard
          products={products}
          productPrice={productPrice}
          priceSuffix={priceSuffix}
          onChange={this.changeValue}
        />
      </div>
    );
  }

  private changeValue = (change: ProductPrice & { deleted: boolean }) => {
    this.setState({
      changes: {
        ...this.state.changes,
        [change.productId]: {
          price: change.price,
          productWeight: change.productWeight,
          deleted: change.deleted,
        },
      },
    });
    if (this.props.settings.sortBy !== 'none') {
      this.changeSettings({ sortBy: 'none' });
    }
  }

  private goToMainPage = () => this.setState({ isSearchView: false });

  private filterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterEditingText: event.currentTarget.value });
    this.filterInputHandler$.next();
  }

  private clearFilter = () => {
    this.setState({ filterEditingText: '' });
    this.filterInputHandler$.next();
  }

  private searchingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchEditingText: event.currentTarget.value });
    this.searchInputHandler$.next();
  }

  private clearSearch = () => {
    this.setState({ searchEditingText: '' });
    this.searchInputHandler$.next();
  }

  // private scrollBarRef = (ref: Scrollbars) => {
  //   if (ref) {
  //     this.scrollBars = ref;
  //   }
  // }

  private goToSearchPage = () => {
    this.searchingWasShowed = true;
    this.setState({ isSearchView: true });
  }

  private saveChanges = () => {
    const { changes } = this.state;
    const { settings } = this.props;

    if (settings.productId && !changes[settings.productId]) {
      changes[settings.productId] = { productWeight: 100, price: 0 };
    }

    this.props.onUpdateProductPrices(
      Object.keys(changes).map((productId) => ({
        productId,
        ...changes[productId],
      })),
    );
    this.setState({ changes: {} });
    this.changeSettings({ open: false, productId: undefined });
  }

  private cancelAndClose = () => {
    this.setState({ changes: {} });
    this.changeSettings({ open: false, productId: undefined });
  }

  private changeSettings = (changes: Partial<LocalSettings['pricesDialog']>) => {
    this.props.onChangeSettings({
      ...this.props.settings,
      ...changes,
    });
  }

  private changeSortBy = (key: string, direction: SortDirection) => {
    if (sortByOptions.find((iter) => iter === key)) {
      this.changeSettings({
        sortBy: key as PricesDialog['sortBy'],
        sortDirection: direction,
      });
      if (key !== 'none') {
        this.savedSortOrders = null;
      }
    }
  }
}

export const GcProductPricesDialogViewStyled =
  withStyles(stylesCallback)(GcProductPricesDialogView);
