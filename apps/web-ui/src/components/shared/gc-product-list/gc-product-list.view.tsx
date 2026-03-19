import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
  DndProduct,
  DnDTargetProps,
  GcProductCard,
  logRender,
  Product,
  productHelper as ph,
} from '../..';
import {
  scrollBarsStyle,
  StyleProps,
  stylesCallback,
  thumbStyle,
} from './gc-product-list.styles';
import { Props } from './gc-product-list.types';

export interface State {
  itemCount: number;
  lastProductList?: Props['productList'];
  filterText?: Props['filterText'];
  savedWindowHeight: number;
}

const scrollThreshold = 100;
const initialPages = 1.5;

class GcProductListView extends
  React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
      const reInitingItems =
        (prevState.filterText !== nextProps.filterText) ||
        (prevState.lastProductList !== nextProps.productList) ||
        (
          (prevState.savedWindowHeight < nextProps.windowHeight) &&
          (nextProps.productList.mode !== 'popular') // popular need to be loaded only once
        );

      if (reInitingItems) {
        return {
          lastProductList: nextProps.productList,
          filterText: nextProps.filterText,
          savedWindowHeight: nextProps.windowHeight,
          itemCount: 0,
        };
      } else if (prevState.itemCount > nextProps.products.length) {
        return {
          itemCount: nextProps.products.length,
        };
      }
      return null;
  }

  public state: State = {
    itemCount: 0,
    savedWindowHeight: 0,
  };

  private itemHeight: number = 0;
  private itemWidth: number = 0;
  private scrollBars?: Scrollbars;
  private emergeCards = true;
  private filterByNutrient = false;

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (!this.state.itemCount) {
      this.emergeCards = true;
      this.setState({itemCount: this.getInitialPageRowCount()});
    } else {
      this.emergeCards = false;
    }
  }

  public render(): JSX.Element {
    logRender(this);
    const { classes, theme, productList } = this.props;

    this.itemHeight = theme.custom.productList.gridLine +
      theme.custom.card.small.height;
    this.itemWidth = theme.custom.productList.gridLine +
      theme.custom.card.small.width;

    this.filterByNutrient = productList.filter.protein ||
      productList.filter.fat || productList.filter.carbs;

    return (
      <div className={classes.root}>
        <Scrollbars
          style={scrollBarsStyle}
          ref={this.onRootRef}
          renderThumbVertical={this.renderThumb}
          renderThumbHorizontal={this.renderThumb}
          onScroll={productList.mode === 'all' ? this.scroll : undefined}
        >
          <div className={classes.productsContentContainer}>
            <div className={classes.productsContent}>
              {this.renderProducts()}
            </div>
          </div>
        </Scrollbars>
      </div>
    );
  }

  private renderCard = (product: Product, index: number) => (
    <div
      key={'product-' + product.id + index}
      style={this.emergeCards
        ? {animationDelay: index * 15 + 'ms'}
        : undefined
      }
      className={this.props.classes.itemContainer}
    >
      <GcProductCard
        product={product}
        onClick={this.props.onOpenCardMenu}
        onBeginDrag={this.props.onStartDrag}
        onEndDrag={this.props.onEndDrag}
        canDrop={this.canDrop}
        onDndDrop={this.dndDrop}
      />
    </div>
  )

  private canDrop: DnDTargetProps['canDrop'] = (props, monitor) => {
    if (this.props.productList.mode === 'favorites') {
      const item = monitor && monitor.getItem() as DndProduct;
      return Boolean(item && item.mainNutrient && item.mainNutrient ===
        ph.getMainNutrient((props as {product: Product}).product));
    }
    return false;
  }

  private dndDrop: DnDTargetProps['onDndDrop'] = (props, monitor) => {
    const item = monitor.getItem() as DndProduct;
    const targetProductId = (props as {product: Product}).product.id;
    if (item && (item.productId !== targetProductId)) {
      this.props.onChangeFavoriteSortOrder(
        item.productId, targetProductId);
    }
  }

  private getGroupedProducts = (result: object, iter: Product) => {
    const mainNutr = ph.getMainNutrient(iter);
    if (!result[mainNutr]) {
      result[mainNutr] = [iter];
    } else {
      result[mainNutr].push(iter);
    }
    return result;
  }

  private renderProducts = () => {
    const { productList, classes } = this.props;

    const products = this.getProductsForRender();
    // grouping
    if ((productList.mode === 'all')) {
      return products.map(this.renderCard);
    } else {
      const groups = products.reduce(this.getGroupedProducts, {});
      let index = 0;
      return ph.nutrientOnlyProps.reduce(
        (result: Array<React.ReactNode>, iter) => {
          if (groups[iter]) {
            result.push(
              <Typography
                key={'group-' + iter}
                className={classes.groupCaption}
              >
                {iter.toUpperCase()}
              </Typography>,
            );
            groups[iter].forEach((prodIter: Product) =>
              result.push(this.renderCard(prodIter, ++index)));
          }
          return result;
        },
        [],
      );
    }
  }

  private getProductsForRender = () => {
    const { productList, favorites, populars } = this.props;
    const { itemCount } = this.state;

    if (itemCount < 1) {
      return []; // we will just clear the list
    } else if (productList.mode === 'favorites') {
      return this.getListedProducts(favorites);
    } else  if (productList.mode === 'popular') {
      return this.getListedProducts(populars);
    } else if (productList.mode === 'all') {
      return this.getAllProducts();
    } else {
      return [];
    }
  }

  private checkFilter = (product: Product, filterText: string) => {
    const filterChecked = ph.checkFilter(
      product, filterText.trim().toLowerCase());
    if (filterChecked && this.filterByNutrient) {
      return this.props.productList.filter[ph.getMainNutrient(product)];
    }
    return filterChecked;
  }

  // below was an attempt to make more relevant search results to appear on top
  // it cannot be done with current approach

  // private getProductSortIndex = (product: Product, filterText: string) => {
  //   if (product.name.toLocaleLowerCase() === filterText) {
  //     return 3;
  //   } else if (product.name.toLocaleLowerCase().startsWith(filterText)) {
  //     return 2;
  //   } else if (product.name.toLocaleLowerCase().endsWith(filterText)) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }

  // private sortFilteredProducts = (products: Array<Product>, filterText: string) => {
  //   if (filterText) {
  //     products.sort((product1: Product, product2: Product) => {
  //       return this.getProductSortIndex(product2, filterText) -
  //         this.getProductSortIndex(product1, filterText);
  //     });
  //   }
  //   return products;
  // }

  private getAllProducts = () => {
    const { itemCount } = this.state;
    const { products, filterText: filterTextValue } = this.props;
    const filterText = filterTextValue.trim().toLocaleLowerCase();

    const result: Array<Product> = [];
    for (const product of products) {
      if (result.length >= itemCount) {
        break;
      }
      if (this.checkFilter(product, filterText)) {
        result.push(product);
      }
    }
    // this.sortFilteredProducts(result, filterText);
    return result;
  }

  private getListedProducts = (list: Array<string>) => {
    const { products } = this.props;
    return list.reduce(
      (result: Array<Product>, id) => {
        const product = ph.findProduct(products, id);
        if (product) {
          result.push(product);
        }
        return result;
      },
      [],
    );
  }

  private scroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (this.scrollBars) {
      const needAdd = (this.scrollBars.getScrollHeight() -
      (this.scrollBars.getScrollTop() +
      this.scrollBars.getClientHeight()) < scrollThreshold);
      if (needAdd) {
        this.setState({itemCount:
          this.state.itemCount + this.getItemsPerPage()});
      }
    }
  }

  private onRootRef = (scrollBars: Scrollbars | null) => {
    if (scrollBars) {
      this.scrollBars = scrollBars;
      this.setState({itemCount: this.getInitialPageRowCount()});
    }
  }

  private getItemsPerPage = () => {
    if (this.scrollBars) {
      return Math.ceil(
        (this.scrollBars.getClientWidth() / this.itemWidth) *
          (this.scrollBars.getClientHeight() / this.itemHeight),
      );
    } else {
      return 0;
    }
  }

  private getInitialPageRowCount = () =>
    this.props.productList.mode === 'all'
      ? Math.ceil(initialPages * this.getItemsPerPage())
      : this.props.products.length // no limit

  // tslint:disable-next-line: no-any
  private renderThumb = ({ style, ...props }: any) =>
    <div style={{ ...style, ...thumbStyle}} {...props} />
}

export const GcProductListViewStyled =
  withStyles(stylesCallback, {withTheme: true})(GcProductListView);
