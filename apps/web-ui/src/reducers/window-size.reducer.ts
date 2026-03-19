import {
  SAVE_WINDOW_SIZE,
  SaveWindowSize,
} from '../actions';
import { StoreState } from '../types';

type State = StoreState['windowSize'];

const initialValue: State = {
  height: window.innerHeight,
  width: window.innerWidth,
};

export function windowSize(state: State = initialValue, action: SaveWindowSize): State {
  switch (action.type) {
    case SAVE_WINDOW_SIZE:
      return {
        height: action.height,
        width: action.width,
      };
    default:
      return state;
  }
}
