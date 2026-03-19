import {
  DayInfo,
} from '.';

export interface DayActionBase {
  payload: {
    date: string;
  };
}

export interface ShouldSaveDay extends DayActionBase {
  saveDay: true;
}

export interface CheckDayLock extends DayActionBase {
  checkDayLock: true;
}

export const CHANGE_DAY_PRODUCT_WEIGHT = 'CHANGE_DAY_PRODUCT_WEIGHT';
export interface ChangeDayProductWeight {
  type: typeof CHANGE_DAY_PRODUCT_WEIGHT;
  payload: {
    date: string;
    productId: string;
    productWeight: number;
    mealTime: number;
    replace?: boolean;
  };
}
export function changeDayProductWeight(
  payload: ChangeDayProductWeight['payload']): ChangeDayProductWeight & ShouldSaveDay & CheckDayLock {
  return {
    type: CHANGE_DAY_PRODUCT_WEIGHT,
    payload,
    saveDay: true,
    checkDayLock: true,
  };
}

export const CHANGE_DAY_PRODUCT_TIME = 'CHANGE_DAY_PRODUCT_TIME';
export interface ChangeDayProductTime {
  type: typeof CHANGE_DAY_PRODUCT_TIME;
  payload: {
    date: string;
    productId: string;
    oldMealTime: number;
    newMealTime: number;
  };
}
export function changeDayProductTime(
  payload: ChangeDayProductTime['payload']): ChangeDayProductTime & ShouldSaveDay & CheckDayLock {
  return {
    type: CHANGE_DAY_PRODUCT_TIME,
    payload,
    saveDay: true,
    checkDayLock: true,
  };
}

export const CHANGE_DAY = 'CHANGE_DAY';
export interface ChangeDay {
  type: typeof CHANGE_DAY;
  payload: {date: DayInfo['date']} & Partial<DayInfo>;
}
export function changeDay(payload: ChangeDay['payload']): ChangeDay & ShouldSaveDay & CheckDayLock {
  return {
    type: CHANGE_DAY,
    payload,
    saveDay: true,
    checkDayLock: true,
  };
}

export const COPY_DAY = 'COPY_DAY';
export interface CopyDay {
  type: typeof COPY_DAY;
  payload: {
    date: string;
    fromDate: string;
  };
}
export function copyDay(fromDate: string, date: string): CopyDay & ShouldSaveDay & CheckDayLock {
  return {
    type: COPY_DAY,
    payload : {date, fromDate},
    saveDay: true,
    checkDayLock: true,
  };
}

export const CLEAR_MEAL = 'CLEAR_MEAL';
export interface ClearMeal {
  type: typeof CLEAR_MEAL;
  payload: {
    date: string;
    mealTime: number;
  };
}
export function clearMeal(date: string, mealTime: number): ClearMeal & ShouldSaveDay & CheckDayLock {
  return {
    type: CLEAR_MEAL,
    payload: {date, mealTime},
    saveDay: true,
    checkDayLock: true,
  };
}

export const CHANGE_MEAL_TIME = 'CHANGE_MEAL_TIME';
export interface ChangeMealTime {
  type: typeof CHANGE_MEAL_TIME;
  payload: {
    date: string;
    oldMealTime: number;
    newMealTime: number;
  };
}
export function changeMealTime(
  date: string, oldMealTime: number, newMealTime: number): ChangeMealTime & ShouldSaveDay & CheckDayLock {
  return {
    type: CHANGE_MEAL_TIME,
    payload: {
      date,
      oldMealTime,
      newMealTime,
    },
    saveDay: true,
    checkDayLock: true,
  };
}

export const UNDO_LAST_DAY_CHANGE = 'UNDO_LAST_DAY_CHANGE';
export interface UndoLastDayChange {
  type: typeof UNDO_LAST_DAY_CHANGE;
  payload: {
    date: string;
  };
}
export function undoLastDayChange(date: string): UndoLastDayChange & ShouldSaveDay {
  return {
    type: UNDO_LAST_DAY_CHANGE,
    payload: {date},
    saveDay: true,
  };
}
