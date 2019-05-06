import { db as wishlistDb } from "../wishlists";
import { database } from "../firebase/";

const { fetchWishlistByUid, _getWishlistRef } = wishlistDb;

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

function _getWishlistRef(uid) {
  return database.collection("Wishlists").doc("" + uid);
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

const fetchWishlistByUid = async uid => {
  const ref = _getWishlistRef(uid);
  const doc = await _getRefDoc(ref);
  if (!doc.exists)
    throw new Error(
      "fetchWishlistByUid(): No wishlist with uid " + uid + " exists"
    );
  return { ...doc.data() };
};

export default {
  fetchWishlistByUid,
  addWishlistItem,
  editWishlistItem,
  removeWishlistItem
};
