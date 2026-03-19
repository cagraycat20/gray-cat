import {
  NUTRIENT_CAPTIONS,
  NUTRIENT_CAPTIONS_SHORT,
  NUTRIENT_ONLY_PROPS,
  NUTRIENT_PROPS,
} from '..';
import {
  ConsumedProduct,
  DayInfo,
  ImageInfo,
  NutrientName,
  NutrientProps,
  Product,
  ProductWeight,
} from '../../types';
import { dateUtils as du } from './date-utils';
import { mathUtils } from './math.utils';

// tslint:disable-next-line: no-var-requires
const fmu = require('fuzzy-match-utils');

const filterThreshold = 0.80;

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || // client side
                       process.env.IMAGE_BASE_URL || // server side
                       '';

const defImageThumbnail = '/9j/4AAQSkZJRgABAQEAZABkAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgk' +
  'JChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKC' +
  'goKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIA' +
  'AhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMFBv/EACMQAAIBAwMEAwAAAAAAAAAAAAEDAgQFEQA' +
  'GIRIiQVExcbH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGREBAAMBAQAAAAAAAAAAAAAAAQADEQIE/9oA' +
  'DAMBAAIRAxEAPwBVTT266XCjlCrTZ0YKG2lUhJaupY5DYwIHIl75OQQckZequG1k1Tlu2OibITMZSN3gCSD' +
  'ycYH4PrUO49rq1ceIJR1qiPhcjnJiPBOBkj1oLTS07rVRtchTGTTCUpygCZExGST5OiVeblVjrrHDJ//Z';

export class ProductUtils {

  public readonly nutrientOnlyProps = NUTRIENT_ONLY_PROPS;
  public readonly nutrientProps = NUTRIENT_PROPS;
  public readonly nutrientCaptions = NUTRIENT_CAPTIONS ;
  public readonly nutrientCaptionsShort = NUTRIENT_CAPTIONS_SHORT;
  public readonly defImageThumbnail = defImageThumbnail;

  public nutrientCalories: {[key in NutrientName]: number} = {
    protein: 4,
    fat: 9,
    carbs: 4,
  };

  private readonly PROTEIN_NOT_NUMBER = 'Protein is not a number';
  private readonly FAT_NOT_NUMBER = 'Fat is not a number';
  private readonly CARBS_NOT_NUMBER = 'Carbs are not a number';
  private readonly CALORIES_NOT_NUMBER = 'Calories are not a number';
  private readonly IMAGE_IS_NOT_ASSIGNED = 'Image is not assigned';
  private readonly NAME_INCORRECT = 'Name is incorrect';
  private readonly NAME_STARTS_WITH_LOWERCASE = 'First letter of the name has to be capital';
  private readonly CALCULATED_CALORIES_INCORRECT =
    'Correlation between amount of nutrients and calories might be incorrect';

  public getMainNutrient(product: Product): NutrientName {
    const {protein, fat, carbs} = product;
    if ((protein > fat) && (protein >= carbs)) {
      return 'protein';
    } else if ((carbs > fat) && (carbs > protein)) {
      return 'carbs';
    } else {
      return 'fat';
    }
  }

  public calculateNutrients(product: Product, productWeight: number, round: boolean = false): NutrientProps {
    const result = {
      protein: product.protein * productWeight / 100,
      fat: product.fat * productWeight / 100,
      carbs: product.carbs * productWeight / 100,
      calories: product.calories * productWeight / 100,
    };
    return round ? this.roundNutrients(result) : result;
  }

  public nutrientsPerKilo(nutrients: NutrientProps, bodyWeight: number, round: boolean = true): NutrientProps {
    const validBodyWeight = bodyWeight ? bodyWeight : 1;
    const result = {
      protein: nutrients.protein / validBodyWeight,
      fat: nutrients.fat / validBodyWeight,
      carbs: nutrients.carbs / validBodyWeight,
      calories: nutrients.calories / validBodyWeight,
    };
    return round ? this.roundNutrients(result) : result;
  }

  public calculateFullNutrientData(
    product: Product,
    productWeight: number,
    bodyWeight: number,
  ): {
    nutrients: NutrientProps,
    nutrientsPerKilo: NutrientProps,
  } {
    const nutrients = this.calculateNutrients(product, productWeight, true);
    return {
      nutrients,
      nutrientsPerKilo: this.nutrientsPerKilo(nutrients, bodyWeight, true),
    };
  }

  public roundNutrients(nutrients: NutrientProps): NutrientProps {
    return {
      protein: mathUtils.round(nutrients.protein),
      fat: mathUtils.round(nutrients.fat),
      carbs: mathUtils.round(nutrients.carbs),
      calories: mathUtils.round(nutrients.calories),
    };
  }

  public addNutrients(nutrients1: NutrientProps, nutrients2: NutrientProps): NutrientProps {
    return {
      protein: nutrients1.protein + nutrients2.protein,
      fat: nutrients1.fat + nutrients2.fat,
      carbs: nutrients1.carbs + nutrients2.carbs,
      calories: nutrients1.calories + nutrients2.calories,
    };
  }

  public addToNutrients(nutrients: NutrientProps, product: Product, productWeight: number): NutrientProps {
    return this.addNutrients(nutrients, this.calculateNutrients(product, productWeight));
  }

  public addUpNutrients(
    productWeights: Array<ProductWeight>,
    products: Array<Product>,
  ): NutrientProps {
    return this.roundNutrients(productWeights.reduce(
      (result, iter) => {
        const product = this.findProduct(products, iter.productId);
        if (product) {
          return this.addToNutrients(result, product, iter.productWeight);
        }
        return result;
      },
      this.createNutrients()));
  }

  // e.g. we need to get nutrients for 100g of product weights
  public addUpNutrientsPerWeight(
    productWeights: Array<ProductWeight>,
    products: Array<Product>,
    weight: number,
  ): NutrientProps {
    let totalWeight = 0;
    let nutrients = this.createNutrients();

    productWeights.forEach((iter) => {
      const product = this.findProduct(products, iter.productId);
      if (product) {
        totalWeight += iter.productWeight;
        nutrients = this.addToNutrients(nutrients, product, iter.productWeight);
      }
    });

    const validTotalWeight = totalWeight || 1;

    nutrients = {
      protein: (nutrients.protein * weight) / validTotalWeight,
      fat: (nutrients.fat * weight) / validTotalWeight,
      carbs: (nutrients.carbs * weight) / validTotalWeight,
      calories: (nutrients.calories * weight) / validTotalWeight,
    };

    return this.roundNutrients(nutrients);
  }

  public addUpNutrientsWithProteinBased(
    productWeights: Array<ProductWeight>,
    products: Array<Product>,
  ): { nutrients: NutrientProps; proteinFromProteinBased: number} {

    const resultData =  productWeights.reduce(
      (result, iter) => {
        const product = this.findProduct(products, iter.productId);
        if (product) {
          if (this.getMainNutrient(product) === 'protein') {
            result.proteinFromProteinBased += product.protein * iter.productWeight / 100;
          }
          result.nutrients = this.addToNutrients(result.nutrients, product, iter.productWeight);
          return result;
        }
        return result;
      },
      {
        nutrients: this.createNutrients(),
        proteinFromProteinBased: 0,
      });

    resultData.nutrients = this.roundNutrients(resultData.nutrients);
    return resultData;
  }

  public findProduct(products: Array<Product>, productId: string): Product | undefined {
    return products.find((product: Product) => product.id === productId);
  }

  public createNutrients(): NutrientProps {
    return {
      protein: 0,
      fat: 0,
      carbs: 0,
      calories: 0,
    };
  }

  public formatNutrientValue = (value: number) =>
    mathUtils.formatValue(value)

  public isNutrientName = (value: any) => // tslint:disable-line: no-any
    this.nutrientProps.indexOf(value) > -1

