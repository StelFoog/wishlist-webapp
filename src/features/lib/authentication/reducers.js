import types from "./types.js";

const {
  AUTH_USER_ERROR,
  AUTH_USER_SUCCESS,
  AUTH_LOGOUT,
  ADD_USER_TO_WISHLIST_ERROR,
  ADD_USER_TO_WISHLIST_SUCCESS,
<<<<<<< HEAD
  ADD_WISHLIST_ID_TO_USER
=======
  ADD_GROUP_ID_TO_USER
>>>>>>> fixed group creation bugs
} = types;

const initialState = {
  user: null,
  loggedIn: false
};

const userReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, userData, error, wishlistUid, groupId } = action;

  switch (type) {
    case AUTH_USER_ERROR:
      console.error(
        "authentication error: " + error.code + "-> " + error.message
      );
      return { ...nextState };
    case AUTH_USER_SUCCESS:
      nextState.loggedIn = true;
      nextState.user = userData;
      console.log("Logged in!" + userData);
      return { ...nextState };
    case AUTH_LOGOUT:
      nextState.loggedIn = false;
      nextState.user = null;
      alert("logged out successfully");
      return { ...nextState };
    case ADD_USER_TO_WISHLIST_ERROR:
      console.error(
        "Wishlist invitation error: " + error.code + "-> " + error.message
      );
      return { ...nextState };
    case ADD_USER_TO_WISHLIST_SUCCESS:
      nextState.user.wishlists.push(wishlistUid);
      return { ...nextState };
    case ADD_WISHLIST_ID_TO_USER:
      console.log(wishlistUid);
      nextState.user.ownedWishlists.push(wishlistUid);
    case ADD_GROUP_ID_TO_USER:
      nextState.user.groups.push(groupId);
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default { userReducer };
