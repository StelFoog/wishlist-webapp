import types from "./types.js";

const {
  SEARCH_FOR_USERS_WITH_NAME,
  AUTH_LOGOUT,
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  ADD_USER_TO_WISHLIST,
  REMOVE_USER_FROM_WISHLIST,
  CLEAR_SEARCH,
  UPDATE_CURRENT_USER
} = types;

const authenticateFacebook = () => ({
  type: AUTH_USER_FACEBOOK
});

const clearSearch = () => ({
  type: CLEAR_SEARCH
});

const authenticateGoogle = () => ({
  type: AUTH_USER_GOOGLE
});

const logout = () => ({
  type: AUTH_LOGOUT
});

const addUserToWishlist = (userUid, wishlistUid) => ({
  type: ADD_USER_TO_WISHLIST,
  userUid,
  wishlistUid
});

const removeUserFromWishlist = (userUid, wishlistUid) => ({
  type: REMOVE_USER_FROM_WISHLIST,
  userUid,
  wishlistUid
});

const searchForUsersWithName = name => ({
  type: SEARCH_FOR_USERS_WITH_NAME,
  name
});

const updateCurrentUser = user => ({
  // Used by listener
  type: UPDATE_CURRENT_USER,
  userData: user
});

export default {
  authenticateFacebook,
  authenticateGoogle,
  logout,
  addUserToWishlist,
  removeUserFromWishlist,
  searchForUsersWithName,
  clearSearch,
  updateCurrentUser
};
