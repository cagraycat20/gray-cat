import { DayInfo } from '../shared/types';

export const LOAD_DAYS = 'LOAD_DAYS';
export interface LoadDays {
  type: typeof LOAD_DAYS;
  from: string;
  to: string;
}

export function loadDays(from: string, to: string): LoadDays {
  return {
    type: LOAD_DAYS,
    from,
    to,
  };
}

export const LOAD_DAYS_COMPLETE = 'LOAD_DAYS_COMPLETE';
export interface LoadDaysComplete {
  type: typeof LOAD_DAYS_COMPLETE;
  days: Array<DayInfo>;
}

export function loadDaysComplete(days: Array<DayInfo>): LoadDaysComplete {
  return {
    type: LOAD_DAYS_COMPLETE,
    days,
  };
}

export const SAVE_DIRTY_DAYS = 'SAVE_DIRTY_DAYS';
export interface SaveDirtyDays {
  type: typeof SAVE_DIRTY_DAYS;
}

export function saveDirtyDays(): SaveDirtyDays {
  return {
    type: SAVE_DIRTY_DAYS,
  };
}

export const SAVE_DIRTY_DAYS_COMPLETE = 'SAVE_DIRTY_DAYS_COMPLETE';
export interface SaveDirtyDaysComplete {
  type: typeof SAVE_DIRTY_DAYS_COMPLETE;
  days: Array<DayInfo>;
}

export function saveDirtyDaysComplete(days: Array<DayInfo>): SaveDirtyDaysComplete {
  return {
    type: SAVE_DIRTY_DAYS_COMPLETE,
    days,
  };
}
