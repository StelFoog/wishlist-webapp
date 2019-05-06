import { db as wishlistDb } from "../wishlists";

const { fetchWishlistByUid, _getWishlistRef } = wishlistDb;

const addWishlistItem = async (uid, item) => {
  let wishlist = await fetchWishlistByUid(uid);
  wishlist.items.push(item);
  _getWishlistRef(uid).set(wishlist);
};

async function editWishlistItem(uid, index, item) {
  let wishlist = await fetchWishlistByUid(uid);
  if(index < 0 || index >= wishlist.items.length)
    throw new Error("editWishlistItem(): Item index out of bounds");
  wishlist.items[index] = item;
  _getWishlistRef(uid).set(wishlist);
}

async function removeWishlistItem(uid, index) {
  let wishlist = await fetchWishlistByUid(uid);
  if(index < 0 || index >= wishlist.items.length)
    throw new Error("removeWishlistItem(): Item index out of bounds");
  wishlist.items.splice(index, 1);
  _getWishlistRef(uid).set(wishlist);
}

export { addWishlistItem, editWishlistItem, removeWishlistItem };