  // returns array of detected problems
  public validateProduct(product: Product): Array<string> | undefined {
    let problems;

    if (isNaN(product.protein)) {
      problems = this.addProductProblem(this.PROTEIN_NOT_NUMBER, problems);
    }

    if (isNaN(product.fat)) {
      problems = this.addProductProblem(this.FAT_NOT_NUMBER, problems);
    }

    if (isNaN(product.carbs)) {
      problems = this.addProductProblem(this.CARBS_NOT_NUMBER, problems);
    }

    if (isNaN(product.calories)) {
      problems = this.addProductProblem(this.CALORIES_NOT_NUMBER, problems);
    }

    if (!product.image || typeof product.image !== 'string') {
      problems = this.addProductProblem(this.IMAGE_IS_NOT_ASSIGNED, problems);
    }

    if (!product.name || typeof product.name !== 'string') {
      problems = this.addProductProblem(this.NAME_INCORRECT, problems);
    }

    if (product.name!.charAt(0) !== product.name!.charAt(0).toUpperCase()) {
      problems = this.addProductProblem(this.NAME_STARTS_WITH_LOWERCASE, problems);
    }

    const caloriesFromNutrients =
      product.protein * this.nutrientCalories.protein +
      product.fat * this.nutrientCalories.fat +
      product.carbs * this.nutrientCalories.carbs;

    if (product.calories < caloriesFromNutrients * 0.8 || product.calories > caloriesFromNutrients * 1.2) {
      problems = this.addProductProblem(this.CALCULATED_CALORIES_INCORRECT, problems);
    }
    return problems;
  }

  public getProductThumbnail(thumb: Product['thumb']): string | undefined {
    return thumb ? `url('data:image/png;base64,${thumb}')` : undefined;
  }

  public getProductImage(image: Product['image'], width: number, height: number,
  ): string | undefined {
    return image ? this.getImage({
      imagePath: image,
      ...this.getImageInfo(width, height),
    }) : undefined;
  }

  public getImage({baseUrl, imagePath, edits}: ImageInfo) {
    return baseUrl + Buffer.from(JSON.stringify({key: imagePath, edits})).toString('base64');
  }

  public getImageInfo(width: number, height: number): ImageInfo {
    return {
      baseUrl: IMAGE_BASE_URL,
      edits: {
        resize: {
          width: Math.ceil(width),
          height: Math.ceil(height),
          fit: 'outside',
        },
        flatten: {
          background: {
            r: 255,
            g: 255,
            b: 255,
            alpha: null,
          },
        },
      },
    };
  }

  public checkFilter = (product: Product, filterText: string) => {
    filterText = filterText.toLocaleLowerCase();
    const keyWords = product.keyWords || [];

    return [product.name, ...keyWords].some((str: string) => (
      !filterText || // true for empty filter
      (fmu.typeaheadSimilarity(filterText, str.toLocaleLowerCase()) / filterText.length) >= filterThreshold
    ));
  }

  public getSimilarProducts(baseProduct: Product, products: Array<Product>): Array<Product> {
    const similarProducts: Array<Product> = [];
    const deviation = 0.15;

    products.forEach((product) => {
      if (product.id !== baseProduct.id
        && (product.protein * (1 - deviation) <= baseProduct.protein)
        && (product.protein * (1 + deviation) >= baseProduct.protein)
        && (product.fat * (1 - deviation) <= baseProduct.fat)
        && (product.fat * (1 + deviation) >= baseProduct.fat)
        && (product.carbs * (1 - deviation) <= baseProduct.carbs)
        && (product.carbs * ( 1 + deviation) >= baseProduct.carbs)
        && (product.calories * (1 - deviation) <= baseProduct.calories)
        && (product.calories * (1 + deviation) >= baseProduct.calories)
      ) {
        similarProducts.push(product);
      }
    });

    return similarProducts;
  }

  public getConsumedProducts(days: Array<DayInfo>, dateFrom: Date, dateTo: Date): Array<ConsumedProduct> {
    const products: Array<ConsumedProduct> = [];

    days.forEach((value) => {
      if (du.isSameOrAfter(value.date, dateFrom) && du.isSameOrBefore(value.date, dateTo)) {
        value.consumed.forEach((consumedProduct) => {
          const product = products.find((p) => p.productId === consumedProduct.productId);
          if (product) {
            product.productWeight += consumedProduct.productWeight;
          } else {
            products.push({ ...consumedProduct });
          }
        });
      }
    });

    return products;
  }

  private addProductProblem(problem: string, existingProblems?: Array<string>): Array<string> {
    if (!existingProblems) {
      return [problem];
    }
    return [...existingProblems, problem];
  }
}

export const productUtils = new ProductUtils();
