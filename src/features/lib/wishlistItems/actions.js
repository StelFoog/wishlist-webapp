import types from "./types";

const { CREATE_WISHLIST_ITEM, FETCH_ALL_WISHLISTS } = types;

const createWishlistItem = wishlistUid => ({
  type: CREATE_WISHLIST_ITEM,
  wishlistUid
});

const fetchAllItems = () => ({
  type: FETCH_ALL_WISHLISTS
});

export default {
  createWishlistItem,
  fetchAllItems
};
