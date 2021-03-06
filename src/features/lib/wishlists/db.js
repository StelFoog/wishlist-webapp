import { database } from "../firebase/";
import { defaultWishlist } from "./wishlist";
import { generateWishlistUid } from "../authentication/user";

const _getWishlistRef = uid => database.collection("Wishlists").doc("" + uid);

const createWishlistWithOwner = async (user, wishlistData) => {
  const uid = generateWishlistUid(user);
  const wishlist = {
    ...defaultWishlist,
    ...{
      uid: uid,
      owner: user.uid
    },
    ...wishlistData
  };

  await _getWishlistRef(uid).set(wishlist);

  return wishlist;
};

// Returns either:
// * A wishlist object, if loading is successful
// * A UID string, if wishlist has been removed from database
// * Undefines, if loading fails for some unknown reason
const fetchWishlistByUid = async uid => {
  return _getWishlistRef(uid)
    .get()
    .then(doc => {
      return !doc.exists
        ? { deleted: true, uid: uid }
        : !doc.data()
          ? null
          : { ...defaultWishlist, ...doc.data() };
    });
};

const editWishlistProperties = async (uid, field, data) => {
  await _getWishlistRef(uid).update({ [field]: data });
  return fetchWishlistByUid(uid);
};

const fetchAllWishlistsFromUser = async user => {
  return await Promise.all(user.wishlists.map(uid => fetchWishlistByUid(uid)));
};

const fetchAllOwnedWishlistsFromUser = user => {
  return Promise.all(user.ownedWishlists.map(uid => fetchWishlistByUid(uid)));
};

const deleteWishlistFromUser = async (uid, userUid) => {
  const _ref = database.collection("Users").doc("" + userUid);

  await _ref.get().then(doc => {
    return doc.exists && _ref
      .update({
        ownedWishlists: doc.data().ownedWishlists.filter(id => id !== uid),
        wishlists: doc.data().wishlists.filter(id => id !== uid)
      })
      .then();
  });
};

const deleteWishlistFromDB = async uid => {
  await _getWishlistRef(uid)
    .delete()
    .then(() => console.log("Wishlist deleted from DB: " + uid));
};

function onWishlistChanged(uid, callback) {
  return _getWishlistRef(uid).onSnapshot(doc => {
    callback(doc.data());
  });
}

export default {
  editWishlistProperties,
  _getWishlistRef,
  createWishlistWithOwner,
  fetchWishlistByUid,
  fetchAllWishlistsFromUser,
  fetchAllOwnedWishlistsFromUser,
  deleteWishlistFromUser,
  deleteWishlistFromDB,
  onWishlistChanged
};
