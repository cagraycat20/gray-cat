import { debounceTime, filter, switchMap } from 'rxjs/operators';

import { setError, SYNC_REMOTE_SETTINGS, syncRemoteSettingsComplete } from '../actions';
import { GcEpic, RemoteSettings } from '../types';
import { apiPost, authFilter } from '../utils/request.utils';

export const syncSettingsEpic: GcEpic = (action$, $state) => action$
  .ofType(SYNC_REMOTE_SETTINGS)
  .pipe(
    filter(authFilter($state.value)),
    debounceTime(500),
    switchMap(() => {
      const data = {items: $state.value.remoteSettings.items}; // send only items
      return apiPost('userSettings', data)(
        (settings: RemoteSettings) => syncRemoteSettingsComplete(settings),
        (error) => setError(error),
      );
    }),
  );
