import types from "./types.js";

const {
  CREATE_USER_WISHLIST,
  FETCH_WISHLISTS,
  FETCH_OWNED_WISHLISTS,
  EDIT_WISHLIST_PROPERTIES,
  TOGGLE_EDIT,
  DELETE_WISHLIST,
  UPDATE_CURRENT_WISHLIST
} = types;

const createUserWishlist = () => ({
  type: CREATE_USER_WISHLIST
});

const fetchOwnedWishlists = () => ({
  type: FETCH_OWNED_WISHLISTS
});

const fetchWishlists = () => ({
  type: FETCH_WISHLISTS
});

const editToggle = () => ({
  type: TOGGLE_EDIT
});

const editWishlistProperties = (uid, field, data) => ({
  type: EDIT_WISHLIST_PROPERTIES,
  uid,
  field,
  data
});

const deleteWishlist = (uid, user) => ({
  type: DELETE_WISHLIST,
  uid,
  user
});

const updateCurrentWishlist = wishlist => ({
  // Used by listener
  type: UPDATE_CURRENT_WISHLIST,
  wishlistData: wishlist
});

export default {
  createUserWishlist,
  fetchWishlists,
  fetchOwnedWishlists,
  editWishlistProperties,
  deleteWishlist,
  editToggle,
  updateCurrentWishlist
};
