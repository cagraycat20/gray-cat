import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConsumedProductsSummarySocialPage, SocialPage } from '../types';
import { apiCall } from './request.utils';

/*global FB*/

export function shareOnFacebook(page: SocialPage): Observable<string> {
  return apiCall('POST', 'generateSocialPage', undefined, page)
    .pipe(
      map(({ response }) => (response as SocialPage).pageUrl),
      tap((href) => {
        // tslint:disable-next-line:no-console
        console.log(`Sharing: ${href}`);
        if (process.env.NODE_ENV === 'production') {
          FB.ui(
            {
              method: 'share',
              href,
              mobile_iframe: true,
              hashtag: '#protomeal',
              quote: 'Reach an extra level in your nutrition planning with ProtoMeal',
            },
            () => {
              //
            },
          );
        } else {
          window.open(href);
        }
      }),
    );
}

export function shareConsumedProductsSummaryOnFacebook(page: ConsumedProductsSummarySocialPage): Observable<string> {
  return apiCall('POST', 'generateConsumedProductsSummarySocialPage', undefined, page)
    .pipe(
      map(({ response }) => (response as ConsumedProductsSummarySocialPage).pageUrl),
      tap((href) => {
        // tslint:disable-next-line:no-console
        console.log(`Sharing: ${href}`);
        if (process.env.NODE_ENV === 'production') {
          FB.ui(
            {
              method: 'share',
              href,
              mobile_iframe: true,
              hashtag: '#protomeal',
              quote: 'Reach an extra level in your nutrition planning with ProtoMeal',
            },
            () => {
              //
            },
          );
        } else {
          window.open(href);
        }
      }),
    );
}
