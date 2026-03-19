import Card from '@material-ui/core/Card';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import {
  DndSourceInjectedProps,
  GcClickableItem,
  GcNumberInput,
  GcProductImage,
  GcTimeInputDialog,
  GcTooltip,
  keyboardEventHelper as keh,
  logRender,
  mathUtils,
  MAX_PRODUCT_WEIGHT,
  NutrientPropName,
  Point,
  productHelper as ph,
} from '..';
import { csn } from '../../shared';
import { dateUtils } from '../../shared';
import { logEvent } from '../../utils';
import {
  GcProductCardWithWeightStylesCallback,
  StyleProps,
} from './gc-product-card-with-weight.styles';
import { Props } from './gc-product-card-with-weight.types';

const autoExitEditingDelay = 10000;
const incValue = 5;

interface State {
  menuAnchorEl?: HTMLElement;
  pendingWeight: string;
  savedWeight?: number;
  editing?: boolean;
  timeInputPoint: Point | null;
}

class GcProductCardWithWeightView extends React.PureComponent<
  Props & StyleProps & DndSourceInjectedProps, State
  > {

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (prevState.savedWeight !== nextProps.productWeight) {
      return {
        pendingWeight: (nextProps.productWeight || 0).toString(),
        savedWeight: nextProps.productWeight,
      };
    }
    return null;
  }

  public state: State = {
    pendingWeight: '0',
    timeInputPoint: null,
  };

  private lastWeight: number = 0;
  private weightDiff: number = 0; // used for animation
  private isAppearing = true;
  private weightInput?: HTMLInputElement;
  private editingTimer?: number;
  private activityHandler$ = new Subject();
  private editingAfterMenuClose: boolean = false;
  private root: HTMLDivElement | null = null;
  private defaultTopRightButton = {
    icon: MoreVertIcon,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      this.setState({ menuAnchorEl: event.currentTarget });
    },
  };

  public componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), { captureDraggingState: true });
    }
    this.activityHandler$
      .pipe(throttleTime(500))
      .subscribe(this.restartEditingTimer);
  }

  public componentWillUnmount() {
    this.cancelTimer();
    this.activityHandler$.unsubscribe();
  }

  public componentDidUpdate() {
    const { onNeedScrollToProduct,
      product, afterScrollToProduct } = this.props;
    if (onNeedScrollToProduct && onNeedScrollToProduct(product.id)) {
      if (this.root) {
        this.root.scrollIntoView({ block: 'center' });
        afterScrollToProduct();
      }
    }
    this.autoShowWeightInputIfNeeded();
  }

  public render(): JSX.Element {
    logRender(this);
    const { classes, product, inFavorites, onMoveProduct,
      weightIsChanging, productWeight, onGetAppearanceType,
      showNutrients, onGetTopRightButton } = this.props;
    const { menuAnchorEl, pendingWeight,
      editing, timeInputPoint } = this.state;

    const topRightButton = onGetTopRightButton
      ? onGetTopRightButton(product.id, productWeight)
      : this.defaultTopRightButton;

    /* if changed then animation will restart, otherwise
    will use previous value, and if anim. was not finished it will continue. */
    this.weightDiff = (
      this.lastWeight && (productWeight - this.lastWeight)
    ) || this.weightDiff;
    this.lastWeight = productWeight;

    let appearanceClass;
    if (this.isAppearing) {
      if (onGetAppearanceType) {
        const appearanceType = onGetAppearanceType(product.id);
        if (appearanceType === 'emerge') {
          appearanceClass = classes.productEmerging;
        } else if (appearanceType === 'add') {
          appearanceClass = classes.productAdded;
        }
      }
      this.isAppearing = false;
    }

    return (
      <ClickAwayListener onClickAway={this.clickAway}>
        <div
          className={csn(classes.root, appearanceClass)}
          onAnimationEnd={this.rootAnimationEnd}
          onClick={this.rootClick}
          ref={this.rootRef}
        >
          {this.injectDnd(
            <div>
              <Card
                tabIndex={0}
                className={classes.card}
                onKeyDown={this.cardKeyDown}
              >
                <div className={classes.header}>
                  <Typography
                    className={classes.name}
                    variant="caption"
                    noWrap={true}
                  >
                    {product.name}
                  </Typography>
                  <GcClickableItem
                    className={classes.menuButton}
                    onClick={topRightButton.onClick}
                  >
                    {
                      React.createElement(topRightButton.icon, {
                        className: classes.menuIcon,
                      })
                    }
                  </GcClickableItem>
                </div>

                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={this.handleMenuClose}
                  onExited={this.menuExited}
                  disableRestoreFocus={true}
                >
                  <MenuItem onClick={this.changeWeightMenuClick}>Change Weight</MenuItem>
                  {
                    onMoveProduct &&
                    <MenuItem onClick={this.changeTimeMenuClick}>Move</MenuItem>
                  }
                  <MenuItem onClick={this.editMenuClick}>Edit</MenuItem>
                  <MenuItem onClick={this.removeMenuClick}>Remove</MenuItem>
                  {
                    !inFavorites &&
                    <MenuItem onClick={this.addToFavoritesClick}>Add to Favorites</MenuItem>
                  }
                </Menu>
                <GcTimeInputDialog
                  point={timeInputPoint}
                  onSubmit={this.submitTimeInput}
                  onClose={this.timeInputClose}
                />

                <GcProductImage
                  className={csn(
                    classes.media,
                    { [classes.mediaEditing]: editing },
                  )}
                  image={product.image}
                  thumbnail={product.thumb}
                  productName={product.name}
                  width={230}
                  height={110}
                />

                {this.renderNutrients()}

                <div
                  className={csn(
                    classes.weightEditingLine,
                    { [classes.weightEditingLineHidden]: !editing },
                  )}
                >
                  <GcClickableItem
                    className={csn(
                      classes.weightEditingButton,
                      { [classes.weightEditingButtonHiddenLeft]: !editing },
                    )}
                    onClick={this.decWeightClick}
                    classes={{
                      label: classes.weightEditingButtonLabel,
                    }}
                  >
                    <RemoveIcon className={classes.weightIcon} />
                  </GcClickableItem>

                  <GcClickableItem
                    className={csn(
                      classes.weightEditingButton,
                      { [classes.weightEditingButtonHiddenRight]: !editing },
                    )}
                    onClick={this.incWeightClick}
                    classes={{
                      label: classes.weightEditingButtonLabel,
                    }}
                  >
                    <AddIcon className={classes.weightIcon} />
                  </GcClickableItem>
                </div>
              </Card>
            </div>,
          )}
          <GcTooltip title={'Product weight (grams)'}>
            <div
              className={csn(
                classes.weightContainer,
                {
                  [classes.weightPending]: weightIsChanging,
                  [classes.weightContainerCentered]: editing && !showNutrients,
                  [classes.weightContainerCenteredWithNutr]: editing && showNutrients,
                  [classes.weightContainerWithNutr]: showNutrients,
                },
              )}
            >
              {
                Boolean(this.weightDiff) &&
                <div
                  key={'prod-weight-anim' + productWeight}
                  className={csn(
                    classes.weightChange,
                    {
                      [classes.weightInc]: this.weightDiff > 0,
                      [classes.weightDec]: this.weightDiff < 0,
                    },
                  )}
                  onAnimationEnd={this.weightAnimationEnd}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.weightValue}
                  >
                    {(this.weightDiff > 0 ? '+' : '') + this.weightDiff}
                  </Typography>
                </div>
              }

              <GcNumberInput
                className={csn(classes.weightInput, classes.weightValue)}
                inputRef={this.weightInputRef}
                value={pendingWeight}
                max={MAX_PRODUCT_WEIGHT}
                min={1}
                onChange={this.changePendingWeightValue}
                onKeyDown={this.weightInputKeyDown}
              />
              <Typography className={classes.weightSuffix}>
                g
              </Typography>
            </div>
          </GcTooltip>
        </div>
      </ClickAwayListener>
    );
  }

  private renderNutrients = () => {
    const { classes, showNutrients } = this.props;
    const { editing } = this.state;
    return (
      <div
        className={csn(
          classes.dynamicFooter,
          { [classes.dynamicFooterRaised]: editing || showNutrients },
        )}
      >
        <div className={classes.nutrientsRoot}>
          {ph.nutrientProps.map((nutrPropIter) => this.renderNutrient(nutrPropIter))}
        </div>
      </div>
    );
  }

  private renderNutrient(nutrient: NutrientPropName): JSX.Element | null {
    const { classes, theme, product } = this.props;
    const { pendingWeight } = this.state;
    if (!product) {
      return null;
    }

    const value =
      mathUtils.round(parseFloat(pendingWeight) * product[nutrient] / 100) || 0;

    return (
      <GcTooltip
        key={nutrient}
        title={ph.nutrientCaptions[nutrient] +
          (nutrient === 'calories' ? '' : ' (grams)')}
      >
        <div
          style={{
            backgroundColor:
              theme.custom.colors[nutrient] +
              (!product[nutrient] ? '60' : ''),
          }}
          className={classes.nutrientContainer}
        >
          <Typography className={classes.nutrientValue}>
            {ph.formatNutrientValue(value)}
          </Typography>
        </div>
      </GcTooltip>
    );
  }

  // tslint:disable-next-line: no-any
  private injectDnd = (content: React.ReactElement<any>) =>
    this.props.connectDragSource
      ? this.props.connectDragSource(content)
      : content

  private timeInputClose = () => this.setState({ timeInputPoint: null });

  private submitTimeInput = (time: Date) => {
    const newTime = dateUtils.getMealTime(time);
    const { onMoveProduct, productId } = this.props;
    if (onMoveProduct) {
      onMoveProduct(productId, newTime);
    }
    this.timeInputClose();
  }

  private clickAway = () => {
    if (this.state.editing) {
      this.submitWeightInput();
      this.setEditingMode(false);
    }
  }

  private cancelTimer = () => {
    if (this.editingTimer) {
      clearTimeout(this.editingTimer);
      this.editingTimer = undefined;
    }
  }

  private editingTimerHandler = () => {
    this.submitWeightInput();
    this.setEditingMode(false);
  }

  private restartEditingTimer = () => {
    this.cancelTimer();
    this.editingTimer =
      window.setTimeout(this.editingTimerHandler, autoExitEditingDelay);
  }

  private rootRef = (root: HTMLDivElement | null) => {
    if (root) {
      this.root = root;
    }
  }

  private rootClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.activate();
  }

  private activate = () => {
    if (!this.state.editing) {
      this.setEditingMode(true);
    }
    this.activityHandler$.next();
  }

  private cardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (keh.getKey(event) === keh.keys.Escape) {
      this.setState({ pendingWeight: this.props.productWeight.toString() });
      this.setEditingMode(false);
    } else {
      this.activate();
    }
  }

  private incWeightClick = (event: React.MouseEvent<Element>) => {
    const value = parseFloat(this.state.pendingWeight) || 0;
    this.setState(
      { pendingWeight: this.weightWithinConstraints(value + incValue).toString() },
      this.submitWeightInput,
    );
  }

  private decWeightClick = (event: React.MouseEvent<Element>) => {
    const value = parseFloat(this.state.pendingWeight) || 0;
    this.setState(
      { pendingWeight: this.weightWithinConstraints(value - incValue).toString() },
      this.submitWeightInput,
    );
  }

  private rootAnimationEnd = () => {
    if (this.props.onRootAnimationEnd) {
      this.props.onRootAnimationEnd(this.props.productId);
    }
    this.autoShowWeightInputIfNeeded();
  }

  private weightAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) =>
    this.weightDiff = 0

  private handleMenuClose = (event: React.SyntheticEvent<HTMLElement>) => {
    this.setState({ menuAnchorEl: undefined });
    this.stopPropagation(event);
  }

  private stopPropagation = (event: React.SyntheticEvent<Element>) => event.stopPropagation();

  private setEditingMode = (editing: boolean) => {
    if (editing) {
      this.activityHandler$.next();
    } else {
      this.cancelTimer();
    }
    this.setState({ editing }, this.editingModeCallback);
  }

  private editingModeCallback = () => {
    if (this.weightInput) {
      if (this.state.editing) {
        this.weightInput.focus();
        this.weightInput.select();
      } else {
        this.weightInput.blur();
      }
    }
  }

  private autoShowWeightInputIfNeeded = () => {
    if (this.props.onNeedShowWeightInput) {
      if (this.props.onNeedShowWeightInput(this.props.productId)) {
        this.setEditingMode(true);
      }
    }
  }

  private changePendingWeightValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pendingWeight: event.target.value });
    if (!this.state.editing) {
      this.setEditingMode(true);
    }
  }

  private weightInputRef = (element: HTMLInputElement) => {
    this.weightInput = element;
  }

  private weightWithinConstraints(weight: number) {
    return Math.max(1, Math.min(MAX_PRODUCT_WEIGHT, weight));
  }

  private weightInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.activityHandler$.next();
    const key = keh.getKey(event);
    if (key === keh.keys.Enter) {
      if (event.currentTarget.checkValidity()) {
        this.submitWeightInput();
        if (event.ctrlKey) {
          if (this.weightInput) {
            this.weightInput.select();
          }
        } else {
          this.setEditingMode(false);
        }
      }
    } else if (key === keh.keys.ArrowDown) {
      this.setState({
        pendingWeight: this.weightWithinConstraints(
          parseFloat(this.state.pendingWeight) - 1).toString(),
      });
    } else if (key === keh.keys.ArrowUp) {
      this.setState({
        pendingWeight: this.weightWithinConstraints(
          parseFloat(this.state.pendingWeight) + 1).toString(),
      });
    }
  }

  private submitWeightInput = () => {
    const { productWeight, onChangeWeight, product, locked } = this.props;
    if (!onChangeWeight) {
      return;
    }
    const pendingWeight = Math.round(parseFloat(this.state.pendingWeight) || 0);
    if (!pendingWeight) {
      this.setState({ pendingWeight: productWeight.toString() }); // revert to the previous value
    } else if ((pendingWeight !== productWeight)) {
      logEvent('ChangeProductWeight');
      onChangeWeight(product.id, pendingWeight);
      if (locked) {
        this.setState({ savedWeight: undefined }); // will reset pendingWeight
      }
    } else {
      // convert string->number->string removes redundant chars such as leading zeros
      this.setState({ pendingWeight: pendingWeight.toString() });
    }
  }

  private changeWeightMenuClick = (event: React.SyntheticEvent<HTMLElement>) => {
    this.handleMenuClose(event);
    this.editingAfterMenuClose = true;
  }

  private changeTimeMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    this.handleMenuClose(event);
    this.setState({
      timeInputPoint: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  }

  private menuExited = () => {
    if (this.editingAfterMenuClose) {
      this.editingAfterMenuClose = false;
      this.setEditingMode(true);
    }
  }

  private addToFavoritesClick = (event: React.SyntheticEvent<HTMLElement>) => {
    this.handleMenuClose(event);
    if (this.props.onAddToFavorites) {
      this.props.onAddToFavorites(this.props.product);
    }
  }

  private removeMenuClick = (event: React.SyntheticEvent<HTMLElement>) => {
    this.handleMenuClose(event);
    const { onChangeWeight, product } = this.props;
    if (onChangeWeight) {
      onChangeWeight(product.id, 0);
    }
  }

  private editMenuClick = (event: React.SyntheticEvent<HTMLElement>) => {
    this.handleMenuClose(event);
    const { onEditProduct, product } = this.props;
    if (onEditProduct) {
      logEvent('CardWithWeight-OpenProductEditing');
      onEditProduct(product);
    }
  }
}

export const GcProductCardWithWeightViewStyled =
  withStyles(
    GcProductCardWithWeightStylesCallback,
    { withTheme: true },
  )(GcProductCardWithWeightView);
