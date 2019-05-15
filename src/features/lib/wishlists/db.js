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

const fetchWishlistByUid = async (uid, user) => {
  return _getWishlistRef(uid)
    .get()
    .then(doc => {
      if (doc.data()) return { ...defaultWishlist, ...doc.data() };
      else {
        console.log(
          "(DB) user wishlist doesn't exist: " + uid + ", " + user.name
        );
        deleteWishlistFromUser(uid, user);
        return undefined; // Will be pruned from local store by Redux
      }
    });
};

const editWishlistProperties = async (uid, field, data) => {
  await _getWishlistRef(uid).update({ [field]: data });
  return fetchWishlistByUid(uid);
};

const fetchAllWishlistsFromUser = user => {
  return Promise.all(
    user.wishlists.map(uid => fetchWishlistByUid(uid, user))
  ).then(list => list.filter(wishlist => (wishlist ? true : false)));
};

const fetchAllOwnedWishlistsFromUser = user => {
  return Promise.all(
    user.ownedWishlists.map(uid => fetchWishlistByUid(uid, user))
  );
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

export default {
  editWishlistProperties,
  _getWishlistRef,
  createWishlistWithOwner,
  fetchWishlistByUid,
  fetchAllWishlistsFromUser,
  fetchAllOwnedWishlistsFromUser,
  deleteWishlistFromUser,
  deleteWishlistFromDB
};
