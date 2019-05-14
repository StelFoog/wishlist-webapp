import types from "./types.js";

const { SET_CURRENT_WISHLIST_OR_GROUP } = types;

const initialState = {
  currentWishlistOrGroup: null
};

const miscReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, uid } = action;
  switch (type) {
    case SET_CURRENT_WISHLIST_OR_GROUP:
      nextState.currentWishlistOrGroup = uid;
      return nextState;

    default:
      return nextState;
  }
};

export default { miscReducer };
