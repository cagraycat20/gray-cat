import {
  CHANGE_BODYWEIGHT_INFO,
  CHANGE_FAVORITE_SORT_ORDER,
  CHANGE_FLAGS,
  CHANGE_REMOTE_SETTINGS,
  ChangeBodyWeightInfo,
  ChangeFavoriteSortOrder,
  ChangeFlags,
  ChangeRemoteSettings,
  SYNC_REMOTE_SETTINGS_COMPLETE,
  SyncRemoteSettingsComplete,
} from '../actions';
import { RemoteSettings, UserSettingsKind, UsiUnion } from '../shared';
import { mergeFreshUsi } from '../shared/utils/merge.utils';
import {
  StoreState,
} from '../types';
import { defaultSettingItems, usu } from '../utils/user-settings.utils';

type State = StoreState['remoteSettings'];

const defaultState: State = {
  items: defaultSettingItems,
  view: usu.getView(defaultSettingItems),
};

function addNewItems(oldItems: RemoteSettings['items'], newItems: RemoteSettings['items']) {
  const getId = (item: UsiUnion) => `${item.kind}_${item.id || ''}`;

  const result = oldItems.filter(
    (oldItem) => !newItems.some((newItem) => getId(oldItem) === getId(newItem)),
  );

  const getSortOrder = (kind: UserSettingsKind) => {
    const maxOrder = result.reduce(
      (order, item) => {
        return item.kind === kind && !item.deleted
          ? Math.max(order, item.sortOrder || 0)
          : order;
      },
      0,
    );
    return maxOrder + 1; // one based index
  };

  newItems.forEach((item) => {
    result.push({
      ...item,
      lastModified: Date.now(),
      sortOrder: item.deleted ? 0 : getSortOrder(item.kind),
    });
  });

  return result;
}

function calculateView(state: State) {
  return {
    ...state,
    view: usu.getView(state.items),
  };
}

export function remoteSettings(
  state: State = defaultState,
  action: ChangeRemoteSettings | SyncRemoteSettingsComplete | ChangeFavoriteSortOrder
    | ChangeFlags | ChangeBodyWeightInfo,
): State {
  switch (action.type) {
    case CHANGE_REMOTE_SETTINGS:
      return calculateView({
        ...state,
        items: addNewItems(state.items, action.changes),
      });
    case CHANGE_FAVORITE_SORT_ORDER:
      return calculateView({
        ...state,
        items: usu.sortFavorites(action.productId, action.targetProductId, state.items),
      });
    case CHANGE_FLAGS:
      return calculateView({
        ...state,
        items: addNewItems(state.items, usu.setPartialFlags(action.changes, state.items)),
      });
    case CHANGE_BODYWEIGHT_INFO:
      return calculateView({
        ...state,
        items: addNewItems(state.items, usu.setPartialBodyWeight(action.payload, state.items)),
    });
    case SYNC_REMOTE_SETTINGS_COMPLETE:
      return calculateView({
        ...action.settings,
        // we might have some new items in state that were created while sync request
        items: mergeFreshUsi(state.items, action.settings.items),
      });
    default:
      return state;
  }
}
