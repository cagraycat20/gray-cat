import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import UseProductIcon from '@material-ui/icons/TransitEnterexit';
import ViewListIcon from '@material-ui/icons/ViewList';
import * as React from 'react';
import {
  colors,
  csn,
  GcText,
  globalClasses,
  nutrientClasses,
  NutrientPropName,
  productUtils as pu,
} from '../../../../web-ui/src/shared';
import { mathUtils } from '../../../../web-ui/src/shared/utils/math.utils';
import { CaloriesFromNutrients, Product } from '../../types';
import { ProductPageData } from '../../types';
import { GcProductImage } from '../gc-product-image/gc-product-image';
import { GcPage } from '../shared/gc-page/gc-page.view';
import { imageSize, StyleProps, stylesCallback } from './gc-product-page.style';
import { GcSimilarProduct } from './gc-similar-product/gc-similar-product.view';

interface GcProductPageProps {
  productData: ProductPageData;
}

const maxCalories = 900;
const maxCaloriesForTimeToEat = 150;

function getCaloriesFromNutrients(product: Product): CaloriesFromNutrients {
  return {
      protein: mathUtils.round(product.protein * pu.nutrientCalories.protein, 1),
      fat: mathUtils.round(product.fat * pu.nutrientCalories.fat, 1),
      carbs: mathUtils.round(product.carbs * pu.nutrientCalories.carbs, 1),
  };
}

function getNutrientsProportions(
  caloriesFromNutrients: CaloriesFromNutrients,
): CaloriesFromNutrients {
  const { protein, fat, carbs } = caloriesFromNutrients;
  const totalCalories = protein + fat + carbs;
  const result = {
      protein: mathUtils.round(protein / totalCalories * 100, 2),
      fat: mathUtils.round(fat / totalCalories * 100, 2),
      carbs: 0,
  };
  // just to avoid value < 100
  result.carbs =  mathUtils.round(100 - result.protein - result.fat);
  return result;
}

function getPreferableTimeToEat(product: Product): string {
  if (pu.getMainNutrient(product) === 'fat') {
      return 'Morning';
  }
  if (product.calories >= maxCaloriesForTimeToEat) {
      return 'Morning, Afternoon';
  }
  return 'No limits';
}

function renderNutrientValue(
  classes: StyleProps['classes'],
  value: number,
  suffix: string,
) {
  return (
    <Typography
      className={classes.nutrientValue}
      align="center"
    >
      {value + ' ' + suffix}
    </Typography>
  );
}

function renderNutrientValueSeparator(
  classes: StyleProps['classes'],
  nutrient: NutrientPropName,
) {
  return (
    <div
      className={csn(
        classes.nutrientValuesSeparator,
        nutrientClasses[nutrient],
      )}
    />
  );
}

function renderNutrients(classes: StyleProps['classes'], product: Product) {
  const caloriesAmount = getCaloriesFromNutrients(product);
  const caloriesPercentage = getNutrientsProportions(caloriesAmount);

  return (
    <>
      <Typography
        variant="h6"
        align="center"
        gutterBottom={true}
      >
        Nutrition value
      </Typography>
      {
        pu.nutrientOnlyProps.map((iter) => {
          return (
            <div
              key={iter}
              className={classes.nutrientContainer}
              style={{
                borderColor: colors[iter],
              }}
            >
              <Typography
                className={csn(
                  classes.nutrientName,
                  globalClasses.gcWhiteText,
                  nutrientClasses[iter],
                )}
                variant="subtitle1"
                align="center"
              >
                {pu.nutrientCaptions[iter]}
              </Typography>

              <div className={classes.nutrientValues}>
                {renderNutrientValue(classes, product[iter], 'g')}
                {renderNutrientValueSeparator(classes, iter)}
                {renderNutrientValue(classes, caloriesAmount[iter], 'kcal')}
                {renderNutrientValueSeparator(classes, iter)}
                {renderNutrientValue(classes, caloriesPercentage[iter], '%')}
              </div>
            </div>
          );
        })
      }

      <Typography
        variant="h6"
        align="center"
      >
        Nutrients Proportions
      </Typography>

      <div className={classes.nutrientsBar}>
        {pu.nutrientOnlyProps.map((iter) => (
          <div
            key={iter}
            className={nutrientClasses[iter]}
            style={{width: caloriesPercentage[iter] + '%', height: '100%'}}
          />
        ))}
      </div>
    </>
  );
}

