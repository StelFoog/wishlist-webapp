import types from "./types.js";

const {
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

export default {
  authenticateFacebook,
  authenticateGoogle,
  logout,
  addUserToWishlist
};
