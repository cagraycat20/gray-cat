import memoizeOne from 'memoize-one';
import uuidv4 from 'uuid/v4';
import { generic } from '../assets/index';
import { ProductUtils } from '../shared/utils/product.utils';
import {
  Product,
  ProductPrice,
} from '../types';
import { apiCall } from '../utils/request.utils';

class ProductHelper extends ProductUtils {

  public createProduct(): Product {
    return {
      id: uuidv4(),
      name: '',
      ...this.createNutrients(),
    };
  }

  public cloneProduct(originalProduct: Product): Product {
    const clonedProduct = this.createProduct();
    clonedProduct.name = originalProduct.name + ' - New';
    clonedProduct.protein = originalProduct.protein;
    clonedProduct.fat = originalProduct.fat;
    clonedProduct.calories = originalProduct.calories;
    clonedProduct.carbs = originalProduct.carbs;
    clonedProduct.keyWords = originalProduct.keyWords;

    return clonedProduct;
  }

  public mergeProduct(existing: Product | undefined, changes: Partial<Product>): Product {
    if (!existing) {
      existing = this.createProduct();
    }
    const filteredChanges: Partial<Product> = {};
    for (const key in changes) {
      if (changes[key]) { // do not merge empty strings from products import
        filteredChanges[key] = changes[key];
      }
    }
    return {...existing, ...filteredChanges};
  }

  public getProductImageOrGeneric(
    image: Product['image'] = '',
    width: number,
    height: number,
    previewMode: boolean = false,
  ): string {
    if (previewMode && image && (image.startsWith('http') || image.startsWith('data:image'))) {
      return image;
    }
    return this.getProductImage(image, width, height) || generic;
  }

  public async postProduct(product: Product): Promise<Product> {
    product = {...product, lastModified: Date.now()};
    const {response} = await apiCall('POST', 'products', undefined, product).toPromise();
    if (typeof response !== 'object') {
      throw new Error(`Invalid response ${response}`);
    }
    return response;
  }

  public getNutrientPrice(
    nutrientValue: number,
    productPrice: Pick<ProductPrice, 'price' | 'productWeight'>,
  ) {
    return (100 * productPrice.price) / ((productPrice.productWeight || 1) * nutrientValue);
  }

  public getProductsToDisplay = (products: Array<Product>, isAdmin: boolean | undefined) => {
    if (isAdmin) {
      return products;
    } else {
      return filterInvalidProducts(products);
    }
  }
}

const invalidProductPrefix = '!!!';

const findInvalidKeywordCallback =
  (iter: string) => Boolean(iter && iter.startsWith(invalidProductPrefix));

const filterInvalidProducts = memoizeOne(
  (products: Array<Product>) => {
    const result = products.filter(
      (iter) => {
        return (
          iter.custom || (
            !productHelper.validateProduct(iter) &&
            !(iter.keyWords && iter.keyWords.find(findInvalidKeywordCallback))
          )
        );
      });
    return result;
  });

export const productHelper = new ProductHelper();
