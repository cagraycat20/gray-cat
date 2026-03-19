module.exports = (name, actionData) => {
  return (
`import {
  ${actionData.interfaceName},
  ${actionData.constName},
} from '../actions';
import { StoreState } from '../types';

type State = StoreState['${name}']

const initialValue: State = {};

export function ${name}(state: State = initialValue, action: ${actionData.interfaceName}): State {
  switch (action.type) {
    case ${actionData.constName}:
      return state;
    default:
      return state;
  }
}
`)
}
