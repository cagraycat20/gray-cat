import {
  Product,
 } from '../..';
import { LocalSettings } from '../../../types';

export interface OwnProps {
}

export interface ReduxStateProps {
  products: Array<Product>;
  settings: LocalSettings['intakeSugarDialog'];
}

export interface ReduxDispatchProps {
  onChangeSettings: (settings: LocalSettings['intakeSugarDialog']) => void;
}

export type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
