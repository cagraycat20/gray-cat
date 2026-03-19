import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import * as DnD from 'react-dnd';
import {
  ConsumedProduct,
  dayInfoHelper as dih,
  DndProduct,
  DnDTargetViewProps,
  GcClickableItem,
  GcProductCardWithWeight,
  GcProductDropArea,
  GcTimeInputDialog,
  GcTooltip,
  logRender,
  MAX_PRODUCT_WEIGHT,
  NutrientPropName,
  Point,
  Product,
  productHelper as ph,
  ProductWeight,
  PropsOf,
} from '..';
import { csn } from '../../shared';
import { dateUtils } from '../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-meal.styles';
import { Props } from './gc-meal.types';

interface State {
  menuAnchor?: HTMLElement;
  timeInputPoint: Point | null; }

type DndSource = 'meal' | 'favorites' | null;

const dropWeights = [50, 100];

class GcMealView extends React.PureComponent<
  Props &
  StyleProps &
  DnDTargetViewProps,
  State
> {
  public state: State = {
    timeInputPoint: null,
  };

  private prevDate: string = '';
  private prevProducts: Array<ConsumedProduct> = []; // for comparison
  private emergingProducts: Array<Product['id']> = []; // emerging after day change
  private addingProducts: Array<Product['id']> = []; // emerging after adding
  private productWithWeightDialog: Product['id'] = '';

  public render(): JSX.Element {
    logRender(this);
    const { classes, mealTime, mealName, isLast,
      connectDropTarget, onGetEditingProduct } = this.props;

    const { timeInputPoint } = this.state;

    // if we don't have a product to show editor for, we as parent if it has
    if (!this.productWithWeightDialog) {
      this.productWithWeightDialog = onGetEditingProduct(mealTime);
    }

    const dndSource = this.getDndSource();
    const renderedProducts = this.renderProducts();

    return connectDropTarget(
      <div className={classes.root}>
        <div
          className={csn(
            classes.container,
            {[classes.containerWithProducts]:
              (renderedProducts.length > 0) || Boolean(dndSource)},
          )}
        >
          <div className={classes.summary}>
            <div className={classes.time}>
              <GcClickableItem
                className={classes.timeButton}
                onClick={this.timeClick}
              >
                <Typography
                  className={classes.timeCaption}
                  variant={'subtitle1'}
                  noWrap={true}
                >
                  {dih.formatMealTime(mealTime)}
                </Typography>
              </GcClickableItem>
              {
                mealName &&
                <Typography
                  variant={'subtitle1'}
                  noWrap={true}
                >
                  {' - ' + mealName}
                </Typography>
              }
            </div>

            {this.renderNutrients()}

            <GcClickableItem
              className={classes.menuButton}
              onClick={this.menuButtonClick}
            >
              <MoreVertIcon />
            </GcClickableItem>
          </div>

          <div
            className={csn(
              classes.content,
              {[classes.contentWithProducts]:
                Boolean(dndSource) || (!isLast && (renderedProducts.length > 0))},
            )}
          >
            {
              Boolean(dndSource) &&
              this.renderDropArea(dndSource)
            }
            {renderedProducts}
          </div>
          {!isLast && <Divider light={true} />}
          {this.renderMenu()}
        </div>
        <GcTimeInputDialog
          key={'time-picker'}
          onSubmit={this.submitTimeInput}
          time={dateUtils.addMinutes(dateUtils.getStartOfToday(), mealTime)}
          point={timeInputPoint}
          onClose={this.closeTimeDialog}
        />
      </div>,
    );
  }

  private renderNutrients = () => {
    const { classes, consumedProducts, products } = this.props;
    const nutrients = ph.addUpNutrients(consumedProducts, products);
    return (
      <div className={classes.nutrientsRoot}>
        {ph.nutrientProps.map((nutrPropIter) =>
          this.renderNutrient(nutrPropIter, nutrients[nutrPropIter]))}
      </div>
    );
  }

  private renderNutrient(nutrient: NutrientPropName, value: number): JSX.Element | null {
    const {classes, theme} = this.props;

    return (
      <GcTooltip
        key={nutrient}
        title={ph.nutrientCaptions[nutrient] +
          (nutrient === 'calories' ? '' : ' (grams)')}
      >
        <div
          style={{backgroundColor:
              theme.custom.colors[nutrient] + (!value ? '60' : ''),
          }}
          className={classes.nutrientContainer}
        >
          <Typography className={classes.nutrientValue}>
            {ph.formatNutrientValue(value)}
          </Typography>
          <Typography className={classes.nutrientValueSuffix}>
            {nutrient === 'calories' ? 'kcal' : 'g'}
          </Typography>
        </div>
      </GcTooltip>
    );
  }

  private timeClick = (event: React.MouseEvent<Element>) => {
    this.setState({
      timeInputPoint: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  }

  private submitTimeInput = (time: Date) => {
    const newTime = dateUtils.getMealTime(time);
    this.props.onChangeMealTime(
      this.props.date,
      this.props.mealTime,
      newTime,
    );
    this.closeTimeDialog();
  }

  private closeTimeDialog = () => this.setState({timeInputPoint: null});

  private renderDropArea(dndSource: DndSource) {
    const { classes } = this.props;
    let existingWeight = 0;
    if (dndSource === 'favorites') {
      const item = this.props.dndMonitor.getItem() as DndProduct;
      const existingProduct = this.props.consumedProducts
        .find((iter) => iter.productId === item.productId);
      if (existingProduct) {
        existingWeight = existingProduct.productWeight;
      }
    }
    return (
      <div className={classes.dropContainer}>
        {
          (dndSource === 'meal') && [
            <GcProductDropArea
              key={'copy'}
              className={classes.dropArea}
              isOverClass={classes.dropAreaOver}
              onDndDrop={this.copyProductByDnd}
            >
              <Typography
                variant={'h4'}
                className={classes.dndCaptionColor}
              >
                COPY
              </Typography>
            </GcProductDropArea>,
            <GcProductDropArea
              key={'move'}
              className={classes.dropArea}
              isOverClass={classes.dropAreaOver}
              onDndDrop={this.moveProductByDnd}
            >
              <Typography
                variant={'h4'}
                className={classes.dndCaptionColor}
              >
                MOVE
              </Typography>
            </GcProductDropArea>,
          ]
        }
        {
          (dndSource === 'favorites') && [
              ...dropWeights.map((iter) =>
              (existingWeight + iter > MAX_PRODUCT_WEIGHT) ? null : (
                <GcProductDropArea
                  key={iter}
                  className={classes.dropArea}
                  isOverClass={classes.dropAreaOver}
                  onDndDrop={this.getProductDropHandler(iter)}
                >
                  <Typography
                    variant={'caption'}
                    align="center"
                    className={classes.dndCaptionColor}
                  >
                    Drop here to add
                  </Typography>
                  <Typography
                    variant={'h4'}
                    className={classes.dndCaptionColor}
                  >
                    {iter}g
                  </Typography>
                </GcProductDropArea>
            )),
            <GcProductDropArea
              key={'other-weight'}
              className={classes.dropArea}
              isOverClass={classes.dropAreaOver}
              onDndDrop={this.getProductDropHandler(
                dropWeights[1], true, !existingWeight)}
            >
              <Typography
                variant={'caption'}
                align="center"
                className={classes.dndCaptionColor}
              >
                {'Drop here to' + (existingWeight ? '' : ' add')}
              </Typography>
              <Typography
                variant={'h4'}
                className={classes.dndCaptionColor}
              >
                {existingWeight ? 'Change' : 'Other'}
              </Typography>
              <Typography
                variant={'caption'}
                className={classes.dndCaptionColor}
              >
                Weight
              </Typography>
            </GcProductDropArea>,
          ]
        }
      </div>
    );
  }

  private renderMenu() {
    const { menuAnchor } = this.state;

    return (
      <Menu
        onClick={this.menuClick}
        id="simple-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={this.closeMenu}
      >
        <MenuItem onClick={this.menuChangeTimeClick}>Change Time</MenuItem>
        <MenuItem onClick={this.menuSaveMealClick}>Save Meal</MenuItem>
        <MenuItem onClick={this.menuAddMealClick}>Add Saved Meal</MenuItem>
        <MenuItem onClick={this.menuRemoveMealClick}>Delete Meal</MenuItem>
      </Menu>
    );
  }

  private getDndSource: () => DndSource = () => {
    if (this.props.dndIsOver) {
      const item = this.props.dndMonitor.getItem() as DndProduct;
      if (item && item.productId) {
        if (item.fromMeal) {
          if (dih.sameMealTime(this.props.mealTime, item.mealTime)) {
            return null;
          }
          return 'meal';
        }
        return 'favorites';
      }
    }
    return null;
  }

  private getProductDropHandler = (
    productWeight: number,
    showWeightInput: boolean = false,
    needAddProduct: boolean = true,
  ) => {
    return (props: object, monitor: DnD.DropTargetMonitor) => {
      const item = monitor.getItem() as DndProduct;
      if (item && item.productId) {
        if (showWeightInput) {
          this.productWithWeightDialog = item.productId;
        }
        // adding only new products
        if (needAddProduct) {
          this.props.onChangeProductWeight(
            item.productId,
            productWeight,
            this.props.date,
            this.props.mealTime ? this.props.mealTime : 0,
            false,
          );
        }
      }
    };
  }

  private copyProductByDnd = (props: object, monitor: DnD.DropTargetMonitor) => {
    const item = monitor.getItem() as DndProduct;
    if (item && item.fromMeal && item.productId) {
      if (!dih.sameMealTime(this.props.mealTime, item.mealTime)) {
        this.props.onChangeProductWeight(
          item.productId,
          item.productWeight ?  item.productWeight : 100,
          this.props.date,
          this.props.mealTime ? this.props.mealTime : 0,
          false,
        );
      }
    }
  }

  private moveProductByDnd = (props: object, monitor: DnD.DropTargetMonitor) => {
    const item = monitor.getItem() as DndProduct;
    if (item && item.fromMeal && item.productId) {
      if (!dih.sameMealTime(this.props.mealTime, item.mealTime)) {
        this.props.onChangeProductWeight(
          item.productId,
          item.productWeight ?  item.productWeight : 100,
          this.props.date,
          this.props.mealTime ? this.props.mealTime : 0,
          false,
        );
        // removing
        this.props.onChangeProductWeight(
          item.productId,
          0,
          this.props.date,
          item.mealTime ? item.mealTime : 0,
        );
      }
    }
  }

  private menuClick = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation()

  private closeMenu = () => this.setState({menuAnchor: undefined});

  private menuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.setState({menuAnchor: event.currentTarget});
  }

  private menuChangeTimeClick = (event: React.MouseEvent<HTMLElement>) => {
    this.closeMenu();
    this.setState({
      timeInputPoint: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  }

  private menuSaveMealClick = () => {
    this.closeMenu();
    this.props.onSaveMeal(this.props.consumedProducts);
  }

  private menuAddMealClick = () => {
    this.closeMenu();
    this.props.onAddSavedMeal(this.props.date, this.props.mealTime, this.props.consumedProducts);
  }

  private menuRemoveMealClick = () => {
    this.closeMenu();
    this.props.onRemoveMeal(this.props.date, this.props.mealTime);
  }

  private renderProducts(): Array<React.ReactElement<Props>> {
    const { date, consumedProducts } = this.props;
    const result: Array<React.ReactElement<Props>> = [];

    consumedProducts.forEach((productWeightIter) => {
      if (this.prevDate !== date) {
        this.emergingProducts.push(productWeightIter.productId);
      } else {
        const prev = this.prevProducts.find((prevProdIter) =>
          prevProdIter.productId === productWeightIter.productId);
        if (!prev) {
          this.addingProducts.push(productWeightIter.productId);
        }
      }
      result.push(this.renderProduct(productWeightIter));
    });

    this.prevDate = date;
    this.prevProducts = [...consumedProducts];
    return result;
  }

  private renderProduct(productWeight: ProductWeight) {
    const { date, locked } = this.props;
    return (
      <GcProductCardWithWeight
        key={date + productWeight.productId}
        weightIsChanging={false}
        productId={productWeight.productId}
        productWeight={productWeight.productWeight}
        // to re-render if dropped existing prod.
        onNeedShowWeightInput={productWeight.productId === this.productWithWeightDialog
          ? this.needShowProdWeightInput
          : undefined
        }
        onChangeWeight={this.productCardWeightChange}
        onBeginDrag={this.productBeginDrag}
        onEndDrag={this.productEndDrag}
        onGetAppearanceType={this.getProductAppearanceType}
        onNeedScrollToProduct={this.needScrollToProduct}
        onRootAnimationEnd={this.productRootAnimationEnd}
        onMoveProduct={this.moveProduct}
        locked={locked}
      />
    );
  }

  private needScrollToProduct = (productId: Product['id']) => {
    return this.props.needScrollToProduct(productId, this.props.mealTime);
  }

  private moveProduct = (productId: Product['id'], newMealTime: number) => {
    const { onMoveProduct, mealTime, date } = this.props;
    if (onMoveProduct) {
      onMoveProduct(productId, date, mealTime, newMealTime);
    }
  }

  private needShowProdWeightInput = (productId: Product['id']) => {
    const result = productId === this.productWithWeightDialog;
    if (result) {
      this.productWithWeightDialog = ''; // we need to show dialog only once
    }
    return result;
  }

  private getProductAppearanceType:
    PropsOf<typeof GcProductCardWithWeight>['onGetAppearanceType'] =
  (productId: Product['id']) => {
    if (this.emergingProducts.indexOf(productId) > -1) {
      return 'emerge';
    } else if (this.addingProducts.indexOf(productId) > -1) {
      return 'add';
    } else {
      return null;
    }
  }

  private productBeginDrag = (props: PropsOf<typeof GcProductCardWithWeight>): DndProduct => {
    const dndProduct: DndProduct = {
      productId: props.productId,
      fromMeal: true,
      mealTime: this.props.mealTime,
      productWeight: props.productWeight,
    };
    this.props.onStartDrag(dndProduct);
    return dndProduct;
  }

  private productEndDrag = ()  => this.props.onEndDrag();

  private productRootAnimationEnd = (productId: Product['id']) => {
    this.emergingProducts = this.emergingProducts
      .filter((prodItIter) => prodItIter !== productId);
    this.addingProducts = this.addingProducts
      .filter((prodItIter) => prodItIter !== productId);
  }

  private productCardWeightChange = (productId: string, newWeight: number) =>
    this.props.onChangeProductWeight(
      productId,
      newWeight,
      this.props.date,
      this.props.mealTime,
    )
}

export const GcMealViewStyled =
  withStyles(stylesCallback, {withTheme: true})(GcMealView);
