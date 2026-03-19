import { CLEAR_ERROR, ClearError, SET_ERROR, SetError } from '../actions';
import { StoreState } from '../types';

type State = StoreState['error'];

const initialValue: State = '';

export function error(state: State = initialValue, action: ClearError | SetError): State {
  switch (action.type) {
    case SET_ERROR:
      return action.error;
    case CLEAR_ERROR:
      return initialValue;
    default:
      return state;
  }
}
