import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Observable } from 'rxjs';
import { Consumed, ConsumedProductSummary } from '../../../../types';
import { CollageConsumedProductsSummary } from '../../../../utils/collage.utils';

export interface OwnProps {
  open: boolean;
  dateFrom: Date;
  dateTo: Date;
  totalConsumed: Consumed;
  products: Array<ConsumedProductSummary>;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  onClose: () => void;
}

export interface ReduxStateProps {
  info: CollageConsumedProductsSummary;
}

export interface ReduxDispatchProps {
  onError: (message: string) => void;
  onShare: (image: string, products: CollageConsumedProductsSummary['products']) => Observable<string>;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
