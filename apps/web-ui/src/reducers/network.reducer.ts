import { CHANGE_NETWORK_STATUS, ChangeNetworkStatus } from '../actions';
import { StoreState } from '../types';

type State = StoreState['network'];

const initialValue: State = {
  online: false,
};

export function network(state: State = initialValue, action: ChangeNetworkStatus): State {
  switch (action.type) {
    case CHANGE_NETWORK_STATUS:
      return {...state, online: action.online};
    default:
      return state;
  }
}
