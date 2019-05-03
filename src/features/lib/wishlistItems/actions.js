import types from "./types";

const { CREATE_WISHLIST_ITEM } = types;

const createWishlistItem = wishlistUid => ({
  type: CREATE_WISHLIST_ITEM,
  wishlistUid
});

export default {
  createWishlistItem
};
