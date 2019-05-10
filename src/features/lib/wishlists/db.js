import { database } from "../firebase/";
import { defaultWishlist } from "./wishlist";
import { generateWishlistUid } from "../authentication/user";

const _getWishlistRef = uid => database.collection("Wishlists").doc("" + uid);

const createWishlistWithOwner = async (user, wishlistName) => {
  const uid = generateWishlistUid(user);
  const wishlist = {
    ...defaultWishlist, 
    ...{
      title: wishlistName,
      uid: uid,
      owner: user.uid
    }
  };

  await _getWishlistRef(uid).set(wishlist);

  return wishlist;
};

const fetchWishlistByUid = async uid => {
  return _getWishlistRef(uid).get().then((doc) => {
    return { ...defaultWishlist, ...doc.data() };
  });
};

const editWishlistProperties = async (uid, fields) => {
  await _getWishlistRef(uid).update(fields);
};

const fetchAllWishlistsFromUser = user => {
  return Promise.all(user.wishlists.map(fetchWishlistByUid));
};

const fetchAllOwnedWishlistsFromUser = user => {
  return Promise.all(user.ownedWishlists.map(fetchWishlistByUid));
};

export default {
  editWishlistProperties,
  _getWishlistRef,
  createWishlistWithOwner,
  fetchWishlistByUid,
  fetchAllWishlistsFromUser,
  fetchAllOwnedWishlistsFromUser
};
