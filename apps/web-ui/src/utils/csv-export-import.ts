import { Product } from '../types';

export function csvExportProducts(products: Array<Product>): Promise<string> {
  // @ts-ignore
  return import('csv-stringify/lib/es5').then((stringify) => {
    return new Promise((resolve, reject) => {
      stringify.default(products, {header: true, quoted: true},
                        (err: Error, res: string) => err ? reject(err) : resolve(res));
    });
  });
}

export function csvImportProducts(csv: string): Promise<Array<Product>> {
  // @ts-ignore
  return import('csv-parse/lib/es5').then((parse) => {
    return new Promise((resolve, reject) => {
      parse.default(csv, {columns: true, cast: true}, (err: Error, res: Array<Product>) => {
        res.forEach((iter) => {
          if (iter.keyWords) {
            if (typeof iter.keyWords === 'string') {
              iter.keyWords = (iter.keyWords as string)
                .split(',')
                .map((iterKeyWord) => iterKeyWord.trim().toLowerCase());
              if (iter.keyWords) {
                return;
              }
            }
          }
          iter.keyWords = undefined;
        });
        return err ? reject(err) : resolve(res);
      });
    });
  });
}
