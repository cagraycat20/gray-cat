import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GcApp } from './components';
import { applyTheme } from './shared/theme';
import { NetworkStatusHandler } from './utils';
import * as serviceWorker from './utils/serviceWorker';

const ThemedApp = applyTheme(GcApp);
export const nsHandler = new NetworkStatusHandler();

// tslint:disable-next-line:no-console
console.log(process.env.REACT_APP_VERSION);

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemedApp />
  </>,
  document.getElementById('root') as HTMLElement,
);

serviceWorker.register();
