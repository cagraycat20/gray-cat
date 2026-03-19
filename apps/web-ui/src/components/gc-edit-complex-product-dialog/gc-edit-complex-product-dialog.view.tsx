import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
  Subject,
  Subscription,
} from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import {
  emptyNutrientClasses,
  GcClickableItem,
  GcDialog,
  GcFilteredProducts,
  GcProductCard,
  GcProductCardWithWeight,
  GcSpinner,
  GcTooltip,
  globalClasses,
  logError,
  logRender,
  nutrientClasses,
  NutrientPropName,
  Product,
  productHelper as ph,
  ProductWeight,
  upsError,
} from '..';
import { csn } from '../../shared';
import { logEvent } from '../../utils';
import { DrawPitchedTilesConfig, getPitchedTilesImage } from '../../utils/image/draw-pitched-tiles.utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-edit-complex-product-dialog.styles';
import { Props } from './gc-edit-complex-product-dialog.types';

const maxImageCount = 4;

const pitchedTilesConfig: DrawPitchedTilesConfig = {
  backgroundColor: 'white',
  canvasSize: {
    w: 1200,
    h: 630,
  },
  pitch: 50,
  borderWidth: 15,
};

interface State {
  ingredients: Array<ProductWeight>;
  dishName: string;
  searching: boolean;
  searchEditingText: string;
  searchText: string;
  showSpinner?: boolean;
  prevInitialProduct?: Props['editingProduct'];
}

