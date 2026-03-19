import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { GcEpicMiddleWare } from '../types';
import {
  loadDaysEpic,
  saveDirtyDaysEpic,
} from './days.middleware';
import { importProductsEpic, loadProductsEpic, removeProductEpic } from './products.middleware';
import { syncSettingsEpic } from './settings.middleware';
import {
  dayChangeTriggerEpic,
  setSelectedDateTriggerEpic,
  settingsChangeTriggerEpic,
} from './synchronizer.middleware';

export * from './check-day-lock.middleware';

export const epicMiddleware: GcEpicMiddleWare = createEpicMiddleware();

export const rootEpic = combineEpics(
  loadProductsEpic,
  removeProductEpic,
  importProductsEpic,
  loadDaysEpic,
  saveDirtyDaysEpic,
  syncSettingsEpic,
  dayChangeTriggerEpic,
  setSelectedDateTriggerEpic,
  settingsChangeTriggerEpic,
);
