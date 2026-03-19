import { combineReducers, Reducer } from 'redux';
import { StoreState } from '../types';
import { days } from './days.reducer';
import { dndState } from './dnd-state.reducer';
import { error } from './error.reducer';
import { localSettings } from './local-settings.reducer';
import { network } from './network.reducer';
import { popupMessages } from './popup-messages.reducer';
import { products } from './products.reducer';
import { remoteSettings } from './remote-settings.reducer';
import { windowSize } from './window-size.reducer';
// INSERT HERE

const rootReducers: {[K in keyof StoreState]: Reducer<StoreState[K]>} = {
  products,
  days,
  error,
  popupMessages,
  dndState,
  network,
  localSettings,
  windowSize,
  remoteSettings,
  // INSERT HERE
};

export const rootReducer = combineReducers<StoreState>(rootReducers);
