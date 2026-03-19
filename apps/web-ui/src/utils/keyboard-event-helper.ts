import * as React from 'react';

const codes = {
  Enter: 'Enter',
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Escape: 'Escape',
  KeyN: 'KeyN',
  n: 'KeyN',
  N: 'KeyN',
};

const keyCodeMap = {
  13: codes.Enter,
  27: codes.Escape,
  38: codes.ArrowUp,
  40: codes.ArrowDown,
  78: codes.KeyN,
};

class KeyboardEventHelper {
  public keys = codes;

  public getKey = (event: React.KeyboardEvent<Element> | KeyboardEvent) => {
    if (event.key !== undefined) {
      return codes[event.key];
    } else if (event.keyCode !== undefined) {
      return keyCodeMap[event.keyCode];
    }
  }

  public isEnter = (event: React.KeyboardEvent<HTMLElement>) =>
    this.getKey(event) === this.keys.Enter
}

export const keyboardEventHelper = new KeyboardEventHelper();
