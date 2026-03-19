import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import * as React from 'react';
import {
  GcProductList,
  GcProductListFilter,
  GcProductTabs,
} from '..';
import {
  Product,
  productHelper as ph,
  ProductList,
} from '../..';
import { csn } from '../../../shared';
import { logError, logEvent } from '../../../utils';
import { apiCall } from '../../../utils/request.utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-list-base.styles';
import {
  Props,
} from './gc-product-list-base.types';

interface State {
  filterText: string;
  popularProducts: Array<Product['id']>;
  cardMenu?: {
    anchor: HTMLElement;
    productId: Product['id'];
  };
}

class GcProductListBaseView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    filterText: '',
    popularProducts: [],
  };

  private activeCardInFavorites = false;
  private cardMenuProductName = '';
  private cardMenuProductImage?: string;

  public componentDidMount() {
    this.loadPopularIfNeeded(this.props.productList.mode);
  }

  public render(): JSX.Element {
    const {
      classes, children, productList, loggedIn, dialog,
      onShowLoginOfferDialog, products, favorites,
      onChangeProductList, onChangeFavoriteSortOrder,
      onEditProduct, windowHeight, onStartDrag, onEndDrag,
    } = this.props;
    const { filterText, popularProducts } = this.state;

    return (
      <div
        className={csn(
          classes.root,
          { [classes.dialogRoot]: dialog },
        )}
      >
        {children}
        <div
          className={csn(
            classes.topAreaContainer,
            { [classes.dialogTopArea]: dialog },
          )}
        >
          <GcProductTabs
            mode={productList.mode}
            onModeChange={this.modeChange}
          />
          <GcProductListFilter
            className={csn({ [classes.dialogFilterContainer]: dialog })}
            loggedIn={loggedIn}
            productList={productList}
            onShowLoginOfferDialog={onShowLoginOfferDialog}
            onChangeProductList={onChangeProductList}
            onFilterTextChange={this.submitFilterText}
            onEditProduct={onEditProduct}
          />
        </div>

        <GcProductList
          windowHeight={windowHeight}
          productList={productList}
          filterText={filterText}
          favorites={favorites}
          populars={popularProducts}
          products={products}
          onOpenCardMenu={this.openCardMenu}
          onStartDrag={onStartDrag}
          onEndDrag={onEndDrag}
          onChangeFavoriteSortOrder={onChangeFavoriteSortOrder}
        />

        {this.renderCardMenu()}
      </div>
    );
  }

  private renderCardMenu = () => {
    const { cardMenu } = this.state;
    const { favorites, products, onRenderMenuItems,
      classes, loggedIn, onShowLoginOfferDialog, onGetMenuHeaderText } = this.props;

    let anchor;
    if (cardMenu) {
      anchor = cardMenu.anchor;
      this.activeCardInFavorites = Boolean(cardMenu
        && favorites.indexOf(cardMenu.productId) > -1);
      const product = ph.findProduct(products, cardMenu.productId);
      this.cardMenuProductName = product ? product.name : '';
      this.cardMenuProductImage = product ? product.image : '';
    }

    return (
      <Popover
        key={'menu'}
        open={Boolean(anchor)}
        onClose={this.closeContextMenu}
        disableRestoreFocus={true}
        anchorEl={anchor}
        anchorReference="anchorEl"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <List
          subheader={
            <ListSubheader
              className={classes.menuSubheader}
              component="div"
            >
              <div
                className={classes.menuImage}
                style={{
                  backgroundImage: `url('${
                    ph.getProductImageOrGeneric(this.cardMenuProductImage, 40, 40, true)}')`,
                }}
              />
              {onGetMenuHeaderText(this.cardMenuProductName)}
            </ListSubheader>
          }
        >
          {onRenderMenuItems(
            cardMenu && cardMenu.productId,
            this.closeContextMenu,
          )}
          <Divider />
          <ListItem
            onClick={loggedIn ? this.editProduct : onShowLoginOfferDialog}
            button={true}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItem>
          {
            this.activeCardInFavorites
              ? <ListItem
                button={true}
                onClick={this.removeFromFavorites}
              >
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Remove from Favorites" />
              </ListItem>
              : <ListItem
                button={true}
                onClick={this.addToFavorites}
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Add to Favorites" />
              </ListItem>
          }
        </List>
      </Popover>
    );
  }

  private modeChange = (mode: ProductList['mode']) => {
    this.props.onChangeProductList({ ...this.props.productList, mode });
    this.loadPopularIfNeeded(mode);
  }

  private submitFilterText = (text: string) => this.setState({ filterText: text });

  private openCardMenu = (element: HTMLElement, productId: Product['id']) => {
    logEvent('OpenedProductMenu');
    this.setState({
      cardMenu: {
        anchor: element,
        productId,
      },
    });
  }

  private addToFavorites = () => {
    this.setState({ cardMenu: undefined });
    if (this.state.cardMenu) {
      const product = ph.findProduct(
        this.props.products,
        this.state.cardMenu.productId,
      );
      if (product) {
        logEvent('ProductMenu-AddedToFavorites');
        this.props.onAddToFavorites(this.state.cardMenu.productId, product.name);
      }
    }
  }

  private removeFromFavorites = () => {
    this.setState({ cardMenu: undefined });
    if (this.state.cardMenu) {
      const product = ph.findProduct(
        this.props.products,
        this.state.cardMenu.productId,
      );
      if (product) {
        logEvent('ProductMenu-RemovedFromFavorites');
        this.props.onRemoveFromFavorites(this.state.cardMenu.productId, product.name);
      }
    }
  }

  private editProduct = () => {
    const { cardMenu } = this.state;
    if (cardMenu) {
      const { products } = this.props;
      const product = ph.findProduct(products, cardMenu.productId);
      if (product) {
        logEvent('ProductMenu-OpenProductEditing');
        this.props.onEditProduct(product);
      }
    }
    this.setState({ cardMenu: undefined });
  }

  private closeContextMenu = () => this.setState({ cardMenu: undefined });

  private loadPopularIfNeeded = (mode: ProductList['mode']) => {
    if (mode === 'popular' && this.state.popularProducts.length === 0) {
      this.loadPopular();
    }
  }

  private loadPopular = async () => {
    try {
      const popularProducts: Array<Product['id']> =
        (await apiCall('GET', 'popularProducts').toPromise()).response;

      if (Array.isArray(popularProducts)) {
        this.setState({ popularProducts });
      }
    } catch (e) {
      logError(e);
    }
  }
}

export const GcProductListBaseViewStyled =
  withStyles(stylesCallback)(GcProductListBaseView);
