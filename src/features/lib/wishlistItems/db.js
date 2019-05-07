import { fetchWishlistByUid, _getWishlistRef } from "../wishlists/db";
import { database } from "../firebase/";

const addWishlistItem = async (uid, item) => {
  let wishlist = await fetchWishlistByUid(uid);
  wishlist.items.push(item);
  _getWishlistRef(uid).set(wishlist);
};

async function editWishlistItem(uid, index, item) {
  let wishlist = await fetchWishlistByUid(uid);
  if (index < 0 || index >= wishlist.items.length)
    throw new Error("editWishlistItem(): Item index out of bounds");
  wishlist.items[index] = item;
  _getWishlistRef(uid).set(wishlist);
}

async function removeWishlistItem(uid, index) {
  let wishlist = await fetchWishlistByUid(uid);
  if (index < 0 || index >= wishlist.items.length)
    throw new Error("removeWishlistItem(): Item index out of bounds");
  wishlist.items.splice(index, 1);
  _getWishlistRef(uid).set(wishlist);
}

const _getRefDoc = async ref => {
  return ref
    .get()
    .then(doc => {
      return doc;
    })
    .catch(error => {
      throw error;
    });
};

export {
  fetchWishlistByUid,
  addWishlistItem,
  editWishlistItem,
  removeWishlistItem
};
