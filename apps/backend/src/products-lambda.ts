import { config } from './lib/config';
import { db } from './lib/db-client';
import { getImageThumbnail, imageUpload } from './lib/image-upload';
import { createHandler } from './lib/lambda-handler';
import { s3 } from './lib/s3-client';
import {
  deleteProduct,
  getProduct,
  getSystemItem,
  HttpError,
  putProduct,
  queryProducts,
} from './lib/util';
import { DBProduct, Product } from './types';

function convertToDB(product: Product, userId: string): DBProduct {
  return {
    userId,
    ...product,
  };
}

function convertFromDB(product: DBProduct): Product {
  if (product.userId !== config.rootUserName) {
    product.custom = true;
  }
  delete product.userId;
  return product;
}

export const getProductsHandler = createHandler<Product>(
  { substituteAdminUser: true },
  {
    get: async ({ userId, query }) => {
      const since = (query && parseInt(query.since || '', 10)) || 0;
      if (userId) {
        const [rootProducts, userProducts] = await Promise.all([
          queryProducts(db, { userId: config.rootUserName, since }),
          queryProducts(db, { userId, since }),
        ]);

        const filteredProducts = rootProducts.filter(
          (rootProd) => !userProducts.some((userProd) => rootProd.id === userProd.id),
        );

        return userProducts.concat(filteredProducts).map(convertFromDB);
      } else {
        const products = await queryProducts(db, { userId: config.rootUserName, since });
        return products.map(convertFromDB);
      }
    },
  },
);

export const handler = createHandler<Product>(
  { required: true, substituteAdminUser: true },
  {
    post: async ({ userId, body, isAdmin }) => {
      if (typeof body !== 'object') {
        throw new HttpError(400, 'Product must be an object');
      }

      const product = body as Product;

      if (typeof product.id !== 'string') {
        throw new HttpError(400, 'Product.id must be a string');
      }

      const image = await imageUpload(s3, product.image || '', userId, isAdmin);
      if (image && image !== product.image) {
        try {
          product.thumb = await getImageThumbnail(s3, image);
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.error('Error: getImageThumbnail', e.message, e.stack);
        }
      }
      product.image = image;

      const dbProduct = await putProduct(db, convertToDB(product, userId));
      return convertFromDB(dbProduct);
    },

    delete: async ({ userId, query }) => {
      if (!query || !query.id) {
        throw new HttpError(404, 'Product not found');
      }
      const id = query.id;

      const dbProduct = await getProduct(db, { userId, id });
      if (!dbProduct) {
        throw new HttpError(404, 'Product not found');
      }

      const rootDBProduct = await getProduct(db, { userId: config.rootUserName, id });
      if (rootDBProduct) {
        await deleteProduct(db, { userId, id });
        return convertFromDB({ ...rootDBProduct, deleted: true });
      } else {
        return convertFromDB(await putProduct(db, { ...dbProduct, deleted: true }));
      }
    },
  },
);

export const getPopularProductsHandler = createHandler<Array<string>>(
  {},
  {
    get: async () => {
      const item = await getSystemItem<Array<string>>(db, { id: 'popular_products' });
      return item ? item.value : [];
    },
  },
);
