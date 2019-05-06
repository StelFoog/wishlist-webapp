import { database } from "../firebase/";
import { makeWishlist } from "../wishlist.js";

function _getWishlistRef(uid) {
  return database.collection('Wishlists').doc('' + uid);
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
  return { ...makeWishlist(), ...doc.data() };
};

export default { fetchWishlistByUid };