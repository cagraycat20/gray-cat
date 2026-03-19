import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
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
  GcFilteredProducts,
  GcProductCard,
  GcTooltip,
  LocalSettings,
  logRender,
  Product,
  productHelper as ph,
} from '../..';
import { csn, GcText } from '../../../shared';
import { getProductPrice, hasProductPrice } from '../../../shared/utils/food-comparison.utils';
import { GcDialog, GcProductImage } from '../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-food-comparison-dialog.styles';
import { Props } from './gc-food-comparison-dialog.types';
import { GcNutrientViewStyled } from './gc-nutrient/gc-nutrient.view';
import { GcPriceNutrientContainer } from './gc-price-nutrient/gc-price-nutrient.container';

interface State {
  isSearchView: boolean;
  searchEditingText: string;
  searchText: string;
  searchViewTab: 'all' | 'favorites';
  showSpinner?: boolean;
  product1Selecting?: boolean;
  product2Selecting?: boolean;
}

const PRODUCT1 = 'product1';
const PRODUCT2 = 'product2';
type ProductSelectingType = typeof PRODUCT1 | typeof PRODUCT2;

const imgWidth = 200;
const imgHeight = 100;

class GcFoodComparisonDialogView extends
  React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    isSearchView: false,
    searchEditingText: '',
    searchText: '',
    searchViewTab: 'all',
  };

  private searchingWasShowed = false;
  private searchInputHandler$ = new Subject();
  private subscriptions = new Subscription();

  public componentDidMount() {
    this.subscriptions.add(
      this.searchInputHandler$
        .pipe(throttleTime(100))
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.setState({ searchText: this.state.searchEditingText });
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

    return (
      <GcDialog
        contentClassName={classes.root}
        actionsClassName={classes.actions}
        open={settings.open}
        okButtonText="Close"
        noMaxWidth={true}
        onClose={this.handleClose}
        onOkClick={this.handleClose}
      >
        {
          settings.open &&
          <div
            className={csn(
              classes.content,
              { [classes.contentWithSearchView]: isSearchView },
            )}
          >
            {this.renderMainView()}
            {this.renderSearchView()}
          </div>
        }
      </GcDialog>
    );
  }

  private renderMainView = (): JSX.Element => {
    const { classes, settings, prices } = this.props;

    return (
      <div className={classes.mainView}>
        <div className={classes.topArea}>
          <div className={classes.header}>
            <Typography
              variant="h6"
              color="inherit"
            >
              Food comparison
            </Typography>
            <GcClickableItem
              className={classes.headerButton}
              color="inherit"
              onClick={this.handleClose}
            >
              <ClearIcon />
            </GcClickableItem>
          </div>
        </div>
        <div className={classes.mainViewContentContainer}>
          <Scrollbars className={classes.scrollbars}>
            <Typography className={classes.hint}>
              Select two types of food to compare their nutrients
            </Typography>
            <div className={classes.comparingContainer}>
              <div className={classes.productContainer}>
                <Button
                  className={classes.selectProductButton}
                  onClick={this.goToSearchPage(PRODUCT1)}
                >
                  Select Food 1
                </Button>
                {
                  settings.product1 &&
                  <div>
                    <GcProductImage
                      height={imgHeight}
                      width={imgWidth}
                      image={settings.product1.image}
                      thumbnail={settings.product1.thumb}
                      productName={settings.product1.name}
                      className={classes.media}
                    />
                    <Typography className={classes.productName}>
                      {settings.product1.name}
                    </Typography>
                    {!hasProductPrice(settings.product1.id, prices) &&
                      <Button
                        className={classes.setPriceButton}
                        variant="contained"
                        color="secondary"
                        onClick={this.handleSetPriceButtonClick(settings.product1.id)}
                      >
                        Set price
                      </Button>
                    }
                  </div>
                }
              </div>
              <div className={classes.divider} />
              <div className={classes.productContainer}>
                <Button
                  className={classes.selectProductButton}
                  onClick={this.goToSearchPage(PRODUCT2)}
                >
                  Select Food 2
                </Button>
                {
                  settings.product2 &&
                  <div>
                    <GcProductImage
                      height={imgHeight}
                      width={imgWidth}
                      image={settings.product2.image}
                      thumbnail={settings.product2.thumb}
                      productName={settings.product2.name}
                      className={classes.media}
                    />
                    <Typography className={classes.productName}>
                      {settings.product2.name}
                    </Typography>
                    {!hasProductPrice(settings.product2.id, prices) &&
                      <Button
                        className={classes.setPriceButton}
                        variant="contained"
                        color="secondary"
                        onClick={this.handleSetPriceButtonClick(settings.product2.id)}
                      >
                        Set price
                      </Button>
                    }
                  </div>
                }
              </div>
            </div>
            {((settings.product1 && !hasProductPrice(settings.product1.id, prices))
                || (settings.product2 && !hasProductPrice(settings.product2.id, prices))) &&
                <GcText className={classes.hint}>
                  Set food price in order to see which food has cheaper nutrients
                </GcText>
              }
            <GcNutrientViewStyled
              nutrient="protein"
              active={Boolean(settings.product1) && Boolean(settings.product2)}
              value1={settings.product1 ? settings.product1.protein : 0}
              value2={settings.product2 ? settings.product2.protein : 0}
              className={classes.nutrient}
            />
            {((!settings.product1 && !settings.product2)
              || ((settings.product1 && hasProductPrice(settings.product1.id, prices)
              && settings.product2 && hasProductPrice(settings.product2.id, prices)))) &&
              <GcPriceNutrientContainer
                nutrient="protein"
                active={Boolean(settings.product1) && Boolean(settings.product2)}
                value1={settings.product1 ? settings.product1.protein : 0}
                value2={settings.product2 ? settings.product2.protein : 0}
                price1={settings.product1 ? getProductPrice(settings.product1.id, prices) : 0}
                price2={settings.product2 ? getProductPrice(settings.product2.id, prices) : 0}
                className={classes.nutrient}
              />
            }
            <GcNutrientViewStyled
              nutrient="fat"
              active={Boolean(settings.product1) && Boolean(settings.product2)}
              value1={settings.product1 ? settings.product1.fat : 0}
              value2={settings.product2 ? settings.product2.fat : 0}
              className={classes.nutrient}
            />
            {((!settings.product1 && !settings.product2)
              || ((settings.product1 && hasProductPrice(settings.product1.id, prices)
              && settings.product2 && hasProductPrice(settings.product2.id, prices)))) &&
              <GcPriceNutrientContainer
                nutrient="fat"
                active={Boolean(settings.product1) && Boolean(settings.product2)}
                value1={settings.product1 ? settings.product1.fat : 0}
                value2={settings.product2 ? settings.product2.fat : 0}
                price1={settings.product1 ? getProductPrice(settings.product1.id, prices) : 0}
                price2={settings.product2 ? getProductPrice(settings.product2.id, prices) : 0}
                className={classes.nutrient}
              />
            }
            <GcNutrientViewStyled
              nutrient="carbs"
              active={Boolean(settings.product1) && Boolean(settings.product2)}
              value1={settings.product1 ? settings.product1.carbs : 0}
              value2={settings.product2 ? settings.product2.carbs : 0}
              className={classes.nutrient}
            />
            {((!settings.product1 && !settings.product2)
              || ((settings.product1 && hasProductPrice(settings.product1.id, prices)
              && settings.product2 && hasProductPrice(settings.product2.id, prices)))) &&
              <GcPriceNutrientContainer
                nutrient="carbs"
                active={Boolean(settings.product1) && Boolean(settings.product2)}
                value1={settings.product1 ? settings.product1.carbs : 0}
                value2={settings.product2 ? settings.product2.carbs : 0}
                price1={settings.product1 ? getProductPrice(settings.product1.id, prices) : 0}
                price2={settings.product2 ? getProductPrice(settings.product2.id, prices) : 0}
                className={classes.nutrient}
              />
            }
            <GcNutrientViewStyled
              nutrient="calories"
              active={Boolean(settings.product1) && Boolean(settings.product2)}
              value1={settings.product1 ? settings.product1.calories : 0}
              value2={settings.product2 ? settings.product2.calories : 0}
              className={classes.nutrient}
            />
            {((!settings.product1 && !settings.product2)
              || ((settings.product1 && hasProductPrice(settings.product1.id, prices)
              && settings.product2 && hasProductPrice(settings.product2.id, prices)))) &&
              <GcPriceNutrientContainer
                nutrient="calories"
                active={Boolean(settings.product1) && Boolean(settings.product2)}
                value1={settings.product1 ? settings.product1.calories : 0}
                value2={settings.product2 ? settings.product2.calories : 0}
                price1={settings.product1 ? getProductPrice(settings.product1.id, prices) : 0}
                price2={settings.product2 ? getProductPrice(settings.product2.id, prices) : 0}
                className={classes.nutrient}
              />
            }
          </Scrollbars>
        </div>
      </div>
    );
  }

  private renderSearchView = () => {
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
                products={this.getProductsForSearchView()}
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

  private getProductsForSearchView = () => {
    const { favorites, products } = this.props;
    let result: Array<Product | undefined>;

    if (this.state.searchViewTab === 'favorites') {
      result = favorites.map(this.mapFavoritesCallback);
    } else {
      result = products;
    }

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
    this.setState({ isSearchView: false });

    const product = this.props.products.find((value) => value.id === productId);
    if (!product) {
      return;
    }

    if (this.state.product1Selecting) {
      this.props.onChangeSettings({
        ...this.props.settings,
        product1: product,
      });
    } else {
      this.props.onChangeSettings({
        ...this.props.settings,
        product2: product,
      });
    }
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

  private goToMainPage = () => this.setState({ isSearchView: false });

  private searchingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchEditingText: event.currentTarget.value });
    this.searchInputHandler$.next();
  }

  private clearSearch = () => {
    this.setState({ searchEditingText: '' });
    this.searchInputHandler$.next();
  }

  private goToSearchPage = (product: ProductSelectingType) => (event: React.MouseEvent<HTMLInputElement>) => {
    this.searchingWasShowed = true;

    this.setState({
      isSearchView: true,
      product1Selecting: product === PRODUCT1,
      product2Selecting: product === PRODUCT2,
    });
  }

  private handleClose = () => {
    this.changeSettings({ open: false });
  }

  private handleSetPriceButtonClick = (productId: Product['id']) => () => {
    this.props.onShowPricesDialog(productId);
  }

  private changeSettings = (changes: Partial<LocalSettings['foodComparisonDialog']>) => {
    this.props.onChangeSettings({
      ...this.props.settings,
      ...changes,
    });
  }
}

export const GcFoodComparisonDialogViewStyled =
  withStyles(stylesCallback)(GcFoodComparisonDialogView);
