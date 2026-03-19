import { Action, Middleware, Store } from 'redux';

import LockIcon from '@material-ui/icons/Lock';
import { CheckDayLock, showPopupMessage, StoreState, unlockPastDay } from '../actions';
import { dateUtils } from '../shared';

export const checkDayLockMiddleWare: Middleware = (store: Store<StoreState>) => (next) =>
  (action: Action & CheckDayLock) => {
    if (action.checkDayLock && dateUtils.isDateLocked(
          action.payload.date,
          store.getState().localSettings.unlockedDates,
        )) {

      store.dispatch(showPopupMessage({
        attentionIcon: {
          icon: LockIcon,
          hoverDayOnly: true,
        },
        text: 'The past day is locked',
        actionButton: {
          caption: 'Unlock',
          actions: [unlockPastDay(action.payload.date), action],
        },
      }));
      return undefined;
    } else {
      return next(action);
    }
  };
