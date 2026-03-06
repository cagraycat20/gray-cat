import { config } from '../lib/config';
import { db } from '../lib/db-client';
import { getImageThumbnail } from '../lib/image-upload';
import { s3 } from '../lib/s3-client';
import { putProduct, queryProducts } from '../lib/util';

export async function generateMissingThumbnails(): Promise<number> {

  const products = (await queryProducts(db, {userId: config.rootUserName, since: 0}))
    .filter((prod) => prod.image && !prod.thumb);

  return (await Promise.all(products.map(async (prod) => {
    prod.thumb = await getImageThumbnail(s3, prod.image || '');
    prod.lastModified = Date.now();
    return putProduct(db, prod);
  }))).length;
}
