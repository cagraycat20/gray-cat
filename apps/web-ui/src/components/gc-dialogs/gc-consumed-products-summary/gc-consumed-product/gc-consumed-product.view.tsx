import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { mathUtils } from '../../..';
import {
  Consumed,
  ConsumedProductSummary,
  csn,
  GcText,
  NutrientPropName,
  Product,
  productUtils,
} from '../../../../shared';
import { formatValue } from '../../../../shared/utils/consumed-products-summary.utils';
import { GcProductImage, GcTooltip } from '../../../shared';
import { StyleProps, stylesCallback } from './gc-consumed-product.styles';

export interface OwnProps {
  product: ConsumedProductSummary;
  totalConsumed: Consumed;
  currency: string;
  onSetPriceClicked: (id: Product['id']) => void;
}

class GcConsumedProductView extends React.PureComponent<OwnProps & StyleProps> {

  private cardMediaContainerRef = React.createRef<HTMLDivElement>();
  private nutrientContainerRef?: HTMLDivElement;

  public componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  public render() {
    const { classes, product, totalConsumed, currency } = this.props;

    return (
      <Paper className={classes.productPaper}>
        <div className={classes.productPaperMainInfoContainer}>
          <div ref={this.cardMediaContainerRef}>
            <GcProductImage
                height={75}
                width={150}
                image={product.image}
                thumbnail={product.thumb}
                productName={product.name}
                className={classes.media}
            />
          </div>
          <div className={classes.productNameContainer}>
            <Typography className={classes.productName}>{product.name}</Typography>
            {product.moneySpent === null
              ?
                <Button
                  className={classes.setPriceButton}
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSetPriceButtonClick}
                >
                  Set price
                </Button>
              :
                <GcText
                  className={classes.moneySpent}
                  custom={{
                    color: 'grey',
                  }}
                >
                  {`Spent: ${product.moneySpent} ${currency} (${product.moneySpentPercentage}%)`}
                </GcText>
            }
            <GcText
              className={classes.productWeight}
              custom={{
                color: 'grey',
              }}
            >
              {`Consumed: ${formatValue(product.weight / 1000)} kg
              (${formatValue(product.weight / totalConsumed.weight * 100)}%)`}
            </GcText>
          </div>
        </div>
        <div className={classes.productNutrientsContainer}>
          <div className={classes.nutrientsRoot}>
            {this.renderNutrient('protein', product.protein, totalConsumed.protein)}
            {this.renderNutrient('fat', product.fat, totalConsumed.fat)}
            {this.renderNutrient('carbs', product.carbs, totalConsumed.carbs)}
            {this.renderNutrient('calories', product.calories, totalConsumed.calories)}
          </div>
        </div>
      </Paper>
    );
  }

  private renderNutrient = (nutrient: NutrientPropName, value: number, totalAmount: number) => {
    const { classes } = this.props;

    return (
      <GcTooltip
        title={productUtils.nutrientCaptions[nutrient] +
          (nutrient === 'calories' ? '' : ' (grams)')}
      >
        <div
          className={csn(classes.nutrientContainer, classes[nutrient])}
          ref={this.nutrientContainerCallbackRef}
        >
          <Typography className={classes.nutrientValue}>
            {
              formatValue(nutrient === 'calories' ? value : value / 1000)
              + (nutrient === 'calories' ? ' kcal' : ' kg'  )
            }
          </Typography>
          <Typography className={classes.nutrientPercentage}>
            {totalAmount > 0 ? mathUtils.round(value / totalAmount * 100) : 0}%
          </Typography>
          <div className={classes.nutrientPercentageShade} />
        </div>
      </GcTooltip>
    );
  }

  private nutrientContainerCallbackRef = (ref: HTMLDivElement) => {
    this.nutrientContainerRef = ref;
    this.setupProductImage();
  }

  private handleWindowResize = () => {
    this.setupProductImage();
  }

  private setupProductImage() {
    if (this.nutrientContainerRef && this.cardMediaContainerRef.current) {
      const { clientWidth } = this.nutrientContainerRef;

      this.cardMediaContainerRef.current.style.minWidth = clientWidth + 'px';
      this.cardMediaContainerRef.current.style.maxWidth = clientWidth + 'px';
    }
  }

  private handleSetPriceButtonClick = () => {
    this.props.onSetPriceClicked(this.props.product.id);
  }

}

export const GcConsumedProductViewStyled =
  withStyles(stylesCallback)(GcConsumedProductView);
