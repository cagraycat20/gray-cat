import { DndState } from '.';

export const DND_STATE = 'DND_STATE';
export interface ChangeDndState {
  type: typeof DND_STATE;
  changes: Partial<DndState>;
}

export function changeDndState(changes: Partial<DndState>): ChangeDndState {
  return {
    type: DND_STATE,
    changes,
  };
}
