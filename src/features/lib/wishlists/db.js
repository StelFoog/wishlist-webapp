import { database } from "../firebase/";
import { makeWishlist } from "./wishlist";
import { editUser } from "../authentication/db";
import { generateWishlistUid } from "../authentication/user";

const _getWishlistRef = uid => database.collection("Wishlists").doc("" + uid);

const _getRefDoc = ref => {
  return ref
    .get()
    .then(doc => {
      return doc;
    })
    .catch(error => {
      throw error;
    });
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

const fetchAllWishlistsFromUser = user => {
  return Promise.all(user.wishlists.map(fetchWishlistByUid));
}

export default {
  _getWishlistRef,
  createWishlistWithOwner,
  fetchWishlistByUid,
  fetchAllWishlistsFromUser
};
