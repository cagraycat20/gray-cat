import { UsiUnion } from '../../../types';

export interface OwnProps {
  onClose: () => void;
}

export interface ReduxStateProps {
  showNutrients: boolean;
}

export interface ReduxDispatchProps {
  onChangeRemoteSettings: (changes: Array<UsiUnion>) => void;
}

export interface Props extends OwnProps, ReduxStateProps, ReduxDispatchProps {
}
