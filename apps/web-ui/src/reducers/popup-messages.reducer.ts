import {
  REMOVE_POPUP_MESSAGE,
  RemovePopupMessage,
  SHOW_POPUP_MESSAGE,
  ShowPopupMessage,
} from '../actions';
import { StoreState } from '../types';

type State = StoreState['popupMessages'];

export function popupMessages(
  state: State = [],
  action: ShowPopupMessage | RemovePopupMessage,
): State {
  switch (action.type) {
    case SHOW_POPUP_MESSAGE:
      return state.concat(action.message);
    case REMOVE_POPUP_MESSAGE:
      return state.slice(1);
    default:
      return state;
  }
}
