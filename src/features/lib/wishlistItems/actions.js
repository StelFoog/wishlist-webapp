<<<<<<< HEAD
import types from "./types";

const { CREATE_WISHLIST_ITEM, FETCH_ALL_WISHLISTS } = types;

const createWishlistItem = wishlistUid => ({
  type: CREATE_WISHLIST_ITEM,
  wishlistUid
});
=======
import types from "./types.js";

const { FETCH_ALL_WISHLISTS } = types;
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7

const fetchAllItems = () => ({
  type: FETCH_ALL_WISHLISTS
});

<<<<<<< HEAD
export default {
  createWishlistItem,
  fetchAllItems
};
=======
export default { fetchAllItems };
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7
