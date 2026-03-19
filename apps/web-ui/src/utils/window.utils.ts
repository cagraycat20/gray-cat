import { changeLocalSettings, loadDays, loadProducts, saveDirtyDays, syncRemoteSettings } from '../actions';
import store from '../reducers/store';
import auth from '../services/Auth';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}

class WindowEventHandler {
  private deferredPrompt?: BeforeInstallPromptEvent;

  constructor() {
    window.addEventListener('focus', this.onFocus, {capture: true, passive: true});
    window.addEventListener('load', this.onLoad, {capture: true, passive: true});
    window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
  }

  public showInstallPrompt() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      // bug in chrome userChoice is not resolved when install button click
      // so temporary we hide button here. move this into userChoice callback after bug fix.
      store.dispatch(changeLocalSettings({canInstallApp: false}));
      this.deferredPrompt.userChoice.then((choiceResult) => {
        // store.dispatch(changeLocalSettings({canInstallApp: false}));
        this.deferredPrompt = undefined;
      });
    }
  }

  private onFocus = (event: FocusEvent) => {
    if (event.target === window) {
      const {selectedDate} = store.getState().localSettings;
      store.dispatch(loadDays(selectedDate, selectedDate));
      store.dispatch(syncRemoteSettings());
    }
  }

  private onLoad = async (event: FocusEvent) => {
    const token = await auth.getToken();
    store.dispatch(loadProducts(store.getState().localSettings.lastProductsRequest));
    if (token) {
      const {selectedDate} = store.getState().localSettings;
      store.dispatch(syncRemoteSettings());
      store.dispatch(loadDays(selectedDate, selectedDate));
      store.dispatch(saveDirtyDays());
    }
  }

  private onBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      this.deferredPrompt = event;
      store.dispatch(changeLocalSettings({canInstallApp: true}));
    }
  }
}

export const windowEventHandler = new WindowEventHandler();
