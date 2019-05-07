import types from "./types.js";

const { CREATE_USER_WISHLIST, FETCH_WISHLISTS, FETCH_OWNED_WISHLISTS } = types;

const createUserWishlist = () => ({
  type: CREATE_USER_WISHLIST
});

const fetchOwnedWishlists = () => ({
  type: FETCH_OWNED_WISHLISTS
});

const fetchWishlists = () => ({
  type: FETCH_WISHLISTS
});

export default {
  createUserWishlist,
  fetchWishlists,
  fetchOwnedWishlists
};
