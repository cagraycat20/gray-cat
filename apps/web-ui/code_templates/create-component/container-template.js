module.exports = (name, camelCaseName) => {
  return (
`import { connect } from 'react-redux';
import {
  Action,
  Dispatch,
} from 'redux';
import { StoreState } from '..';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './${name}.types';
import { ${camelCaseName}ViewStyled } from './${name}.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
  };
}

export const ${camelCaseName}Container =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(${camelCaseName}ViewStyled);
`)
}
