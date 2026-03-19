import { Omit } from 'react-router';
import {
  LocalSettings,
} from '../types';

export const CHANGE_LOCAL_SETTINGS = 'CHANGE_LOCAL_SETTINGS';
export interface ChangeLocalSettings {
  type: typeof CHANGE_LOCAL_SETTINGS;
  changes: Partial<Omit<LocalSettings,
    // some fields shouldn't be changed in this way
    'daysHistory'>>;
}
export function changeLocalSettings(
  changes: ChangeLocalSettings['changes']): ChangeLocalSettings {
  return { type: CHANGE_LOCAL_SETTINGS, changes };
}

export const CHANGE_PRICES_DIALOG = 'CHANGE_PRICES_DIALOG';
export interface ChangePricesDialog {
  type: typeof CHANGE_PRICES_DIALOG;
  changes: Partial<LocalSettings['pricesDialog']>;
}

export function changePricesDialog(changes: ChangePricesDialog['changes']): ChangePricesDialog {
  return {
    type: CHANGE_PRICES_DIALOG,
    changes,
  };
}

export const CHANGE_INTAKE_SUGAR_DIALOG = 'CHANGE_INTAKE_SUGAR_DIALOG';
export interface ChangeIntakeSugarDialog {
  type: typeof CHANGE_INTAKE_SUGAR_DIALOG;
  changes: Partial<LocalSettings['intakeSugarDialog']>;
}
export function changeIntakeSugarDialog(changes: ChangeIntakeSugarDialog['changes']): ChangeIntakeSugarDialog {
  return {
    type: CHANGE_INTAKE_SUGAR_DIALOG,
    changes,
  };
}

export const CHANGE_FOOD_COMPARISON_DIALOG = 'CHANGE_FOOD_COMPARISON_DIALOG';
export interface ChangeFoodComparisonDialog {
  type: typeof CHANGE_FOOD_COMPARISON_DIALOG;
  changes: Partial<LocalSettings['foodComparisonDialog']>;
}
export function changeFoodComparisonDialog(changes: ChangeFoodComparisonDialog['changes']): ChangeFoodComparisonDialog {
  return {
    type: CHANGE_FOOD_COMPARISON_DIALOG,
    changes,
  };
}

export const UNLOCK_PAST_DAY = 'UNLOCK_PAST_DAY';
export interface UnlockPastDay {
  type: typeof UNLOCK_PAST_DAY;
  date: string;
}

export function unlockPastDay(date: string): UnlockPastDay {
  return {
    type: UNLOCK_PAST_DAY,
    date,
  };
}
