import { database } from "../firebase/";
import { Wishlist } from "./Wishlist.js";
import { User } from "../authentication/";
import { editUser } from '../authentication/db.js';

function _getWishlistRef(uid) {
  return database.collection('Wishlists').doc('' + uid);
}

function _getRefDoc(ref) {
  return ref.get().then((doc) => {
    return doc;
  }).catch((error) => {
    throw error;
  });
}

function _wishlistExists(uid) {
  return _getRefDoc(_getWishlistRef(uid)).exists;
}

function _getWishlistDoc(uid) {
  return _getRefDoc(_getWishlistRef(uid));
}

function addWishlistItem(uid, item) {
  let wishlist = fetchWishlistByUid(uid);
  wishlist.items.push(item);
  _getWishlistRef(uid).set(wishlist);
}

function createWishlistWithOwner(user) {
  const uid = user.generateWishlistUid();
  const ref = _getWishlistRef(uid);
  const doc = _getRefDoc(ref);
  if(doc.exists)
    throw "createWishlistWithOwner(): Wishlist with uid " 
         + uid 
         + " already exists";
  ref.set(Wishlist("Unnamed wishlist", user.uid, uid);
}

function fetchWishlistByUid(uid) {
  const ref = _getWishlistRef(uid);
  const doc = _getRefDoc(ref);
  if(!doc.exists)
    throw "fetchWishlistByUid(): No wishlist with uid " + uid + " exists";
  return {...Wishlist(), ...doc.data()};
}

function fetchAllWishlistsFromUser(user) {
  return user.wishlists.map(fetchWishlistByUid);
}

export {
  createWishlistWithOwner,
  fetchWishlistByUid,
  fetchAllWishlistsFromUser
};
