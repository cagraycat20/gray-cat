import URLSearchParams from '@ungap/url-search-params';
import { Action } from 'redux';
import { defer, Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { resolve } from 'url';

import { catchError, map, switchMap } from 'rxjs/operators';
import auth from '../services/Auth';
import { StoreState } from '../types/store-state.types';

// todo move this in appropriate place
export const API_URL: string = process.env.REACT_APP_API_URL || '';

if (!API_URL) {
  throw new Error('API URL is not specified');
}

export type MapResponseToAction = (response: object) => Action;
export type MapErrorToAction = (error: string) => Action;
export type ApiResponse =
  (responseToAction: MapResponseToAction, errorToAction: MapErrorToAction) => Observable<Action>;

export type ApiPath =
    'userSettings'
  | 'products'
  | 'popularProducts'
  | 'imageSearch'
  | 'generateSocialPage'
  | 'generateConsumedProductsSummarySocialPage'
  | 'days'
  | 'admin/init'
  | 'admin/calcPopular'
  | 'admin/users'
  | 'feedbacks'
  | 'le'
  | 'logEvents'
  ;

export function apiCall(
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  path: ApiPath,
  params?: {[key: string]: string},
  body?: object,
): Observable<AjaxResponse> {
  let url = resolve(API_URL, path);
  if (params) {
    url += '?' + new URLSearchParams(params);
  }
  return defer(() => auth.getToken()).pipe(
    switchMap((authToken) => {
      const contentType = body ? {'content-type': 'application/json'} : {};
      return ajax({
        method,
        url,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          ...contentType,
          authorization: authToken ? `Bearer ${authToken}` : '',
        },
      });
    }),
  );
}

export function apiGet(path: ApiPath, params?: {[key: string]: string}): ApiResponse {
  return (responseToAction, errorToAction) => apiCall('GET', path, params).pipe(
    map(({response}) => responseToAction && responseToAction(response)),
    catchError((error) => of(errorToAction(error.message))),
  );
}

export function apiDelete(path: ApiPath, params?: {[key: string]: string}): ApiResponse {
  return (responseToAction, errorToAction) => apiCall('DELETE', path, params).pipe(
    map(({response}) => responseToAction && responseToAction(response)),
    catchError((error) => of(errorToAction(error.message))),
  );
}

export function apiPost(path: ApiPath, body?: object): ApiResponse {
  return (responseToAction, errorToAction) => apiCall('POST', path, undefined, body).pipe(
    map(({response}) => responseToAction && responseToAction(response)),
    catchError((error) => of(errorToAction(error.message))),
  );
}

export function apiPut(path: ApiPath, body?: object): ApiResponse {
  return (responseToAction, errorToAction) => apiCall('PUT', path, undefined, body).pipe(
    map(({response}) => responseToAction && responseToAction(response)),
    catchError((error) => of(errorToAction(error.message))),
  );
}

export function authFilter(store: StoreState) {
  return () => auth.authorized;
}
