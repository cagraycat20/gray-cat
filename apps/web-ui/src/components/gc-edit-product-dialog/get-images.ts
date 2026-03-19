import { ImageSearchItem } from '../../types';
import { apiCall } from '../../utils/request.utils';

export interface GoogledImage {
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  sourceUrl: string;
}

const searchImage = async (q: string): Promise<Array<GoogledImage>> => {
  const {response} = await apiCall('GET', 'imageSearch', {q}).toPromise();
  return response.map(({tu, ou, oh, ow, pt, rh, ru}: ImageSearchItem) => ({
    url: ou,
    thumbnail: tu,
    title: pt,
    description: `${ow} x ${oh} - ${rh}`,
    sourceUrl: ru,
  }));
};

export async function getImages(query: string, onlyFree: boolean): Promise<Array<GoogledImage>> {
  if (onlyFree) {
    query += ' & site:pexels.com | site:unsplash.com | site:pixabay.com | site:stocksnap.io | site:isorepublic.com';
  }
  return (await searchImage(query)).filter((image) => !image.url.includes('shutterstock.com')); // remove ads
}
