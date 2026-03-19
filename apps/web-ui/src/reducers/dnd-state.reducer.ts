import {
  ChangeDndState,
  DND_STATE,
} from '../actions';
import { StoreState } from '../types';

type State = StoreState['dndState'];

const initialValue: State = {
  dndProduct: null,
};

export function dndState(
  state: State = initialValue,
  action: ChangeDndState,
): State {
  switch (action.type) {
    case DND_STATE:
      return {
        ...state,
        ...action.changes,
      };
    default:
      return state;
  }
}
