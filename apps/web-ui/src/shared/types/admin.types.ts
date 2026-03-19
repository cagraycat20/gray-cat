export const TAB_KEY_PRODUCTS = 'products';
export const TAB_KEY_LOGS = 'logs';
export const TAB_KEY_USERS = 'users';
export type TabKey = typeof TAB_KEY_PRODUCTS | typeof TAB_KEY_LOGS | typeof TAB_KEY_USERS;

export const TAB_TITLE_PRODUCTS = 'Products';
export const TAB_TITLE_LOGS = 'Event Logs';
export const TAB_TITLE_USERS = 'Users';
export type TabTitle = typeof TAB_TITLE_PRODUCTS | typeof TAB_TITLE_LOGS | typeof TAB_TITLE_USERS;

export interface Tab {
  key: TabKey;
  title: TabTitle;
}

export const Tabs: Array<Tab> = [
  {key: TAB_KEY_PRODUCTS, title: TAB_TITLE_PRODUCTS},
  {key: TAB_KEY_LOGS, title: TAB_TITLE_LOGS},
  {key: TAB_KEY_USERS, title: TAB_TITLE_USERS},
];
