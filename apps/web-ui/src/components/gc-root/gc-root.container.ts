import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { saveWindowSize } from '..';
import {
  StoreState,
  themeCustomData,
} from '..';
import {
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-root.types';
import { GcRootViewWithDndContext } from './gc-root.view';

function mapStateToProps(state: StoreState): ReduxStateProps {
  return {
    mobileLayout: state.windowSize.width <=
      themeCustomData.custom.breakpoints.col4sWithFavorites,
    showIntro: !state.remoteSettings.view.flags.introIsShowed,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onResize: (height, width) => dispatch(saveWindowSize(height, width)),
  };
}

export const GcRootContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
)(GcRootViewWithDndContext);
