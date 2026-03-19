function getKey(email: string) {
  return `redux_state_${email}`;
}

export function loadReduxState(email: string): string {
  return localStorage.getItem(getKey(email)) || '';
}

export function saveReduxState(email: string, state: string) {
  localStorage.setItem(getKey(email), state);
}

export function removeReduxState(email: string) {
  localStorage.removeItem(getKey(email));
}
