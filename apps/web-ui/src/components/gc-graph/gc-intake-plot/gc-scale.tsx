import { AbstractSeriesProps } from 'react-vis/es/plot/series/abstract-series';
import AbstractSeries from 'react-vis/es/plot/series/abstract-series';
import ScaleUtils from 'react-vis/es/utils/scales-utils';
import { PlotUtils } from '../gc-intake-over-time/gc-intake-over-time.types';

interface Props extends AbstractSeriesProps<{}> {
  getUtils: (utils: PlotUtils | null) => void;
}

export class GcScale extends AbstractSeries<Props> {
  public componentDidMount() {
    if (this.props.getUtils) {
      this.props.getUtils({
        offsetToValue: this.offsetToValue,
        valueToOffset: this.valueToOffset,
      });
    }
  }

  public componentWillUnmount() {
    if (this.props.getUtils) {
      this.props.getUtils(null);
    }
  }

  public offsetToValue = (xOffset: number) => {
    // tslint:disable-next-line: no-any
    const {marginLeft} = (this.props as any);
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x');
    return xScale.invert(xOffset - marginLeft);
  }

  public valueToOffset = (value: number) => {
    // tslint:disable-next-line: no-any
    const {marginLeft} = (this.props as any);
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x');
    return xScale(value) + marginLeft;
  }

  public render() {
    return null;
  }
}
