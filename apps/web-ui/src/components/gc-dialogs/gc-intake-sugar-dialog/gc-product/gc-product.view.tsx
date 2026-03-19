import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import {
  csn,
  GcText,
  nutrientClasses,
  NutrientPropName,
  productUtils,
} from '../../../../shared';
import { ConsumedProduct } from '../../../../shared/types/intake-sugar.types';
import { formatValue } from '../../../../shared/utils/consumed-products-summary.utils';
import {
  formattedAmountOfSugar,
  formattedWeight,
  percentageOfSugar,
} from '../../../../shared/utils/intake-sugar.utils';
import { GcProductImage, GcTooltip } from '../../../shared';
import { StyleProps, stylesCallback } from './gc-product.styles';

export interface OwnProps {
  product: ConsumedProduct;
}

class GcProductView extends React.PureComponent<OwnProps & StyleProps> {

  private cardMediaContainerRef = React.createRef<HTMLDivElement>();
  private nutrientContainerRef?: HTMLDivElement;

  public componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  public render() {
    const { classes, product } = this.props;
    const percentage = percentageOfSugar(product.carbs, product.weight);

    return (
      <Paper className={classes.paper}>
        <div className={classes.paperMainInfoContainer}>
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
            <GcText
              className={classes.productName}
            >
              {product.name}
            </GcText>
            <GcText custom={{color: 'grey', size: 'small'}}>
              {`Sugar: ${formattedAmountOfSugar(product.carbs)} (${percentage}%)`}
            </GcText>
            <div className={classes.caloriesBar}>
              <div
                className={csn(classes.caloriesBarContent, nutrientClasses.calories)}
                style={{
                  width: percentage + '%',
                }}
              />
              <GcText
                className={classes.caloriesBarStartLabel}
                custom={{color: 'grey', size: 'xsmall'}}
              >
                0
              </GcText>
              <GcText
                className={classes.caloriesBarEndLabel}
                custom={{color: 'grey', size: 'xsmall'}}
              >
                {formattedWeight(product.weight)}
              </GcText>
            </div>
          </div>
        </div>
        <div className={classes.nutrientsContainer}>
          <div className={classes.nutrientsRoot}>
            {this.renderNutrient('protein', product.protein)}
            {this.renderNutrient('fat', product.fat)}
            {this.renderNutrient('carbs', product.carbs)}
            {this.renderNutrient('calories', product.calories)}
          </div>
        </div>
      </Paper>
    );
  }

  private renderNutrient = (nutrient: NutrientPropName, value: number) => {
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
          <GcText
            className={classes.nutrientValue}
            custom={{color: 'white'}}
          >
            {
              formatValue(nutrient === 'calories' ? value : value / 1000)
            }
          </GcText>
          <GcText
            className={classes.nutrientUnit}
            custom={{size: 'xsmall'}}
          >
            {
              nutrient === 'calories' ? ' kcal' : ' kg'
            }
          </GcText>
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

}

export const GcProductViewStyled =
  withStyles(stylesCallback)(GcProductView);