function renderCalories(classes: StyleProps['classes'], product: Product) {
  const percents = mathUtils.round(product.calories * 100 / maxCalories);
  const caption =
    product.calories > 450 ? 'High' :
      product.calories > 200 ? 'Medium' : 'Low';
  return (
    <>
      <div className={classes.caloriesValueRow}>
        <Typography
          variant="h6"
        >
          Calories:
        </Typography>
        <Typography
          className={classes.caloriesValue}
          variant="h6"
        >
          {product.calories + ' kcal'}
        </Typography>
      </div>

      <div className={classes.caloriesBar}>
        <div
          className={csn(classes.caloriesBarContent, nutrientClasses.calories)}
          style={{
            width: percents + '%',
          }}
        />
        <Typography
          className={classes.caloriesBarCaption}
          align="center"
        >
          {caption.toLocaleUpperCase()}
        </Typography>
        <Typography className={classes.caloriesBarStartLabel}>
          0
        </Typography>
        <Typography className={classes.caloriesBarEndLabel}>
          {maxCalories}
        </Typography>
      </div>
    </>
  );
}

function renderContent(props: GcProductPageProps & StyleProps) {
  const { classes, productData: productInfo } = props;
  const { product, similarProducts } = productInfo;

  return (
    <>
      <div className={classes.root}>

        <GcProductImage
          className={classes.imageRoot}
          classes={{
            img: classes.imageEl,
          }}
          height={imageSize.height}
          width={imageSize.width}
          image={product.image}
          thumbnail={product.thumb}
        />

        <Typography
          variant="h1"
          align="center"
          className={classes.productName}
        >
          {productInfo.product.name}
        </Typography>

        <GcText
          align="center"
          custom={{size: 'xlarge'}}
        >
          {productInfo.product.description}
        </GcText>

        <Typography
          variant="caption"
          color="textSecondary"
          className={globalClasses.gcAlignSelfCenter}
          align="center"
        >
          This is a product from Protomeal database.
          <br/>Click <a href="/food">here</a> if you want to see the full list of products.
        </Typography>

        <br/>

        <Divider className={classes.sectionDivider}/>

        {renderNutrients(classes, productInfo.product)}
        {renderCalories(classes, productInfo.product)}

        <Divider className={classes.sectionDivider}/>

        <Typography
          className={classes.preferableTimeToEat}
          variant="subtitle1"
          align="center"
        >
          Preferable time to eat
        </Typography>
        <Typography
          variant="h5"
          align="center"
        >
          {`${getPreferableTimeToEat(product)}`}
        </Typography>
        <br/>

        <Divider className={classes.sectionDivider}/>

        <div className={classes.useOnProtoMealContainer}>
          <Button
            href={`/app/?productId=${product.id}`}
            color="secondary"
            variant="contained"
            className={classes.useOnProtoMealButton}
          >
            <UseProductIcon className={classes.buttonIcon}/>
            Use This Product
          </Button>
          <Typography
            className={classes.hint}
            variant="caption"
          >
            {`Click to add "${product.name}" to your food intake for today ` +
            `and start planning your food intake with Protomeal.`}
          </Typography>
        </div>

        <Divider className={classes.sectionDivider}/>

        {
          Boolean(similarProducts && similarProducts.length) && (
            <div className={classes.similarProductsContainer}>
              <Typography
                variant="subtitle1"
                align="center"
              >
                Similar products
              </Typography>
              <div className={classes.similarProductsRoot}>
                {similarProducts.map((prod) =>
                  <GcSimilarProduct
                    key={prod.id}
                    product={prod}
                  />,
                )}
                {similarProducts.length === 0 &&
                  <Typography className={classes.noSimilarProducts}>
                    No similar products
                  </Typography>
                }
              </div>
            </div>
          )
        }
        <br/><br/>
        <Button
          href={'/food'}
          color="primary"
          variant="contained"
          className={globalClasses.gcAlignSelfCenter}
        >
          <ViewListIcon className={classes.buttonIcon}/>
          Show complete product list
        </Button>
        <br/><br/>

        <Divider className={classes.sectionDivider}/>

        </div>
    </>
  );
}

const GcProductPageView: React.SFC<GcProductPageProps & StyleProps> = (props) => {
  const {name, id} = props.productData.product;
  return (
    <GcPage
      title={`${name} | ProtoMeal`}
      discusId={`product-${id}`}
      content={renderContent(props)}
    />
  );
};

export const GcProductPage =
  withStyles(stylesCallback, {withTheme: true})(GcProductPageView);
