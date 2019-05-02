import types from "./types.js";

const { CREATE_USER_WISHLIST, FETCH_WISHLISTS } = types;

const createUserWishlist = () => ({
  type: CREATE_USER_WISHLIST
});

const fetchWishlists = () => ({
  type: FETCH_WISHLISTS
})

export default {
  createUserWishlist,
  fetchWishlists
};
