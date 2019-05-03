import { database } from "../firebase/";
import { makeWishlist } from "./wishlist";
import { editUser } from "../authentication/db";
import { generateWishlistUid } from "../authentication/user";

const _getWishlistRef = uid => database.collection("Wishlists").doc("" + uid);

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

const addWishlistItem = (uid, item) => {
  let wishlist = fetchWishlistByUid(uid);
  wishlist.items.push(item);
  _getWishlistRef(uid).set(wishlist);
};

const createWishlistWithOwner = async (user, wishlistName) => {
  const uid = generateWishlistUid(user);
  const ref = _getWishlistRef(uid);
  const doc = await _getRefDoc(ref);
  if (doc.exists)
    throw new Error(
      "createWishlistWithOwner(): Wishlist with uid " + uid + " already exists"
    );
  const wishlist = makeWishlist(wishlistName, user.uid, uid);
  console.log(wishlist);
  ref.set(wishlist);
  return wishlist;
};

const fetchWishlistByUid = async uid => {
  const ref = _getWishlistRef(uid);
  const doc = await _getRefDoc(ref);
  if (!doc.exists)
    throw new Error(
      "fetchWishlistByUid(): No wishlist with uid " + uid + " exists"
    );
  return { ...makeWishlist(), ...doc.data() };
};

const fetchAllWishlistsFromUser = async user => {
  return await Promise.all(user.wishlists.map(fetchWishlistByUid));
};

export default {
  _getWishlistRef,
  createWishlistWithOwner,
  fetchWishlistByUid,
  fetchAllWishlistsFromUser
};
