import * as React from 'react';
import { connect } from 'react-redux';
import {
  AllSettings,
  StoreState,
} from '../types';

const SettingsContext = React.createContext<(() => AllSettings) | undefined>(undefined);

interface Props {settings: AllSettings; }

class SettingsProviderView extends React.PureComponent<Props> {
  public render() {
    return (
      <SettingsContext.Provider value={this.getSettings}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
  private getSettings = () => this.props.settings;
}

export const SettingsProvider =
  connect((state: StoreState): Props =>
    ({
      settings: {
        ...state.remoteSettings.view,
        ...state.localSettings,
      },
    }),
  )(SettingsProviderView);

export const SettingsConsumer = SettingsContext.Consumer;
