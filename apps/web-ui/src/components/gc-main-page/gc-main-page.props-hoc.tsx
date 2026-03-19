import * as React from 'react';
import {
  AllSettings,
  SettingsConsumer,
} from '..';
import {
  HocProps,
} from './gc-main-page.types';
import { GcMainPageViewStyled } from './gc-main-page.view';

// we need hoc because comp. is used in router and can't be wrapped directly
export class GcMainPageHoc extends React.PureComponent<HocProps> {
  public render() {
    return <SettingsConsumer>{this.innerRender}</SettingsConsumer>;
  }

  private innerRender = (getSettings?: () => AllSettings) => {
    const {...restProps } = this.props;
    return (
      <GcMainPageViewStyled
        {...restProps}
        getSettings={getSettings}
      />
    );
  }
}