class GcEditComplexProductDialogView extends
  React.PureComponent<Props & StyleProps, State> {

  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (prevState.prevInitialProduct !== nextProps.editingProduct) {
      const stateChanges: Partial<State> = {
        prevInitialProduct: nextProps.editingProduct,
      };
      if (nextProps.editingProduct) {
        stateChanges.dishName = nextProps.editingProduct.name;
        if (nextProps.editingProduct.ingredients) {
          stateChanges.ingredients = nextProps.editingProduct.ingredients
            .map((iter) => ({ ...iter }));
        }
      }
      return stateChanges;
    }
    return null;
  }

  public state: State = {
    ingredients: [],
    dishName: '',
    searching: false,
    searchEditingText: '',
    searchText: '',
  };

  private scrollBars?: Scrollbars;
  private searchingWasShowed = false;
  private addedProductId: Product['id'] | null = null;

  private inputHandler$ = new Subject();
  private subscriptions = new Subscription();

  public componentDidMount() {
    this.subscriptions.add(this.inputHandler$
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
    const { classes, editingProduct: initialProduct, onClose } = this.props;
    const { searching, dishName, ingredients, showSpinner } = this.state;

    return (
      <>
        <GcDialog
          contentClassName={classes.dialogContent}
          open={Boolean(initialProduct)}
          okButtonText="Save"
          noMaxWidth={true}
          okButtonIsInactive={
            (ingredients.length < 2) ||
            (dishName.trim().length < 1)
          }
          onClose={onClose}
          onOkClick={this.saveProduct}
        >
          {showSpinner && <GcSpinner />}
          <div
            className={csn(
              classes.contentContainer,
              { [classes.contentContainerInSearchMode]: searching },
            )}
          >
            {this.renderMainPage()}
            {this.renderSearchPage()}
          </div>
        </GcDialog>
      </>
    );
  }

  private renderMainPage = () => {
    const { classes, products, editingProduct, onClose } = this.props;
    const { dishName } = this.state;

    let isNew = false;
    if (editingProduct) {
      isNew = !ph.findProduct(products, editingProduct.id);
    }

    const ingredients = this.renderIngredients();
    this.addedProductId = null;

    return (
      <>
        <div className={classes.header}>
          <Typography
            className={globalClasses.gcWhiteText}
            variant="h6"
          >
            {
              isNew
                ? 'Create New Dish'
                : 'Edit Dish'
            }
          </Typography>
          <GcClickableItem
            tabIndex={-1}
            className={classes.headerButton}
            onClick={onClose}
          >
            <CloseIcon className={globalClasses.gcWhiteText} />
          </GcClickableItem>
        </div>
        <div className={classes.content}>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            Your dishes will be displayed only for you;
            other users will not see them.
          </Typography>
          <TextField
            className={csn(classes.nameInput, classes.scrollPadding)}
            autoFocus={true}
            label="Dish name"
            value={dishName}
            onChange={this.nameChange}
            variant="outlined"
          />
          <div className={classes.ingredientsContainer}>

            {this.renderNutrients()}

            <Divider className={classes.ingredientsDivider} />

            <Typography
              className={classes.ingredientsCaption}
              variant="subtitle1"
            >
              Ingredients
            </Typography>

            {ingredients}
          </div>
        </div>
      </>
    );
  }

  private renderSearchResultProduct = (product: Product) => {

    return (
      <div
        key={product.id}
        className={this.props.classes.searchPageProductContainer}
      >
        <GcProductCard
          product={product}
          onClick={this.productCardClick}
        />
      </div>
    );
  }

  private renderExceededLimit = () => {
    return (
      <Typography
        className={this.props.classes.searchPageExceedTheLimit}
        variant="button"
      >
        and more...
      </Typography>
    );
  }

  private renderSearchPage = () => {
    const { classes } = this.props;
    // only simple products should be shown as possible ingredients
    const simpleProducts = this.props.products.filter((product) => !product.ingredients);
    const { searchEditingText, searchText } = this.state;
    return (
      <div className={classes.searchPageRoot}>
        <div className={csn(classes.header, classes.searchPageHeader)}>
          <GcClickableItem
            tabIndex={-1}
            className={csn(classes.headerButton, classes.searchHeaderBackButton)}
            onClick={this.goToMainPage}
          >
            <ArrowBackIcon className={globalClasses.gcWhiteText} />
          </GcClickableItem>

          <div className={classes.searchPageInputContainer}>
            <SearchIcon className={classes.searchPageSearchIcon} />
            <InputBase
              classes={{
                root: classes.searchPageInputRoot,
                input: classes.searchPageInput,
                focused: classes.searchPageInputRootFocused,
              }}
              inputProps={{
                tabIndex: -1,
              }}
              value={searchEditingText}
              onChange={this.searchingInputChange}
              placeholder="Search Ingredient"
            />
            {
              searchEditingText &&
              <ClearIcon
                className={classes.searchPageClearIcon}
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
                products={simpleProducts}
                limit={24}
                renderForEmptyFilter={true}
                onRenderProduct={this.renderSearchResultProduct}
                onRenderExceededLimit={this.renderExceededLimit}
              />
            }
          </div>
        </Scrollbars>
      </div>
    );
  }

  private renderNutrients = () => {
    const { classes, products } = this.props;
    const { ingredients } = this.state;
    const nutrients = ph.addUpNutrientsPerWeight(ingredients, products, 100);

    return (
      <>
        <div className={classes.nutrientsRoot}>
          {ph.nutrientProps.map((nutrPropIter) =>
            this.renderNutrient(nutrPropIter, nutrients[nutrPropIter]))}
        </div>

        <Typography
          className={classes.nutrientsHint}
          variant="caption"
        >
          Nutrition value is calculated for 100g of the dish
        </Typography>
      </>
    );
  }

  private renderNutrient(nutrient: NutrientPropName, value: number): JSX.Element | null {
    const { classes } = this.props;

    return (
      <GcTooltip
        key={nutrient}
        title={ph.nutrientCaptions[nutrient] +
          (nutrient === 'calories' ? '' : ' (grams)')}
      >
        <div
          className={csn(
            classes.nutrientContainer,
            value ? nutrientClasses[nutrient] : emptyNutrientClasses[nutrient],
          )}
        >
          <Typography className={classes.nutrientName}>
            {ph.nutrientCaptionsShort[nutrient]}
          </Typography>
          <div className={classes.nutrientValueContainer}>
            <Typography
              className={csn(globalClasses.gcWhiteText, classes.nutrientValue)}
            >
              {ph.formatNutrientValue(value)}
            </Typography>
            {
              nutrient !== 'calories' &&
              <Typography className={classes.nutrientValueSuffix} >
                g
              </Typography>
            }
          </div>
        </div>
      </GcTooltip>
    );
  }

  private renderProductCardWithWeight = (productWeight: ProductWeight) => {
    let isAdded = productWeight.productId === this.addedProductId;
    return (
      <GcProductCardWithWeight
        key={productWeight.productId}
        productId={productWeight.productId}
        productWeight={productWeight.productWeight}
        onChangeWeight={this.productWeightChange}
        onGetTopRightButton={this.getProductCardTopRightButton}
        onNeedShowWeightInput={() => {
          const result = isAdded;
          isAdded = false;
          return result;
        }}
        onGetAppearanceType={() => isAdded ? 'add' : null}
      />
    );
  }

  private renderIngredients = () => {
    const { classes } = this.props;
    const { ingredients } = this.state;
    return (
      <Scrollbars
        className={classes.ingredientScrollBars}
        ref={this.scrollBarRef}
      >
        <div className={classes.ingredients}>
          {ingredients.map(this.renderProductCardWithWeight)}
          <Typography
            variant="button"
            className={classes.addNewCard}
            color="primary"
            onClick={this.goToSearchPage}
          >
            Add Ingredient
          </Typography>
        </div>
      </Scrollbars>
    );
  }

  private productWeightChange = (productId: string, newWeight: number) => {
    const ingredients = this.state.ingredients.reduce(
      (result: State['ingredients'], iter) => {
        if (iter.productId === productId) {
          if (newWeight) {
            result.push({ productId, productWeight: newWeight });
          }
        } else {
          result.push(iter);
        }
        return result;
      },
      [],
    );
    this.setState({ ingredients });
  }

  private nameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ dishName: event.currentTarget.value })

  private saveProduct = () => {
    const { products, editingProduct: initialProduct } = this.props;

    if (!initialProduct) {
      return;
    }

    const { ingredients, dishName } = this.state;
    const nutrients = ph.addUpNutrientsPerWeight(ingredients, products, 100);
    const product: Product = {
      ...initialProduct,
      ...nutrients,
      name: dishName,
      ingredients,
    };
    this.setState(
      { showSpinner: true },
      () => this.submit(
        product,
        () => this.setState({ showSpinner: false }),
      ));
  }

  private submit = async (product: Product, onComplete?: () => void) => {
    try {
      const image = await this.getProductImage();

      this.props.onPostProductComplete(
        await ph.postProduct({ ...product, image }),
      );
      logEvent('PostNewDish');
      this.props.onClose();
    } catch (e) {
      logError(e);
      this.props.onError(upsError);
    }

    if (onComplete) {
      onComplete();
    }
  }

  private goToMainPage = () => this.setState({ searching: false });

  private searchingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchEditingText: event.currentTarget.value });
    this.inputHandler$.next();
  }

  private clearSearch = () => {
    this.setState({ searchEditingText: '' });
    this.inputHandler$.next();
  }

  private scrollBarRef = (ref: Scrollbars) => {
    if (ref) {
      this.scrollBars = ref;
    }
  }

  private goToSearchPage = () => {
    this.searchingWasShowed = true;
    if (this.state.searchEditingText) {
      this.setState({
        searchEditingText: '',
        searching: true,
      });
      this.inputHandler$.next();
    } else {
      this.setState({ searching: true });
    }
  }

  private productCardClick = (element: HTMLElement, productId: Product['id']) => {
    const existingIngredient =
      this.state.ingredients.find((iter) => iter.productId === productId);
    const ingredients = [
      ...this.state.ingredients.filter((iter) => iter.productId !== productId),
      {
        productId,
        productWeight: existingIngredient
          ? existingIngredient.productWeight : 100,
      },
    ];
    this.addedProductId = productId;
    this.setState(
      {
        ingredients,
        searching: false,
      },
      () => {
        if (this.scrollBars) {
          this.scrollBars.scrollToBottom();
        }
      });
  }

  private getProductCardTopRightButton = (
    productId: ProductWeight['productId'],
  ) => {
    return {
      icon: ClearIcon,
      onClick: () => {
        const newIngredients = this.state.ingredients.filter(
          (iter) => iter.productId !== productId);
        this.setState({ ingredients: newIngredients });
      },
    };
  }

  private getProductImage = async () => {
    const { ingredients } = this.state;
    const { products } = this.props;

    const images = ingredients
      .sort((a, b) => b.productWeight - a.productWeight)
      .map(({ productId }) => {
        const prod = ph.findProduct(products, productId);
        return (prod && prod.image) || '';
      })
      .filter((img) => img)
      .slice(0, maxImageCount);

    return await getPitchedTilesImage(images, pitchedTilesConfig);
  }

}

export const GcEditComplexProductDialogViewStyled =
  withStyles(stylesCallback)(GcEditComplexProductDialogView);
