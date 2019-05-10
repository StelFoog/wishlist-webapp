import types from "./types.js";

const { SET_CURRENT_WISHLIST_OR_GROUP } = types;

const setCurrentWishlistOrGroup = () => ({
  type: SET_CURRENT_WISHLIST_OR_GROUP
});

export default {
  setCurrentWishlistOrGroup
};
