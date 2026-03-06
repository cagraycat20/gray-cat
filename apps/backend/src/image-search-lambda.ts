import fetch from 'node-fetch';
import { createHandler } from './lib/lambda-handler';
import { HttpError } from './lib/util';
import { ImageSearchItem } from './types';

export const handler = createHandler<ImageSearchItem>({required: true, adminOnly: true}, {
  get: async ({query}) => {
    const  q = (query && query.q) || '';

    if (!q ) {
      throw new HttpError(400, 'empty request');
    }

    const html = await fetch(
      'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(q),
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
          ' Chrome/65.0.3325.181 Safari/537.36',
        },
      },
    ).then((response) => response.text());

    const regex = />(\{.*?\})</g;
    const result: Array<ImageSearchItem> = [];
    let m;
    do {
      m = regex.exec(html);
      if (m) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        if (m[1]) {
          result.push(JSON.parse(m[1]));
        }
      }
    } while (m);
    return result;
  },
});
