import {
  CHANGE_DAY,
  CHANGE_DAY_PRODUCT_TIME,
  CHANGE_DAY_PRODUCT_WEIGHT,
  CHANGE_MEAL_TIME,
  ChangeDay,
  ChangeDayProductTime,
  ChangeDayProductWeight,
  ChangeMealTime,
  CLEAR_MEAL,
  ClearMeal,
  COPY_DAY,
  CopyDay,
  LOAD_DAYS_COMPLETE,
  LoadDaysComplete,
  SAVE_DIRTY_DAYS_COMPLETE,
  SaveDirtyDaysComplete,
  UNDO_LAST_DAY_CHANGE,
  UndoLastDayChange,
} from '../actions';
import {
  dateUtils,
  MAX_PRODUCT_WEIGHT,
} from '../shared';
import {
  ConsumedProduct,
  DayInfo,
  StoreState,
} from '../types';
import { dayInfoHelper as dih } from '../utils';

type State = StoreState['days'];

type DaysAction = ChangeDayProductWeight | ChangeDayProductTime | ChangeDay | UndoLastDayChange |
  CopyDay | ClearMeal | LoadDaysComplete | ChangeMealTime | SaveDirtyDaysComplete;

const dirty = () => ({dirty: true, lastModified: Date.now()});

function changeDay(state: State, action: ChangeDay): State {
  let found = false;

  const newState = state.map((dayInfo) => {
    if (dayInfo.date === action.payload.date) {
      found = true;
      return {
        ...dayInfo,
        ...action.payload,
        ...dirty(),
      };
    } else {
      return dayInfo;
    }
  });

  if (!found) {
    newState.push(Object.assign(
      {
        date: action.payload.date,
        consumed: [],
        bodyWeight: 0,
        desiredBodyWeight: 0,
        expanded: false,
        ...dirty(),
      } as DayInfo,
      action.payload,
    ));
  }
  return newState;
}

function changeDayProductWeight(state: State, action: ChangeDayProductWeight): State {
  const { date, productId, replace, productWeight, mealTime} = action.payload;

  // just removing product from day
  if (replace && (productWeight === 0)) {
    return state.map((dayInfo) => {
      if (dayInfo.date === action.payload.date) {
        return {
          ...dayInfo,
          consumed: dayInfo.consumed.filter((iter) =>
            (iter.productId !== action.payload.productId) || !dih.sameMealTime(mealTime, iter.time)),
          ...dirty(),
        };
      } else {
        return dayInfo;
      }
    });
  }

  const curDayInfo = state.find((dayInfo: DayInfo) => dayInfo.date === date);
  if ((!curDayInfo) && (productWeight <= 0)) {
    return state;
  }

  const product = curDayInfo
    ? curDayInfo.consumed.find((iter) => (iter.productId === productId) && dih.sameMealTime(mealTime, iter.time))
    : null;

  const newProduct: ConsumedProduct = {
    productId,
    productWeight: Math.min(
      ((product && !replace) ? product.productWeight + productWeight : productWeight),
      MAX_PRODUCT_WEIGHT,
    ),
    time: mealTime,
  };

  // just in case there is NaN, null or other shit
  newProduct.productWeight = newProduct.productWeight || 0;

  let needPush = true;
  const newProductWeights = curDayInfo
    // important to keep order to avoid change of position of prod. card.
    ? curDayInfo.consumed.map((iter) => {
      if ((iter.productId === productId) && dih.sameMealTime(mealTime, iter.time)) {
        needPush = false;
        return newProduct;
      }
      return iter;
    })
    : [];

  if (needPush) {
    newProductWeights.push(newProduct);
  }

  const newState = state.filter((dayInfo: DayInfo) => dayInfo.date !== date);
  newState.push({
    date,
    consumed: newProductWeights,
    ...dirty(),
  });

  return newState;
}

function changeDayProductTime(state: State, action: ChangeDayProductTime): State {
  const { oldMealTime, newMealTime, date, productId } = action.payload;

  return state.map((dayInfo) => {
    if (dayInfo.date === date) {
      return {
        ...dayInfo,
        consumed: dayInfo.consumed
          .reduce((result: Array<ConsumedProduct>, iter) => {
            const newItem =
              (dih.sameMealTime(oldMealTime, iter.time) && iter.productId === productId)
              ? {...iter, time: newMealTime}
              : iter;

            const index = dih.findConsumedIndex(newItem.productId, newItem.time, result);

            if (index > -1) {
              result[index] = {
                ...newItem,
                productWeight: result[index].productWeight + newItem.productWeight,
              };
            } else {
              result.push(newItem);
            }
            return result;
          },      []),
          ...dirty(),
      };
    } else {
      return dayInfo;
    }
  });
}

function copyDay(state: State, action: CopyDay): State {
  const { fromDate, date} = action.payload;

  const dayFrom = dih.findDay(fromDate, state);
  const dayTo = dih.findDay(date, state);
  if (!dayFrom || (date === fromDate)) {
    return state;
  }

  const newState = state.filter((dayIter) => dayIter.date !== date);
  const consumed: Array<ConsumedProduct> = dayFrom.consumed.map((productWeightIter) => ({...productWeightIter}));

  if (dayTo) {
    newState.push({
      ...dayTo,
      consumed,
      ...dirty(),
    });
  } else {
    newState.push({
      date,
      consumed,
      ...dirty(),
    });
  }
  return newState;
}

