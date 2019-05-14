import types from "./types.js";

const {
  SEARCH_FOR_USERS_WITH_NAME,
  AUTH_LOGOUT,
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  ADD_USER_TO_WISHLIST,
  CLEAR_SEARCH
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

const addUserToWishlist = (wishlistUid, user) => ({
  type: ADD_USER_TO_WISHLIST,
  wishlistUid,
  user
});

const searchForUsersWithName = name => ({
  type: SEARCH_FOR_USERS_WITH_NAME,
  name
});

export default {
  authenticateFacebook,
  authenticateGoogle,
  logout,
  addUserToWishlist,
  searchForUsersWithName,
  clearSearch
};
