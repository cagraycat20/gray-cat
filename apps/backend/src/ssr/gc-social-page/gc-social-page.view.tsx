import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {
  dateUtils as du,
  dayInfoHelper as dah,
  NUTRIENT_CAPTIONS_SHORT,
  NUTRIENT_PROPS,
  productUtils as pu,
} from '../../../../web-ui/src/shared';

import Helmet from 'react-helmet';
import { csn } from '../../../../web-ui/src/shared';
import {
  NutrientProps,
  Product,
  SocialPage,
} from '../../types';
import { fullLogo } from '../assets';
import { StyleProps, stylesCallback } from './gc-social-page.style';

const metaInfo = {
  title: 'ProtoMeal',
  description: 'Nutrition',
  keywords: 'meal nutrition planning',
};

type GcSocialPageProps = StyleProps & {
  page: SocialPage;
};

interface ConsumedGroupedInfo {
  [time: number]: {
    products: Array<{
      product: Product,
      productWeight: number,
    }>;
    nutrients: NutrientProps,
  };
}

function getConsumedGroupedInfo(consumedProducts: SocialPage['products']):
  ConsumedGroupedInfo {
    return consumedProducts.reduce(
      (result: ConsumedGroupedInfo, iter) => {
        if (!result[iter.time]) {
          result[iter.time] = {
            products: [],
            nutrients: pu.createNutrients(),
          };
        }
        result[iter.time].products.push({
          product: iter.product,
          productWeight: iter.productWeight,
        });
        result[iter.time].nutrients = pu.addToNutrients(
          result[iter.time].nutrients,
          iter.product,
          iter.productWeight,
        );
        return result;
      },
      {},
    );
}

function GcSocialPageView({page, classes, theme}: GcSocialPageProps) {

  const meals = getConsumedGroupedInfo(page.products);
  const mealTimes = Object.keys(meals)
    .map((iter) => parseFloat(iter))
    .sort((first, second) => first - second);

  const nutrientsSummary = mealTimes.reduce(
    (result, iter) => {
      return pu.addNutrients(result, meals[iter].nutrients);
    },
    pu.createNutrients(),
  );

  const getImage = (img?: string) => pu.getProductImage(img, page.imageSize.w, page.imageSize.h) || '';

  return (
    <div className={classes.root}>
    <Helmet>
      <title>{metaInfo.title}</title>
      <meta name="description" content={metaInfo.description} />
      <meta name="keywords" content={metaInfo.keywords} />
      <meta name="application-name" content={metaInfo.title} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaInfo.title} />
      <meta property="og:description" content={metaInfo.description} />
      <meta property="og:image" content={getImage(page.image)} />
      <meta property="og:image:width" content={page.imageSize.w.toString()} />
      <meta property="og:image:height" content={page.imageSize.h.toString()} />
    </Helmet>
      <div className={classes.bar}>

        <div className={classes.barContent}>

          <a
            className={classes.logoContainer}
            href={'/'}
          >
            <Typography
              variant="caption"
              className={csn(classes.whiteText)}
            >
              CREATED WITH
            </Typography>
            <img
              className={csn(classes.logo)}
              src={fullLogo}
              alt="protomeal"
            />
          </a>

          <Button
            size="small"
            variant="outlined"
            className={csn(classes.whiteText, classes.tryForFreeButton)}
            href={'/'}
          >
            TRY FOR FREE
          </Button>
        </div>

      </div>
      <div className={classes.content}>

        <div className={classes.header}>
          <div className={classes.nutrientsMarkContainer}>
            <Typography
              className={classes.datePrefix}
              variant="subtitle2"
            >
              MY FOOD INTAKE FOR
            </Typography>
            <Typography
              className={classes.nutrientsMark}
              variant="h6"
            >
              {du.getFormattedDate(page.date, 'EEEE (MMM dd, yyyy)').toUpperCase()}
            </Typography>
          </div>

          <div className={classes.nutrientsContainer}>
            {
              NUTRIENT_PROPS.map((iter) => (
                <div
                  key={iter}
                  className={classes.nutrient}
                  title={`Amount of ${pu.nutrientCaptions[iter]}`}
                >
                  <div
                    className={classes.nutrientNameArea}
                    style={{
                      ...theme.custom.nutrientProps[iter],
                    }}
                  >
                    <Typography
                      className={csn(classes.whiteText, classes.nutrientName)}
                    >
                      {
                        NUTRIENT_CAPTIONS_SHORT[iter] +
                        (iter !== 'calories' ? ' (g)' : '')
                      }
                    </Typography>
                  </div>
                  <div className={classes.nutrientValueArea}>
                    <Typography
                      className={csn(classes.whiteText, classes.nutrientValue)}
                      style={{zIndex: 2}}
                    >
                      {pu.formatNutrientValue(nutrientsSummary[iter])}
                    </Typography>

                    <div
                      className={classes.nutrientValueMiddleArea}
                      style={{
                        ...theme.custom.nutrientProps[iter],
                      }}
                    />
                    <div className={classes.nutrientValueBottomArea}>
                      <div className={classes.nutrientValueBottomAreaBorder} />
                      <div
                        className={classes.nutrientValueBottomAreaOverlay}
                        style={{borderTopColor: theme.custom.colors[iter]}}
                      />
                    </div>

                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {
          mealTimes.map((mealTime) => (
            <div className={classes.mealContainer}>
              <div className={classes.mealHeader}>
                <Typography
                  className={classes.mealTime}
                  variant="h6"
                >
                  {dah.formatMealTime(mealTime)}
                </Typography>
                <div className={classes.nutrientsContainer}>
                  {
                    NUTRIENT_PROPS.map((iter) => (
                      <div
                        key={iter}
                        className={classes.nutrient}
                        title={`Amount of ${pu.nutrientCaptions[iter]}`}
                      >
                        <div
                          className={csn(
                            classes.nutrientValueArea,
                            classes.mealNutrientValueArea,
                          )}
                        >

                          <Typography
                            className={csn(
                              classes.whiteText,
                              classes.nutrientValue,
                              classes.mealNutrientValue,
                            )}
                            style={{zIndex: 2}}
                          >
                            {pu.formatNutrientValue(meals[mealTime].nutrients[iter])}
                          </Typography>

                          <div
                            className={classes.nutrientValueMiddleArea}
                            style={{
                              ...theme.custom.nutrientProps[iter],
                            }}
                          />
                          <div className={classes.nutrientValueBottomArea}>
                            <div className={classes.nutrientValueBottomAreaBorder} />
                            <div
                              className={classes.nutrientValueBottomAreaOverlay}
                              style={{borderTopColor: theme.custom.colors[iter]}}
                            />
                          </div>

                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              {
                meals[mealTime].products.map((consumedProduct, index, array) => (
                  <div
                    key={consumedProduct.product.id}
                    className={csn(
                      classes.productCard,
                      array.length === index + 1 && classes.lastProductCard,
                    )}
                  >
                    <CardMedia
                      className={classes.productImage}
                      image={getImage(consumedProduct.product.image)}
                    />

                      <Typography
                        className={csn(
                          classes.whiteText,
                          classes.productName,
                          classes.productCardInfo,
                        )}
                        variant="subtitle2"
                      >
                        {consumedProduct.product.name.toUpperCase()}
                      </Typography>

                      <Typography
                        className={csn(
                          classes.whiteText,
                          classes.productWeight,
                          classes.productCardInfo,
                        )}
                        variant="subheading"
                      >
                        {consumedProduct.productWeight + ' g'}
                      </Typography>

                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export const GcSocialPage =
  withStyles(stylesCallback, {withTheme: true})(GcSocialPageView);
