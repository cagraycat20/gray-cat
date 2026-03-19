import {
  LocalSettings,
} from '../..';
import { Hint } from '../../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  hint?: LocalSettings['hint'];
}

export interface ReduxDispatchProps {
  onClose: () => void;
  onAddHiddenHint: (hint: Hint) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
