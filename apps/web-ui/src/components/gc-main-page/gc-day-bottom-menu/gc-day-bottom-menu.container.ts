import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import {
  changeLocalSettings,
  StoreState,
} from '../..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-day-bottom-menu.types';
import { GcDayBottomMenuViewStyled } from './gc-day-bottom-menu.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onChangeDate: (date: string) =>
      dispatch(changeLocalSettings({selectedDate: date})),
  };
}

export const GcDayBottomMenuContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcDayBottomMenuViewStyled);
