import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import * as React from 'react';
import {
  dateUtils,
  dayInfoHelper as dih,
  DndProduct,
  GcProductDropArea,
  GcProductListBase,
  GcTimeInputDialog,
  logRender,
  Point,
  Product,
  productHelper as ph,
  ProductList,
} from '..';
import { LiveTimeIcon } from '../../assets/icons/live-time.icon';
import {
  csn,
  pagePath,
  toSeoUrl,
} from '../../shared';
import { logEvent } from '../../utils';

import {
  StyleProps,
  stylesCallback,
} from './gc-products.styles';
import { Props } from './gc-products.types';

interface State {
  timeInputPoint: Point | null;
}

class GcProductsView extends
  React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    timeInputPoint: null,
  };

  private determinedMeals: Array<number> = [];

  public render(): JSX.Element {
    logRender(this);
    const { classes, dndProduct, productList, dialogMode } = this.props;
    const showDropArea = dndProduct && dndProduct.fromMeal;

    return (
      <GcProductListBase
        dialog={dialogMode}
        productList={productList}
        onStartDrag={this.onBeginDrag}
        onEndDrag={this.onEndDrag}
        onChangeProductList={this.productListChange}
        onRenderMenuItems={this.renderCardMenuItems}
        onGetMenuHeaderText={this.getMenuHeaderText}
      >
        <GcProductDropArea
          style={{
            visibility: showDropArea ? 'visible' : 'hidden',
            opacity: showDropArea ? 1 : 0,
            ...(!showDropArea
              ? { transition: 'visibility 0s linear 0.2s, opacity 0.2s linear' }
              : { transitionDelay: '0s' }
            ),
          }}
          className={classes.dropArea}
          content={this.dropAreaContent}
          onDndDrop={this.dndDrop}
        />
      </GcProductListBase>
    );
  }

  private productListChange = (newProductList: ProductList) => {
    this.props.onChangeProductList(newProductList, this.props.dialogMode);
  }

  private dropAreaContent = (isOver: boolean) => {
    const { classes } = this.props;
    return (
      <div
        style={isOver ? { backgroundColor: '#8080808a' } : undefined}
        className={classes.dropAreaContent}
      >
        <Typography
          className={classes.dropAreaText}
          variant="subtitle1"
        >
          Drop here to
        </Typography>
        <Typography
          className={classes.dropAreaText}
          variant="h4"
        >
          DISCARD
        </Typography>
        <DeleteIcon
          className={csn(
            classes.dropAreaIcon,
            { [classes.dropAreaIconOver]: isOver },
          )}
        />
      </div>
    );
  }

  private renderCardMenuItems = (
    productId: Product['id'] | undefined,
    closeMenu: () => void,
  ) => {
    const { onAddProductToMeal, date, products,
      afterAddProductToMeal, onGetMeals } = this.props;

    const { timeInputPoint } = this.state;

    let detailsUrl: string = '';
    if (productId) {
      this.determinedMeals = onGetMeals();
      const product = ph.findProduct(products, productId);
      if (products) {
        detailsUrl = `/${pagePath.productList}/${toSeoUrl((product as Product).name)}`;
      }
    }

    return (
      <>
        {
          Boolean(this.determinedMeals.length) &&
          this.determinedMeals.map((iter) => (
            <ListItem
              key={iter}
              button={true}
              onClick={() => {
                if (productId) {
                  logEvent('ProductMenu-AddedProductToMeal');
                  onAddProductToMeal(
                    {
                      productId,
                      productWeight: 100,
                      date,
                      mealTime: iter,
                      showWeightInput: true,
                    },
                  );
                  closeMenu();
                  if (afterAddProductToMeal) {
                    afterAddProductToMeal();
                  }
                }
              }}
            >
              <ListItemIcon>
                <LiveTimeIcon {...dih.mealTimeDetails(iter)} />
              </ListItemIcon>
              <ListItemText
                primary={dih.formatMealTime(iter)}
              />
            </ListItem>
          ))
        }
        <ListItem
          button={true}
          onClick={this.menuAddToSpecTimeClick}
        >
          <ListItemIcon>
            <AvTimerIcon />
          </ListItemIcon>
          <ListItemText primary="Specified Time" />
        </ListItem>

        <Divider />

        <ListItem
          disabled={!detailsUrl}
          button={true}
          onMouseUp={
            detailsUrl
              ? (event) => {
                if (event.button === 1) {
                  logEvent('ProductMenu-GoToDetails');
                  window.open(detailsUrl, '_blank');
                }
              }
              : undefined
          }
          onClick={
            detailsUrl
              ? () => {
                logEvent('ProductMenu-GoToDetails');
                window.open(detailsUrl, '_blank');
              }
              : undefined
          }
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Go to Details" />
        </ListItem>

        <GcTimeInputDialog
          key={'time-picker'}
          point={timeInputPoint}
          onSubmit={(mealTime: Date) => {
            const time = dateUtils.getHours(mealTime) * 60 +
              dateUtils.getMinutes(mealTime);
            if (productId) {
              this.props.onAddProductToMeal(
                {
                  productId,
                  productWeight: 100,
                  date,
                  mealTime: time,
                  showWeightInput: true,
                },
              );
            }
            this.setState({ timeInputPoint: null });
            closeMenu();
            if (afterAddProductToMeal) {
              afterAddProductToMeal();
            }
          }}
          onClose={this.timeInputClose}
        />
      </>
    );
  }

  private getMenuHeaderText = (productName: string) =>
    `Add ${productName ? productName + ' ' : ''}To`

  private menuAddToSpecTimeClick = (event: React.MouseEvent<Element>) => {
    this.setState({
      timeInputPoint: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  }

  private timeInputClose = () => this.setState({ timeInputPoint: null });

  private dndDrop = () => {
    const { dndProduct, onRemoveProductFromMeal, date } = this.props;
    if (dndProduct && dndProduct.fromMeal && dndProduct.productId) {
      onRemoveProductFromMeal(
        dndProduct.productId, date, dndProduct.mealTime || 0,
      );
    }
  }

  private onBeginDrag = (props: { product: Product }) => {
    const dndProduct: DndProduct = {
      productId: props.product.id,
      mainNutrient: ph.getMainNutrient(props.product),
    };
    this.props.onStartDrag(dndProduct);
    return dndProduct;
  }

  private onEndDrag = () => this.props.onEndDrag();
}

export const GcProductsViewStyled =
  withStyles(stylesCallback, { withTheme: true })(GcProductsView);
