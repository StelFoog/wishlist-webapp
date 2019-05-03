import { db as wishlistDb } from "../wishlists";

const { fetchWishlistByUid, _getWishlistRef } = wishlistDb;

const addWishlistItem = (uid, item) => {
  let wishlist = fetchWishlistByUid(uid);
  wishlist.items.push(item);
  _getWishlistRef(uid).set(wishlist);
};

export { addWishlistItem };
