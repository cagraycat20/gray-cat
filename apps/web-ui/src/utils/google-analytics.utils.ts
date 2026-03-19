import { logEvent } from './log.utils';

interface Gtag {
  (command: 'config', targetId: string, config?: ControlParams | EventParams | CustomParams): void;
  (command: 'set', config: CustomParams): void;
  (command: 'js', config: Date): void;
  (command: 'event', eventName: EventNames | string, eventParams?: ControlParams |  EventParams | CustomParams): void;
}

interface CustomParams {
  // tslint:disable-next-line:no-any
  [key: string]: any;
}

interface ControlParams {
  groups?: string | Array<string>;
  send_to?: string | Array<string>;
  event_callback?: () => void;
  event_timeout?: number;
}

type EventNames = 'add_payment_info'
  | 'add_to_cart'
  | 'add_to_wishlist'
  | 'begin_checkout'
  | 'checkout_progress'
  | 'exception'
  | 'generate_lead'
  | 'login'
  | 'page_view'
  | 'purchase'
  | 'refund'
  | 'remove_from_cart'
  | 'screen_view'
  | 'search'
  | 'select_content'
  | 'set_checkout_option'
  | 'share'
  | 'sign_up'
  | 'timing_complete'
  | 'view_item'
  | 'view_item_list'
  | 'view_promotion'
  | 'view_search_results';

interface EventParams {
  checkout_option?: string;
  checkout_step?: number;
  content_id?: string;
  content_type?: string;
  coupon?: string;
  currency?: string;
  description?: string;
  fatal?: boolean;
  items?: Array<Item>;
  method?: string;
  number?: string;
  promotions?: Array<Promotion>;
  screen_name?: string;
  search_term?: string;
  shipping?: Currency;
  tax?: Currency;
  transaction_id?: string;
  value?: number;
  event_label?: string;
  event_category?: string;
}

type Currency = string | number;

interface Item {
  brand?: string;
  category?: string;
  creative_name?: string;
  creative_slot?: string;
  id?: string;
  location_id?: string;
  name?: string;
  price?: Currency;
  quantity?: number;
}

interface Promotion {
  creative_name?: string;
  creative_slot?: string;
  id?: string;
  name?: string;
}

// tslint:disable-next-line:only-arrow-functions
export const gtag: Gtag = function() {
  // tslint:disable-next-line:no-any
  (window as any).dataLayer.push(arguments);
};

const { REACT_APP_GTAG_ID } = process.env;

export const initGoogleAnalytics = () => {
  // tslint:disable-next-line:no-any
  (window as any).dataLayer = (window as any).dataLayer || [];

  if (!REACT_APP_GTAG_ID) {
    // tslint:disable-next-line:no-console
    console.log('initGoogleAnalytics: REACT_APP_GTAG_ID undefined. skipped.');
    return;
  }

  const ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${REACT_APP_GTAG_ID}`;

  const s = document.getElementsByTagName('head')[0];
  s.insertBefore(ga, s.firstChild);

  gtag('js', new Date());
  gtag('config', REACT_APP_GTAG_ID);
};

export const gtagEvent = <T>(eventName: EventNames | string, fn: T): T => {
  if (typeof fn === 'function') {
    // tslint:disable-next-line:no-any
    return ((...args: Array<any>) => {
      gtag('event', eventName);
      logEvent(eventName);
      fn(...args);
    // tslint:disable-next-line:no-any
    }) as any as T;
  } else {
    return fn;
  }
};

export const gtagProxyMethod = <T>(object: T, ...keys: Array<keyof T>) => {
  keys.forEach((key) => object[key] = gtagEvent(String(key), object[key]));
};
