export const SAVE_WINDOW_SIZE = 'SAVE_WINDOW_SIZE';
export interface SaveWindowSize {
  type: typeof SAVE_WINDOW_SIZE;
  height: number;
  width: number;
}

export function saveWindowSize(height: number, width: number): SaveWindowSize {
  return {
    type: SAVE_WINDOW_SIZE,
    height,
    width,
  };
}
