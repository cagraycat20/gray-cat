import * as React from 'react';
import {
  Props,
  State,
} from './gc-container-layer.types';

export class GcContainerLayerView extends

  React.PureComponent<Props, State> {
  public state: State = {};

  public componentDidMount() {
    const {onGetApplyStyleCallback} = this.props;
    if (onGetApplyStyleCallback) {
      onGetApplyStyleCallback(this.applyStyle);
    }
  }

  public render(): JSX.Element {
    const { className, children } = this.props;
    return (
      <div
        className={className}
        style={this.state.style}
      >
        {children}
      </div>
    );
  }

  private applyStyle = (style: State['style']) => this.setState({style});
}
