import types from "./types.js";

const {
  SEARCH_FOR_USERS_WITH_NAME,
  AUTH_LOGOUT,
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  ADD_USER_TO_WISHLIST
} = types;

const authenticateFacebook = () => ({
  type: AUTH_USER_FACEBOOK
});

const authenticateGoogle = () => ({
  type: AUTH_USER_GOOGLE
});

const logout = () => ({
  type: AUTH_LOGOUT
});

const addUserToWishlist = wishlistUid => ({
  type: ADD_USER_TO_WISHLIST,
  wishlistUid
});

const searchForUsersWithName = (name, list) => ({
  type: SEARCH_FOR_USERS_WITH_NAME,
  name,
  list
});

export default {
  authenticateFacebook,
  authenticateGoogle,
  logout,
  addUserToWishlist,
  searchForUsersWithName
};
