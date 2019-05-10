import types from "./types.js";

const { SET_CURRENT_WISHLIST_OR_GROUP } = types;

const setCurrentWishlistOrGroup = uid => ({
  type: SET_CURRENT_WISHLIST_OR_GROUP,
  uid
});

export default {
  setCurrentWishlistOrGroup
};
