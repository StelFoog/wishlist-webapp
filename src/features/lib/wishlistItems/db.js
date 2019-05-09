import db from "../wishlists/db";
import { database } from "../firebase/";

const { fetchWishlistByUid, _getWishlistRef } = db;

const addWishlistItem = async (wishlistId, item) => {
  /*let wishlist = await fetchWishlistByUid(uid);
  wishlist.items.push(item);
  _getWishlistRef(uid).set(wishlist);*/
  await modifyWishlistItems(wishlistId, (items) => {
    items.unshift(item);
    return items;
  });
};

const editWishlistItem = async (wishlistId, index, item) => {
  /*let wishlist = await fetchWishlistByUid(uid);
  if (index < 0 || index >= wishlist.items.length)
    throw new Error("editWishlistItem(): Item index out of bounds");
  const oldItem = wishlist.items[index];
  wishlist.items[index] = { ...oldItem, ...item };
  _getWishlistRef(uid).set(wishlist);*/
  await modifyWishlistItems(wishlistId, (items) => {
    items[index] = {...items[index], ...item};
    return items;
  });
}

const removeWishlistItem = async (index, wishlistId) => {
  /*let wishlist = await fetchWishlistByUid(uid);
  if (index < 0 || index >= wishlist.items.length)
    throw new Error("removeWishlistItem(): Item index out of bounds");
  wishlist.items.splice(index, 1);
  _getWishlistRef(uid).set(wishlist);
  */
  await modifyWishlistItems(wishlistId, (items) => {
    items.splice(index, 1);
    return items;
  });
}

const claimWishlistItem = async (userId, index, wishlistId) => {
  /*const ref = _getWishlistRef(wishlistId);

  let wishlist = await fetchWishlistByUid(wishlistId);

  if (!wishlist.items[index].claimedBy.includes(userId)) {
    wishlist.items[index].claimedBy.push(userId);
    await _getWishlistRef(wishlistId).set(wishlist);
  }*/

  await modifyWishlistItems(wishlistId, (items) => {
    if(!items[index].claimedBy.includes(userId))
      items[index].claimedBy.push(userId);
    return items;
  });
}

const modifyWishlistItems = async (wishlistId, lambda) => {
  let wishlist = await fetchWishlistByUid(wishlistId);
  wishlist.items = lambda(wishlist.items);
  await _getWishlistRef.set(wishlist);
}

// ?
const makeItem = item => ({
  price: "",
  description: "",
  ...item
});

export default {
  fetchWishlistByUid,
  addWishlistItem,
  editWishlistItem,
  removeWishlistItem,
  makeItem,
  claimWishlistItem
};
