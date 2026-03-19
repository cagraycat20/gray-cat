import * as React from 'react';

export function propsProcessorHoc<P1, P2 = P1>(
  processor: (inputProps: P1) => P2,
  Component: React.ComponentType<P2>,
): React.ComponentClass<P1> {
  class PropsProcessorHoc extends React.PureComponent<P1> {
    public render() {
      return <Component {...processor(this.props)}/>;
    }
  }
  return PropsProcessorHoc;
}
