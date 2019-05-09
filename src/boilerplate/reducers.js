// Reducers listen to all incoming actions and augment the state acordingly.

import types from "./types";

const {
  BOILER_FOO,
  BOILER_BAR,
  BOILER_THING_SUCCESS,
  BOILER_THING_ERROR
} = types;

// An initialState that describes what the state should look like if none
// already exists.
const initialState = {
  foo: false,
  bar: null
};

// A reducer function that takes the old state and an action. Should only
// augment the state.
const boilerReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, payload, result, error } = action;

  switch (type) {
    case BOILER_FOO:
      nextState.foo = true;
      return { ...nextState };

    case BOILER_BAR:
      const bar = updateBar(nextState.bar, payload);
      nextState.bar = bar;
      return { ...nextState };

    case BOILER_THING_SUCCESS:
      nextState.foo = result ? false : true;
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

// Other functions can be in reducers.js, but should only be used by the
// reducers to perform any somewhat complicated logic needed to augment the
// state.
const updateBar = (oldBar, newBar) => {
  bar = bar ? bar : {};
  return { ...bar, ...newBar };
};

export default {
  boilerReducer
};
