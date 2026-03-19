import { RouteComponentProps } from 'react-router';
import {
  AllSettings,
} from '..';
import { UsiUnion } from '../../types';

interface OwnProps {
  onSetHeaderScrolledState: (scrolled: boolean) => void;
  focusedProduct?: string;
}

export interface  ReduxStateProps {
  showNutrients: boolean;
  mobileLayout: boolean;
  locked: boolean;
}

export interface ReduxViewStateProps extends ReduxStateProps {
  getSettings?: () => AllSettings;
}

export interface  ReduxDispatchProps {
  onAddProductToDate: (
    productId: string,
    date: string,
    productWeight: number,
    mealTime: number,
  ) => void;
  onChangeRemoteSettings: (changes: Array<UsiUnion>) => void;
  onChangeDate: (date: string) => void;
  onUnlockDay: (date: string) => void;
}

export type Props = OwnProps & ReduxViewStateProps & ReduxDispatchProps & RouteComponentProps;

export type HocProps = OwnProps & ReduxStateProps & ReduxDispatchProps & RouteComponentProps;
