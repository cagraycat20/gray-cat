import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import {
  GcClickableItem,
  GcNumberTextField,
  LocalSettings,
  nutrientClasses,
  NutrientPropName,
  Product,
  productHelper as ph,
} from '..';
import {
  csn,
  GcText,
} from '../../shared';
import { logEvent } from '../../utils';
import { GcImageSelect } from '../gc-image-select/gc-image-select.view';
import { GcSpinner } from '../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-edit-product-dialog.styles';
import { Props } from './gc-edit-product-dialog.types';
import { getImages, GoogledImage } from './get-images';

const keyWordInputPaddingTop = 18.5;
const keyWordChipsContainerCorrection = 20;
const keyWordChipWidthCorrection = 35;
const maxNutrient = 100;
const maxCalories = 999;
// to avoid recreation
const productGag: State['product'] = {
  id: '',
  name: '',
  image: '',
  protein: '',
  fat: '',
  carbs: '',
  calories: '',
  comment: '',
  description: '',
};

interface State {
  originalProduct: LocalSettings['editingProduct'];
  product: {
    [K in (NutrientPropName | 'name' | 'image' | 'id' | 'comment' | 'description')]: string;
  };
  keyWords: Array<string>;
  showSpinner: boolean;
  onlyFree: boolean;
  isLoadingImages: boolean;
  images: Array<GoogledImage>;
  searchPhrase: string;
  isDialogStarting: boolean;
  isKeyWordInputFocused: boolean;
  shouldSetupKeyWords: boolean;
  problemsToDisplay: Array<string> | null;
}

