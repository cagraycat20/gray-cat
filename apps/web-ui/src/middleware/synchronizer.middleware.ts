import { debounceTime, filter, map } from 'rxjs/operators';

import {
  CHANGE_LOCAL_SETTINGS,
  ChangeLocalSettings,
  GcEpic,
  loadDays,
  saveDirtyDays,
  ShouldSaveDay,
  ShouldSaveSettings,
  syncRemoteSettings,
} from '../actions';

export const dayChangeTriggerEpic: GcEpic = (action$) => action$
  .pipe(
    // tslint:disable-next-line: no-any
    filter((action: any) => (action as ShouldSaveDay).saveDay),
    map(() => saveDirtyDays()),
  );

export const setSelectedDateTriggerEpic: GcEpic = (action$) => action$
  .ofType<ChangeLocalSettings>(CHANGE_LOCAL_SETTINGS)
  .pipe(
    filter(({changes: {selectedDate: date}}) => Boolean(date)), // only if selected date changed
    debounceTime(300),
    map(({changes: {selectedDate: date}}) => loadDays(date as string, date as string)),
  );

export const settingsChangeTriggerEpic: GcEpic = (action$, store) => action$
  .pipe(
    // tslint:disable-next-line: no-any
    filter((action: any) => (action as ShouldSaveSettings).saveSettings),
    debounceTime(200),
    map(() => syncRemoteSettings()),
  );
