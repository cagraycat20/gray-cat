import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import {
  GcClickableItem,
  GcNumberInput,
  GcProductImage,
  mathUtils,
  nutrientClasses,
  NutrientPropName,
  Product,
  productHelper as ph,
  ProductPrice,
} from '../../..';
import { csn } from '../../../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-prices-card.styles';

export interface Props {
  productPrice: ProductPrice;
  products: Array<Product>;
  priceSuffix: string;
  onChange: (change: ProductPrice & {deleted?: boolean}) => void;
}

export interface State {
}

class GcProductPricesCardView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  private product?: Product;

  public render(): JSX.Element | null {
    const { classes, productPrice, priceSuffix } = this.props;

    const product = this.getProduct();
    if (!product) {
      // tslint:disable-next-line: no-console
      console.error(`Product with id:${productPrice.productId} was not found`);
      return null;
    }

    return (
      <Paper className={classes.root}>
        <div className={classes.content}>
          <GcProductImage
             className={classes.img}
             image={product.image}
             thumbnail={product.thumb}
             productName={product.name}
             width={100}
             height={100}
          />

          <div className={classes.infoContainer}>
            <div className={classes.nameRow}>
              <Typography className={classes.name}>
                {product.name}
              </Typography>
              <GcClickableItem
                onClick={this.delete}
              >
                <CloseIcon fontSize="small" />
              </GcClickableItem>
            </div>

            <div className={classes.weightRow}>
                <div
                  className={classes.inputContainer}
                  onClick={this.focusInput}
                >
                  <GcNumberInput
                    className={classes.input}
                    value={productPrice.productWeight}
                    max={10000}
                    min={1}
                    onFocus={this.selectOnFocus}
                    onChange={this.weightChange}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => 1}
                  />

                <Typography className={classes.inputSuffix}>
                  grams
                </Typography>
                </div>

                <Typography
                  variant="h6"
                >
                  =
                </Typography>

                <div
                  className={classes.inputContainer}
                  onClick={this.focusInput}
                >
                  <GcNumberInput
                    className={classes.input}
                    value={productPrice.price}
                    max={10000}
                    min={1}
                    decimalPartLength={2}
                    onChange={this.priceChange}
                    onFocus={this.selectOnFocus}
                  />
                  <Typography className={classes.inputSuffix}>
                    {priceSuffix || '$'}
                  </Typography>
                </div>

            </div>
          </div>
        </div>
        <div className={classes.nutrientsRow}>
          {ph.nutrientProps.map(this.renderNutrient)}
        </div>
      </Paper>
    );
  }

  private renderNutrient = (nutrient: NutrientPropName) => {
    const { classes, productPrice, priceSuffix } = this.props;

    let product = this.getProduct();
    if (!product) {
      product = ph.createProduct();
    }

    return (
      <div
        key={nutrient}
        className={csn(
          nutrientClasses[nutrient],
          classes.nutrient,
        )}
      >
        <div className={classes.nutrientPriceValueContainer}>
          <Typography
            color="inherit"
          >
            {
              product[nutrient]
                ? mathUtils.formatValue(
                  ph.getNutrientPrice(product[nutrient], productPrice), 2)
                : '-'
            }
          </Typography>
          <Typography
            className={classes.nutrientPriceValueSuffix}
            color="inherit"
          >
            {Boolean(product[nutrient]) && (priceSuffix || '$')}
          </Typography>
        </div>

        <Typography
          className={classes.nutrientPriceSuffix}
          color="inherit"
        >
          {
            product[nutrient]
              ? (nutrient === 'calories' ? 'per 1kcal' : 'per 1g')
              : '-'
          }
        </Typography>
      </div>
    );
  }

  private getProduct = () => {
    if (!this.product || this.product.id !== this.props.productPrice.productId) {
      this.product = ph.findProduct(
        this.props.products,
        this.props.productPrice.productId,
      );
    }
    return this.product;
  }

  private delete = () => {
    this.props.onChange({
      ...this.props.productPrice,
      deleted: true,
    });
  }

  private priceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({
      ...this.props.productPrice,
      price: event.currentTarget.valueAsNumber || 0,
    });
  }

  private weightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.props.onChange({
        ...this.props.productPrice,
        productWeight: event.currentTarget.valueAsNumber || 0,
      });
  }

  private selectOnFocus =
    (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.select()

  private focusInput =
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.currentTarget.children && event.currentTarget.children.length) {
        (event.currentTarget.children[0] as HTMLInputElement).focus();
      }
    }
}

export const GcProductPricesCardViewStyled =
  withStyles(stylesCallback)(GcProductPricesCardView);
