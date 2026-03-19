export const SET_ERROR = 'SET_ERROR';
export interface SetError {
  type: typeof SET_ERROR;
  error: string;
}

export function setError(error: string): SetError {
  return {
    type: SET_ERROR,
    error,
  };
}

export const CLEAR_ERROR = 'CLEAR_ERROR';
export interface ClearError {
  type: typeof CLEAR_ERROR;
}

export function clearError(): ClearError {
  return {
    type: CLEAR_ERROR,
  };
}
