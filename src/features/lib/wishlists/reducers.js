import types from "./types.js";

const { CREATE_USER_WISHLIST_ERROR, CREATE_USER_WISHLIST_SUCCESS } = types;

const initialState = {
  // TODO: Add some state?
};

const wishlistReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, wishlistData, error } = action;

  switch (type) {
    case CREATE_USER_WISHLIST_ERROR:
      console.error(
        "wishlist creation error: " + error.code + "-> " + error.message
      );
      return { ...nextState };
    case CREATE_USER_WISHLIST_SUCCESS:
      // TODO: Do something?
      console.log("Wishlist created!" + wishlistData);
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default { wishlistReducer };
