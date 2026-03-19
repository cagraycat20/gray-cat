import { Reducer, Store, StoreEnhancerStoreCreator } from 'redux';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import auth from '../services/Auth';
import { StoreState } from '../types';
import { loadReduxState, removeReduxState, saveReduxState } from './local-storage.utils';

type SliceConfigBase<T> =  {
  [key in keyof T]?: boolean | SliceConfigBase<T[key]>
};
type SliceConfig = SliceConfigBase<StoreState>;

const sliceConfig: SliceConfig = {
  products: true,
  days: true,
  remoteSettings: {
    items: true,
  },
  localSettings: {
    selectedDate: true,
    lastProductsRequest: true,
    productList: true,
    productListDialog: true,
    notLoggedInWarning: true,
    pricesDialog: true,
  },
};

// tslint:disable-next-line: no-any
function deepSlice(source: any, config: SliceConfig | boolean): any {
  if (typeof source === 'object' && typeof config === 'object') {
    return Object.keys(config).reduce((acc, key) => {
      acc[key] = deepSlice(source[key], config[key]);
      return acc;
    },                                {});
  } else {
    return config ? source : undefined;
  }
}

// tslint:disable-next-line: no-any
function deepMerge(state: any, fromStorage: any): any {
  if (!Array.isArray(state) && typeof state === 'object') {
    if (typeof fromStorage !== 'object') {
      return state;
    }

    return Object.keys(state).reduce((acc, key) => {
      acc[key] = deepMerge(state[key], fromStorage[key]);
      return acc;
    },                               {});
  } else {
    return fromStorage !== undefined ? fromStorage : state;
  }
}

export const localStorageSaver = (next: StoreEnhancerStoreCreator<StoreState>) => {
  return (reducer: Reducer<StoreState>, initialState: StoreState) => {
    if (!initialState) {
      // tslint:disable-next-line: no-any
      initialState = reducer({} as any, {type: ''});
    }

    initialState = deepMerge(initialState, JSON.parse(loadReduxState(auth.email) || '{}'));
    const store: Store<StoreState> = next(reducer, initialState);

    const sub = new Subject();
    store.subscribe(() => {
      if (store.getState().remoteSettings.newUser) { // migrating user data
        const userData = loadReduxState('');
        if (userData) {
          saveReduxState(auth.email, userData);
          removeReduxState('');
        }
        window.location.reload();
      } else {
        sub.next();
      }
    });
    sub.pipe(debounceTime(500)).subscribe(() => {
      saveReduxState(auth.email, JSON.stringify(deepSlice(store.getState(), sliceConfig)));
    });

    return store;
  };
};
