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

// Returns either:
// * A wishlist object, if loading is successful
// * A UID string, if wishlist has been removed from database
// * Undefines, if loading fails for some unknown reason
const fetchWishlistByUid = async uid => {
  return _getWishlistRef(uid)
    .get()
    .then(doc => {
      if (doc.data()) return { ...defaultWishlist, ...doc.data() };
      else if (!doc.exists) {
        console.log("(DB) user wishlist doesn't exist: " + uid);
        return uid; // Hacky, but it lets the Saga handle a deleted wishlist
      } else return undefined; // Wishlist not missing, but not properly loaded somehow
    });
};

const editWishlistProperties = async (uid, field, data) => {
  await _getWishlistRef(uid).update({ [field]: data });
  return fetchWishlistByUid(uid);
};

const fetchAllWishlistsFromUser = user => {
  return Promise.all(user.wishlists.map(uid => fetchWishlistByUid(uid)));
};

const fetchAllOwnedWishlistsFromUser = user => {
  return Promise.all(user.ownedWishlists.map(uid => fetchWishlistByUid(uid)));
};

const deleteWishlistFromUser = async (uid, user) => {
  const _ref = database.collection("Users").doc("" + user.uid);

  console.log("(DB) deleting wishlist from user: " + uid + ", " + user.name);

  await _ref.get().then(doc => {
    return _ref
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
    .then(() => console.log("Wishlist deleted"));
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
