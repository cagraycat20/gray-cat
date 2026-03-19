import { applyMiddleware, compose, createStore } from 'redux';

import { rootReducer } from '.';
import { checkDayLockMiddleWare, epicMiddleware, rootEpic } from '../middleware';
import { localStorageSaver } from '../utils/local-storage-saver';

// tslint:disable-next-line: no-any
const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// tslint:disable-next-line: no-any
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      checkDayLockMiddleWare,
      epicMiddleware,
    ),
    localStorageSaver,
  ),
);

epicMiddleware.run(rootEpic);

export default store;