class GcEditProductDialogView extends
  React.PureComponent<Props & StyleProps, State> {
  public static getDerivedStateFromProps(
    nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    if (nextProps.product && (prevState.originalProduct !== nextProps.product)) {
      let product: State['product'] = productGag; // biktop. check number of calls
      if (nextProps.product) {
        product = {
          id: nextProps.product.id,
          name: nextProps.product.name,
          image: nextProps.product.image || '',
          protein: nextProps.product.protein.toString(),
          fat: nextProps.product.fat.toString(),
          carbs: nextProps.product.carbs.toString(),
          calories: nextProps.product.calories.toString(),
          comment: nextProps.product.comment || '',
          description: nextProps.product.description || '',
        };
      }
      return {
        originalProduct: nextProps.product,
        product,
        searchPhrase: nextProps.product.name,
        isDialogStarting: true,
        images: [],
        keyWords: nextProps.product.keyWords ? nextProps.product.keyWords : [],
      };
    }
    return null;
  }

  public state: State = {
    originalProduct: null,
    product: productGag,
    keyWords: [],
    showSpinner: false,
    onlyFree: true,
    isLoadingImages: false,
    images: [] as Array<GoogledImage>,
    searchPhrase: '',
    isDialogStarting: true,
    isKeyWordInputFocused: false,
    shouldSetupKeyWords: true,
    problemsToDisplay: null,
  };

  private keyWordInputRef = React.createRef<HTMLInputElement>();
  private keyWordChipsContainerRef: HTMLDivElement | null = null;
  private keyWordChipRefs: Array<HTMLElement> = [];

  private changeNutrients = ph.nutrientProps.reduce(
    (result, iter) => {
      result[iter] = (event: React.ChangeEvent<HTMLInputElement>) =>
        this.changeStateProduct({ [iter]: event.target.value });
      return result;
    },
    {},
  );

  public componentDidUpdate() {
    if (this.props.isAdmin && this.state.isDialogStarting && this.state.originalProduct
      && !this.state.originalProduct.image) {

      this.setState({ isDialogStarting: false });
      this.searchImages(this.state.originalProduct.name);
    }

    if (this.keyWordChipsContainerRef && this.state.shouldSetupKeyWords) {
      this.setState({ shouldSetupKeyWords: false });
      this.setupKeyWords();
    }
  }

  public render(): JSX.Element {
    const { classes, product: propsProduct, products, isAdmin, mobileLayout } = this.props;
    const { product, keyWords, showSpinner, isLoadingImages,
      images, isKeyWordInputFocused } = this.state;

    let isNew = false;
    if (propsProduct) {
      isNew = !ph.findProduct(products, propsProduct.id);
    }

    return (
      <Dialog
        classes={{
          paper: isAdmin ? classes.rootWidened : classes.root,
        }}
        open={Boolean(propsProduct)}
        onClose={this.close}
        aria-labelledby="alert-dialog-title"
      >
        {showSpinner && <GcSpinner />}
        <DialogTitle
          id="alert-dialog-title"
          className={classes.header}
        >
          {
            isNew
              ? 'Create New Product'
              : `Edit "${propsProduct && propsProduct.name}"`
          }
          <Typography
            variant="caption"
            color="textSecondary"
          >
            {`${isNew
              ? 'This product'
              : 'Changes'
              } will be displayed only for you;
            other users will not see ${isNew ? 'it' : 'them'}`}
          </Typography>
        </DialogTitle>

        <DialogContent className={classes.content}>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12} md={isAdmin ? 7 : 12}>
              <TextField
                className={csn(classes.input, classes.name)}
                autoFocus={true}
                label="Product name"
                value={product.name}
                onChange={this.onChangeProductName}
                variant="outlined"
              />

              {(isAdmin || product.description) &&
                <TextField
                  className={csn(classes.input, classes.description)}
                  label="Description"
                  multiline={true}
                  rowsMax={4}
                  value={product.description}
                  onChange={this.onChangeDescription}
                  variant="outlined"
                />
              }

              <div className={classes.nutrientsContainer}>
                {
                  ph.nutrientProps.map((iter) => (
                    <GcNumberTextField
                      key={iter}
                      variant="outlined"
                      className={classes.nutrientInput}
                      label={
                        <div className={classes.nutrientLabelContainer}>
                          <div
                            className={csn(
                              nutrientClasses[iter],
                              classes.nutrientLabelMarker,
                            )}
                          />
                          {ph.nutrientCaptionsShort[iter]}
                        </div>}
                      value={product[iter]}
                      onChange={this.changeNutrients[iter]}
                      InputProps={{
                        inputProps: {
                          integerPartLength: iter === 'calories' ? 3 : 2,
                          decimalPartLength: 1,
                          max: iter === 'calories' ? maxCalories : maxNutrient,
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            {iter === 'calories' ? 'kcal' : 'grams'}
                          </InputAdornment>
                        ),
                        onFocus: (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.select(),
                      }}
                    />
                  ))
                }
              </div>

              <GcImageSelect
                image={product.image}
                mobileLayout={mobileLayout}
                onChange={(image) => this.changeStateProduct({ image })}
                onError={this.props.onError}
              />

              <div className={classes.keyWordsContainer}>
                <TextField
                  className={classes.keyWordInput}
                  variant="outlined"
                  label="Keywords"
                  placeholder="Keyword"
                  InputLabelProps={{
                    shrink: keyWords.length > 0 || isKeyWordInputFocused,
                  }}
                  inputRef={this.keyWordInputRef}
                  onKeyDown={this.handleKeyWordInputKeyDown}
                  onFocus={this.handleKeyWordInputFocus}
                  onBlur={this.handleKeyWordInputBlur}
                />

                <div
                  className={classes.keyWordChipsContainer}
                  ref={this.keyWordChipsContainerCallbackRef}
                >
                  {keyWords.map(this.renderKeyWordChip)}
                </div>
              </div>

              {isAdmin &&
                <div className={classes.commentContainer}>
                  <TextField
                    className={classes.commentInput}
                    multiline={true}
                    rowsMax={4}
                    variant="outlined"
                    label="Comment"
                    value={product.comment}
                    onChange={this.handleCommentChange}
                  />
                </div>
              }
            </Grid>
            {isAdmin &&
              <Grid
                item={true}
                xs={12}
                md={5}
                container={true}
                alignItems="center"
                className={classes.searchImageContainer}
              >
                <FormControlLabel
                  className={classes.onlyFreeImages}
                  control={
                    <Switch
                      checked={this.state.onlyFree}
                      onChange={this.switchOnlyFree}
                      value="onlyFree"
                      color="primary"
                    />
                  }
                  label="Only Free"
                />
                <TextField
                  margin="dense"
                  label="Search Image"
                  className={classes.inputSearchImage}
                  value={this.state.searchPhrase}
                  onChange={this.searchImageInputChange}
                  onKeyDown={this.searchImageInputKeyDown}
                />
                <Grid
                  item={true}
                  container={true}
                  alignItems="center"
                  justify="center"
                  className={classes.foundImageContainer}
                >
                  {isLoadingImages
                    ?
                    <CircularProgress />
                    :
                    <GridList cols={1} cellHeight={200} className={classes.imageList}>
                      {images.map((image) => (
                        <GridListTile
                          key={image.url}
                          className={csn({ [classes.selectedImage]: image.url === product.image })}
                        >
                          <img
                            onClick={() => this.changeStateProduct({ image: image.url })}
                            title={image.title}
                            alt={image.title}
                            src={image.thumbnail}
                          />
                          <GridListTileBar
                            title={image.title}
                            subtitle={image.description}
                            actionIcon={
                              <GcClickableItem
                                className={classes.icon}
                                onClick={() => window.open(image.sourceUrl, '_blank')}
                              >
                                <InfoIcon />
                              </GcClickableItem>}
                          />
                        </GridListTile>
                      ))}
                    </GridList>
                  }
                </Grid>
              </Grid>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.copyProduct}
            onClick={this.copyProductClick}
          >
            Create Copy
          </Button>
          <Button
            color="primary"
            onClick={this.close}
          >
            Cancel
          </Button>
          <Button
            disabled={!product.name}
            color="primary"
            autoFocus={true}
            onClick={this.submit}
          >
            {isNew ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
        {this.renderProblemsDialog(isNew)}
      </Dialog>
    );
  }

  private renderProblemsDialog = (isNew: boolean) => {
    const { problemsToDisplay } = this.state;
    const { classes } = this.props;
    return (
      <Dialog
        onClose={this.clearProblemsToDisplay}
        open={Boolean(problemsToDisplay)}
        classes={{
          paper: classes.problemsDialog,
        }}
      >
        <DialogTitle>The food you are trying to save might have some problems</DialogTitle>
        <DialogContent>
          <br />
          {problemsToDisplay && problemsToDisplay.map((problemIter, index) => (
            <GcText
              key={index}
              gutterBottom={true}
            >
              {` - ${problemIter}`}
            </GcText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.clearProblemsToDisplay}
          >
            {'Return to editing'}
          </Button>
          <Button
            color="primary"
            autoFocus={true}
            onClick={this.forceSubmit}
          >
            {`${isNew ? 'Create' : 'Save'} anyway`}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private keyWordChipsContainerCallbackRef = (ref: HTMLDivElement) => {
    this.keyWordChipsContainerRef = ref;
    this.setupKeyWords();
  }

  private keyWordChipCallbackRef = (ref: HTMLDivElement) => {
    if (ref) {
      this.keyWordChipRefs.push(ref.firstChild!.firstChild as HTMLElement);
    }
  }

  private renderKeyWordChip = (value: string) => {
    const { classes } = this.props;

    return (
      <div
        key={value}
        ref={this.keyWordChipCallbackRef}
        className={classes.keyWordChipContainer}
      >
        <Chip
          className={classes.keyWord}
          label={value}
          onDelete={this.handleKeyWordDelete(value)}
          variant="outlined"
        />
      </div>
    );
  }

  private close = () => {
    this.setState({
      originalProduct: null,
      images: [],
    });
    this.props.onClose();
  }

  private proceedSaving = (checkForProblems: boolean = true) => {
    const { product, keyWords } = this.state;
    const { product: propsProduct, onSubmit } = this.props;
    if (propsProduct) {
      const editedProduct: Product = {
        ...propsProduct,
        name: product.name,
        image: product.image,
        protein: parseFloat(product.protein),
        fat: parseFloat(product.fat),
        carbs: parseFloat(product.carbs),
        calories: parseFloat(product.calories),
        keyWords,
        comment: product.comment,
        description: product.description,
      };

      if (checkForProblems) {
        const problems = ph.validateProduct(editedProduct);
        if (problems) {
          this.setState({ problemsToDisplay: problems });
          return;
        }
      }

      this.setState({
        showSpinner: true,
        problemsToDisplay: null,
      });
      logEvent('SaveEditingProduct');
      onSubmit(editedProduct, () => this.setState({ showSpinner: false }));
    }
  }

  private submit = () => {
    this.proceedSaving();
  }

  private forceSubmit = () => {
    this.proceedSaving(false);
  }

  private changeStateProduct = (changes: Partial<State['product']>) =>
    this.setState({ product: { ...this.state.product, ...changes } })

  private onChangeProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.changeStateProduct({ name: event.target.value });
    this.setState({ searchPhrase: event.target.value });
  }

  private onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.changeStateProduct({ description: event.target.value });
  }

  private handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.changeStateProduct({ comment: event.target.value });
  }

  private handleKeyWordInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyWordInputValue = this.keyWordInputRef.current!.value;

    if (event.keyCode !== 13 || !keyWordInputValue) {
      return;
    }

    const { keyWords } = this.state;

    if (keyWords.indexOf(keyWordInputValue) === -1) {
      keyWords.push(keyWordInputValue);
    }

    const keyWordInputElement = event.target as HTMLInputElement;
    keyWordInputElement.value = '';
    keyWordInputElement.dispatchEvent(new Event('input', { bubbles: true }));

    this.setState({ keyWords: Object.assign([], keyWords), shouldSetupKeyWords: true });
  }

  private handleKeyWordInputFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      isKeyWordInputFocused: true,
    });
  }

  private handleKeyWordInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      isKeyWordInputFocused: false,
    });
  }

  private handleKeyWordDelete = (keyWord: string) => () => {
    const keyWords = this.state.keyWords.filter((value) => value !== keyWord);
    this.setState({ keyWords, shouldSetupKeyWords: true });
  }

  private switchOnlyFree = () => this.setState(({ onlyFree }) => ({ onlyFree: !onlyFree }));

  private searchImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState(({ searchPhrase: event.target.value }))

  private searchImageInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) =>
    event.keyCode === 13 && this.searchImages(this.state.searchPhrase)

  private copyProductClick = () => {
    if (this.state.originalProduct) {
      this.props.onCopyProduct(this.state.originalProduct!);
    }
  }

  private searchImages = async (query: string) => {
    if (!query) { return; }

    this.setState({ isLoadingImages: true });

    const { onlyFree } = this.state;

    try {
      const images = await getImages(query, onlyFree);
      this.setState({ images });
      if (!this.state.product.image && images.length) {
        this.changeStateProduct({ image: images[0].url });
      }
    } finally {
      this.setState({ isLoadingImages: false });
    }
  }

  private setupKeyWords() {
    this.setupKeyWordChips();
    this.setupKeyWordInput();
  }

  private setupKeyWordInput() {
    if (this.keyWordInputRef.current && this.keyWordChipsContainerRef) {
      const paddingTop =
        this.state.keyWords.length > 0
          ? this.keyWordChipsContainerRef.clientHeight + keyWordChipsContainerCorrection
          : 0
          + keyWordInputPaddingTop;

      this.keyWordInputRef.current.style.paddingTop = paddingTop + 'px';
    }
  }

  private setupKeyWordChips() {
    if (!this.keyWordChipsContainerRef) {
      return;
    }

    this.keyWordChipRefs.forEach((chip) => {
      chip.style.maxWidth = this.keyWordChipsContainerRef!.clientWidth - keyWordChipWidthCorrection + 'px';
      chip.style.textOverflow = 'ellipsis';
      chip.style.overflow = 'hidden';
      chip.style.whiteSpace = 'nowrap';
      chip.style.display = 'inline-block';
    });

    this.keyWordChipsContainerRef!.scrollTop = this.keyWordChipsContainerRef!.scrollHeight;
  }

  private clearProblemsToDisplay = () => this.setState({ problemsToDisplay: null });
}

export const GcEditProductDialogViewStyled =
  withStyles(stylesCallback)(GcEditProductDialogView);