function clearMeal(state: State, action: ClearMeal): State {
  const { mealTime, date } = action.payload;

  return state.map((dayInfo) => {
    if (dayInfo.date === date) {
      return {
        ...dayInfo,
        consumed: dayInfo.consumed
          .filter((iter) => !dih.sameMealTime(mealTime, iter.time)),
        ...dirty(),
      };
    } else {
      return dayInfo;
    }
  });
}

function changeMealTime(state: State, action: ChangeMealTime): State {
  const { oldMealTime, newMealTime, date } = action.payload;

  return state.map((dayInfo) => {
    if (dayInfo.date === date) {
      return {
        ...dayInfo,
        consumed: dayInfo.consumed
          .reduce((result: Array<ConsumedProduct>, iter) => {
            const newItem = (dih.sameMealTime(oldMealTime, iter.time))
              ? {...iter, time: newMealTime}
              : iter;

            const index = dih.findConsumedIndex(newItem.productId, newItem.time, result);

            if (index > -1) {
              result[index] = {
                ...newItem,
                productWeight: result[index].productWeight + newItem.productWeight,
              };
            } else {
              result.push(newItem);
            }
            return result;
          },      []),
          ...dirty(),
      };
    } else {
      return dayInfo;
    }
  });
}

function undoLastChange(state: State, action: UndoLastDayChange): State {
  const { date } = action.payload;
  return state.map((day) => {
    if (day.date === date) {
      if (day.consumedHistory && day.consumedHistory.length) {
        return {
          ...day,
          consumed: day.consumedHistory[day.consumedHistory.length - 1],
          consumedHistory: day.consumedHistory.length > 1
            ? day.consumedHistory.slice(0, day.consumedHistory.length - 1)
            : [],
          ...dirty(),
        };
      }
    }
    return day;
  });
}

function mergeDays(state: State, action: LoadDaysComplete | SaveDirtyDaysComplete): State {
  if (!action.days) {
    return state;
  }

  // keep only fresh data from server
  const serverDays = (action.days as Array<DayInfo>).reduce(
    (result: Array<DayInfo>, serverDay) => {
      const oldDay = dih.findDay(serverDay.date, state);
      if (!oldDay) {
        result.push(serverDay);
      } else {
        const newLastModified = serverDay.lastModified || 0;
        const oldLastModified = oldDay.lastModified || 0;
        if (newLastModified > oldLastModified) {
          result.push(serverDay);
        } else if (oldDay.dirty) {
          if (oldDay.consumedHistory && newLastModified === oldLastModified) {
            result.push({
              ...serverDay,
              consumedHistory: oldDay.consumedHistory,
            });
          } else {
            result.push(oldDay);
          }
        }
      }
      return result;
    },
    [],
  );

  if (serverDays.length > 0) {
    // filter out duplicates from state
    const stateDays = state.filter((day) => !serverDays.some(({date}) => date === day.date));
    return [...serverDays, ...stateDays];
  } else {
    return state;
  }
}

const historyLimit = 10;

function saveToHistory(oldState: State, newState: State, date: string) {
  if (date) {
    const oldDay = dih.findDay(date, oldState);
    const newDay = dih.findDay(date, newState);
    if (oldDay && newDay && oldDay.consumed !== newDay.consumed) {
      if (oldDay.consumedHistory) {
        newDay.consumedHistory = [...oldDay.consumedHistory, oldDay.consumed];
      } else {
        newDay.consumedHistory = [oldDay.consumed];
      }
      if (newDay.consumedHistory.length > historyLimit) {
        newDay.consumedHistory = newDay.consumedHistory.splice(1, newDay.consumedHistory.length - 1);
      }
    }
  }
}

export function days(state: State = [], action: DaysAction): State {
  let result = state;
  let dateToSaveToHistory: string | undefined;
  switch (action.type) {
    case CHANGE_DAY_PRODUCT_WEIGHT:
      result = changeDayProductWeight(state, action);
      dateToSaveToHistory = action.payload.date;
      break;

    case CHANGE_DAY_PRODUCT_TIME:
      result = changeDayProductTime(state, action);
      dateToSaveToHistory = action.payload.date;
      break;

    case CHANGE_DAY:
      result = changeDay(state, action);
      dateToSaveToHistory = action.payload.date;
      break;

    case COPY_DAY:
      result = copyDay(state, action);
      dateToSaveToHistory = action.payload.date;
      break;

    case CLEAR_MEAL:
      result = clearMeal(state, action);
      dateToSaveToHistory = action.payload.date;
      break;

    case CHANGE_MEAL_TIME:
      result = changeMealTime(state, action);
      dateToSaveToHistory = action.payload.date;
      break;

    case UNDO_LAST_DAY_CHANGE:
      result = undoLastChange(state, action);
      break;

    case LOAD_DAYS_COMPLETE:
      result = mergeDays(state, action);
      break;

    case SAVE_DIRTY_DAYS_COMPLETE:
      result = mergeDays(state, action);
      break;

    default:
      break;
  }

  if (result !== state) {
    // we need to sort new days
    result.sort((first, second) =>
      dateUtils.getDateDifference(dateUtils.getDate(first.date), dateUtils.getDate(second.date)));

    if (dateToSaveToHistory) {
      saveToHistory(state, result, dateToSaveToHistory);
    }
  }
  return result;
}
