import * as React from 'react';
import { Props } from './gc-tooltip.types';

export class GcTooltipView extends React.PureComponent<Props> {

  public render() {
    // logRender(this);
    const {children, ...restProps} = this.props;
    return (
      React.cloneElement(
        children,
        {title: restProps.title},
      )
      // there is performance issue with tooltip comp.
      // disable
      //   ? restProps.children
      //   : <Tooltip {...restProps} />
    );
  }
}
