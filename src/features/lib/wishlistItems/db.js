import db from "../wishlists/db";
import { database } from "../firebase/";
import defaultItem from "./item.js";

const { fetchWishlistByUid, _getWishlistRef } = db;

const addWishlistItem = async (wishlistId, item) => {
  await modifyWishlistItems(wishlistId, items => {
    items.push(item);
    return items;
  });
};

const editWishlistItem = async (wishlistId, index, item) => {
  await modifyWishlistItems(wishlistId, items => {
    items[index] = { ...items[index], ...item };
    return items;
  });
};

const removeWishlistItem = async (index, wishlistId) => {
  await modifyWishlistItems(wishlistId, items => {
    items.splice(index, 1);
    return items;
  });
};

const claimWishlistItem = async (userId, index, wishlistId) => {
  await modifyWishlistItems(wishlistId, items => {
    if (!items[index].claimedBy.includes(userId))
      items[index].claimedBy.push(userId);
    return items;
  });
};

const modifyWishlistItems = async (wishlistId, lambda) => {
  let wishlist = await fetchWishlistByUid(wishlistId);
  wishlist.items = lambda(wishlist.items);
  await _getWishlistRef(wishlistId).set(wishlist);
};

// ?
const makeItem = item => ({
  ...defaultItem,
  ...{
    name: "",
    description: ""
  },
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
