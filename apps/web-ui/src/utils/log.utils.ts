import * as React from 'react';
import { dateUtils } from '../shared';
import { apiCall } from './request.utils';

// tslint:disable-next-line:class-name
export const logRender = (inst: React.Component | string) => {
  if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-console
    console.debug('Render >>> ', typeof inst === 'object' ? inst.constructor.name : inst);
  }
};

// tslint:disable-next-line: no-any
export const logError = (...args: Array<any>) => {
  if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-console
    console.error(...args);
  }
};

export const logEvent = (event: string) => {
  const getId = () => {
    let id = localStorage.getItem('eventId');
    if (!id) {
      // tslint:disable-next-line:no-bitwise
      const getRandom = () => ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3);
      id = getRandom() + getRandom();
      localStorage.setItem('eventId', id);
    }
    return id;
  };

  try {
    apiCall('GET', 'le', {
        id: getId(),
        ct: dateUtils.getCurrentUnixTime().toString(),
        ev: event,
      }).toPromise();
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
  return true;
};
