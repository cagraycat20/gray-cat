import {
  BodyWeightPoint,
  RemoteSettings,
  UserSettingsView,
  UsiUnion,
} from '../types';

export interface ShouldSaveSettings {
  saveSettings: true;
}

export const CHANGE_REMOTE_SETTINGS = 'CHANGE_REMOTE_SETTINGS';
export interface ChangeRemoteSettings extends ShouldSaveSettings {
  type: typeof CHANGE_REMOTE_SETTINGS;
  changes: Array<UsiUnion>;
}

export function changeRemoteSettings(changes: Array<UsiUnion>): ChangeRemoteSettings {
  return { type: CHANGE_REMOTE_SETTINGS, changes, saveSettings: true };
}

export const CHANGE_FLAGS = 'CHANGE_FLAGS';
export interface ChangeFlags extends ShouldSaveSettings {
  type: typeof CHANGE_FLAGS;
  changes: Partial<UserSettingsView['flags']>;
}
export function changeFlags(
  changes: ChangeFlags['changes']): ChangeFlags {
  return { type: CHANGE_FLAGS, changes, saveSettings: true };
}

export const CHANGE_BODYWEIGHT_INFO = 'CHANGE_BODYWEIGHT_INFO';
export interface ChangeBodyWeightInfo extends ShouldSaveSettings {
  type: typeof CHANGE_BODYWEIGHT_INFO;
  payload: BodyWeightPoint;
}
export function changeBodyWeightInfo(payload: BodyWeightPoint): ChangeBodyWeightInfo {
  return {
    type: CHANGE_BODYWEIGHT_INFO, payload, saveSettings: true,
  };
}

export const SYNC_REMOTE_SETTINGS = 'SYNC_REMOTE_SETTINGS';
export interface SyncRemoteSettings {
  type: typeof SYNC_REMOTE_SETTINGS;
}

export function syncRemoteSettings(): SyncRemoteSettings {
  return {
    type: SYNC_REMOTE_SETTINGS,
  };
}

export const SYNC_REMOTE_SETTINGS_COMPLETE = 'SYNC_REMOTE_SETTINGS_COMPLETE';
export interface SyncRemoteSettingsComplete {
  type: typeof SYNC_REMOTE_SETTINGS_COMPLETE;
  settings: RemoteSettings;
}

export function syncRemoteSettingsComplete(settings: RemoteSettings): SyncRemoteSettingsComplete {
  return {
    type: SYNC_REMOTE_SETTINGS_COMPLETE,
    settings,
  };
}

export const CHANGE_FAVORITE_SORT_ORDER = 'CHANGE_FAVORITE_SORT_ORDER';
export interface ChangeFavoriteSortOrder extends ShouldSaveSettings {
  type: typeof CHANGE_FAVORITE_SORT_ORDER;
  productId: string;
  targetProductId: string;
}
export function changeFavoriteSortOrder(productId: string, targetProductId: string): ChangeFavoriteSortOrder {
  return {
    type: CHANGE_FAVORITE_SORT_ORDER,
    productId,
    targetProductId,
    saveSettings: true,
  };
}
