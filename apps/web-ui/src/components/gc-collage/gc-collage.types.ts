import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Observable } from 'rxjs';
import { SocialPage } from '../../types';
import { CollageDayInfo } from '../../utils/collage.utils';

export interface OwnProps {
  open: boolean;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  onClose: () => void;
}

export interface ReduxStateProps {
  info?: CollageDayInfo;
}

export interface ReduxDispatchProps {
  onError: (message: string) => void;
  onShare: (page: SocialPage) => Observable<string>;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
