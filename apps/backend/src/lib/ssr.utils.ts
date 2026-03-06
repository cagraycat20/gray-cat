import {
  productUtils as pu,
  toSeoUrl,
} from '../../../web-ui/src/shared';
import { Product, ProductListPageData, ProductPageData } from '../types';
import { config } from './config';
import { db } from './db-client';
import { queryProducts } from './util';

async function loadRootProducts(): Promise<Array<Product>> {
  return queryProducts(db, {userId: config.rootUserName, since: 0});
}

const qp = {
  page: 'page',
  size: 'size',
  search: 'search',
};

const defaultPageSize = 25;
const defaultPageNum = 1;

export async function loadProductListPageData(
    queryParams: { [name: string]: string | undefined},
  ): Promise<ProductListPageData> {

  const searchString = queryParams[qp.search] || '';
  const pageSize = Number.parseInt(queryParams[qp.size] || '', 10) || defaultPageSize;

  const products = (await queryProducts(db, {userId: config.rootUserName, since: 0}))
    .filter((product) => pu.checkFilter(product, searchString));

  products.sort((a, b) => a.name.localeCompare(b.name));

  const pageCount = Math.ceil(products.length / pageSize);

  let pageNum = Number.parseInt(queryParams[qp.page] || '', 10) || defaultPageNum;
  if (pageNum < 1) {
    pageNum = defaultPageNum;
  } else if (pageNum > pageCount) {
    pageNum = pageCount;
  }

  const start = (pageNum - 1) * pageSize; // pageNum is 1 based index

  return {
    pageNum,
    pageCount,
    pageSize,
    searchString,
    products: products.slice(start, start + pageSize),
  };
}

export async function loadProductPageData(seoName: string): Promise<ProductPageData | null> {
  const products = await loadRootProducts();

  const product = products.find((prod) => toSeoUrl(prod.name) === seoName);

  if (!product) {
    return null;
  }

  return {
    product,
    similarProducts: pu.getSimilarProducts(product, products),
  };

}
