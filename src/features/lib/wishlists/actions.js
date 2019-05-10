import types from "./types.js";

const {
  CREATE_USER_WISHLIST,
  FETCH_WISHLISTS,
  FETCH_OWNED_WISHLISTS,
  EDIT_WISHLIST_PROPERTIES
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

const editWishlistProperties = () => ({
  type: EDIT_WISHLIST_PROPERTIES
});

export default {
  createUserWishlist,
  fetchWishlists,
  fetchOwnedWishlists,
  editWishlistProperties
};
