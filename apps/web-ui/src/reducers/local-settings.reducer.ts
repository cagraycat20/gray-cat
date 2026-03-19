import {
  CHANGE_FOOD_COMPARISON_DIALOG,
  CHANGE_INTAKE_SUGAR_DIALOG,
  CHANGE_LOCAL_SETTINGS,
  CHANGE_PRICES_DIALOG,
  ChangeFoodComparisonDialog,
  ChangeIntakeSugarDialog,
  ChangeLocalSettings,
  ChangePricesDialog,
  LOAD_PRODUCTS_COMPLETE,
  LoadProductsComplete,
  UNLOCK_PAST_DAY,
  UnlockPastDay,
} from '../actions';
import { dateUtils } from '../shared';
import { StoreState } from '../types';

type State = StoreState['localSettings'];

const initialValue: State = {
  selectedDate: dateUtils.getFormattedDate(dateUtils.getCurrentDate()),
  unlockedDates: [],
  editingProduct: null,
  lastProductsRequest: 0,
  productList: {
    mode: 'popular',
    filter: {
      protein: false,
      fat: false,
      carbs: false,
    },
  },
  productListDialog: {
    mode: 'all',
    filter: {
      protein: false,
      fat: false,
      carbs: false,
    },
  },
  daysHistory: {},
  nutrSumSetDialog: false,
  canInstallApp: false,
  notLoggedInWarning: true,
  notLoggedInFeatureDenial: false,
  pricesDialog: {
    open: false,
    sortBy: 'none',
    sortDirection: 'asc',
  },
  hint: null,
  mealItemsToSave: [],
  addSavedMeal: null,
  foodComparisonDialog: {
    open: false,
    product1: null,
    product2: null,
  },
  intakeSugarDialog: {
    open: false,
    sortBy: 'name',
    sortDirection: 'asc',
  },
};

export function localSettings(
  state: State = initialValue,
  action: ChangeLocalSettings | ChangePricesDialog | UnlockPastDay | LoadProductsComplete | ChangeFoodComparisonDialog
  | ChangeIntakeSugarDialog,
): State {
  switch (action.type) {

    case CHANGE_LOCAL_SETTINGS:
    return {
      ...state,
      ...action.changes,
    };

    case CHANGE_PRICES_DIALOG:
    return {
      ...state,
      pricesDialog: {
        ...state.pricesDialog,
        ...action.changes,
      },
    };

    case UNLOCK_PAST_DAY:
      return {
        ...state,
        unlockedDates: [...state.unlockedDates.filter((date) => date !== action.date), action.date],
      };

    case LOAD_PRODUCTS_COMPLETE:
      return {
        ...state,
        lastProductsRequest: action.lastProductsRequest,
      };

    case CHANGE_FOOD_COMPARISON_DIALOG:
      return {
        ...state,
        foodComparisonDialog: {
          ...state.foodComparisonDialog,
          ...action.changes,
        },
      };

    case CHANGE_INTAKE_SUGAR_DIALOG:
      return {
        ...state,
        intakeSugarDialog: {
          ...state.intakeSugarDialog,
          ...action.changes,
        },
      };

    default:
      return state;
  }
}
