import { changeNetworkStatus } from '../actions';
import store from '../reducers/store';

export class NetworkStatusHandler {
  constructor() {
    store.dispatch(changeNetworkStatus(navigator.onLine));
    window.addEventListener('online', this.changeStatus, {capture: true, passive: true});
    window.addEventListener('offline', this.changeStatus, {capture: true, passive: true});
  }

  public changeStatus = () => store.dispatch(changeNetworkStatus(navigator.onLine));
}
