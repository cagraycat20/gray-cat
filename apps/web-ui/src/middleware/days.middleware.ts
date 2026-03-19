import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import {
  GcEpic,
  LOAD_DAYS,
  LoadDays,
  loadDaysComplete,
  SAVE_DIRTY_DAYS,
  SaveDirtyDays,
  saveDirtyDaysComplete,
  setError,
} from '../actions';
import { DayInfo } from '../shared';
import { apiGet, apiPut, authFilter } from '../utils/request.utils';

export const loadDaysEpic: GcEpic = (action$, $state) => action$
  .ofType<LoadDays>(LOAD_DAYS)
  .pipe(
    filter(authFilter($state.value)),
    // debounceTime(300), //debounce set on CHANGE_DAY
    switchMap(({from, to}) =>
      apiGet('days', {from, to})(
        (days: Array<DayInfo>) => loadDaysComplete(days),
        (error) => setError(error),
      ),
    ),
  );

export const saveDirtyDaysEpic: GcEpic = (action$, $state) => action$
  .ofType<SaveDirtyDays>(SAVE_DIRTY_DAYS)
  .pipe(
    filter(authFilter($state.value)),
    debounceTime(500),
    map(() => $state.value.days.filter((day) => day.dirty)),
    filter((days) => Boolean(days.length)),
    map((days) => days.map(({dirty, consumedHistory, ...day}) => day)),
    switchMap(
      (days) => {
      return apiPut('days', days)(
        (response: Array<DayInfo>) => saveDirtyDaysComplete(response),
        (error) => setError(error),
      );
    }),
  );
