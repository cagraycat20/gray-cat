import { PopupMessage } from '../types';

export const SHOW_POPUP_MESSAGE = 'SHOW_POPUP_MESSAGE';
export interface ShowPopupMessage {
  type: typeof SHOW_POPUP_MESSAGE;
  message: PopupMessage;
}

export function showPopupMessage(message: PopupMessage): ShowPopupMessage {
  return {
    type: SHOW_POPUP_MESSAGE,
    message,
  };
}

export const REMOVE_POPUP_MESSAGE = 'REMOVE_POPUP_MESSAGE';
export interface RemovePopupMessage {
  type: typeof REMOVE_POPUP_MESSAGE;
}

export function removePopupMessage(): RemovePopupMessage {
  return {
    type: REMOVE_POPUP_MESSAGE,
  };
}
