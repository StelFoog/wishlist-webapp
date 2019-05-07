import types from "./types";

const { CREATE_WISHLIST_ITEM, FETCH_ALL_WISHLISTS, EDIT_WISHLIST_ITEM } = types;

const createWishlistItem = () => ({
  type: CREATE_WISHLIST_ITEM
});

const fetchAllItems = () => ({
  type: FETCH_ALL_WISHLISTS
});

const editWishlistItem = () => ({
  type: EDIT_WISHLIST_ITEM
})

export default {
  createWishlistItem,
  fetchAllItems,
  editWishlistItem
};
