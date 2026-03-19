import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import * as React from 'react';
import { Provider } from 'react-redux';
import {
  GcRoot,
  SettingsProvider,
} from '..';
import store from '../../reducers/store';

// Until we implement support of Safari and test on Opera
(function checkBrowser() {
  let chrome = navigator.userAgent.indexOf('Chrome') > -1;
  const firefox = navigator.userAgent.indexOf('Firefox') > -1;
  const opera = navigator.userAgent.toLowerCase().indexOf('op') > -1;
  if ((chrome) && (opera)) {
    chrome = false;
  }
  if (!(chrome || firefox)) {
  setTimeout(() => {alert(
        'Your browser is not fully supported yet.\n' +
        'Unexpected behavior can occur. \n' +
        'Try Chrome or Firefox.');
    },       5000);
  }
})();

export class GcApp extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <SettingsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GcRoot />
          </MuiPickersUtilsProvider>
        </SettingsProvider>
      </Provider>
    );
  }
}
