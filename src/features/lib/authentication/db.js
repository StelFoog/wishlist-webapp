import { database, firebase } from "../firebase/";
import { defaultUser } from "./user.js";
import db from "../wishlists/db";

const { fetchWishlistByUid, editWishlist } = db;

const _getUserRef = uid => database.collection("Users").doc("" + uid);

const userExistsWithUid = async uid => {
  return (await getUser(uid)) !== null;
}

const getUser = async uid => {
  return await _getUserRef(uid).get().then((doc) => {
    return doc.exists ? doc.data() : null;
  });
};

const createUser = async (firebaseUser) => {
  const user = {
    ...defaultUser, 
    ...{name: firebaseUser.displayName, uid: firebaseUser.uid}
  };
  await _getUserRef(firebaseUser.uid).set(user);

  return user;
};

const setUser = (uid, user) => {
  _getUserRef(uid).set(user);
}

const logInAndCreateUserIfDoesNotExist = async firebaseUser => {
  if (await !userExistsWithUid(firebaseUser.uid))
    await createUser(firebaseUser);

  const user = {...defaultUser, ...(await getUser(firebaseUser.uid))}
  // Update database incase any fields are missing
  setUser(user.uid, user);
  return user;
};

const giveWishlistToUserAsOwner = async (uid, wishlistId) => {
  setUserProperty(uid, {
    ownedWishlists: firebase.firestore.FieldValue.arrayUnion(wishlistId)
  });
};

const setUserProperty = (uid, prop) => {
  _getUserRef(uid).update(prop);
}

const addInvitedWishlistToUser = ({ wishlistId, uid }) => {
  setUserProperty(uid, {
    wishlists: firebase.firestore.FieldValue.arrayUnion(wishlistId)
  });
};

const addInvitedUserToWishlist = ({ wishlistID, uid }) => {
  database
    .collection("Wishlists")
    .doc(wishlistID)
    .update({ members: firebase.firestore.FieldValue.arrayUnion(uid) });
};

const addNewWishlistIdToUser = (uid, wishlistId) => {
  addInvitedWishlistToUser({wishlistId, uid});
}

export {
  giveWishlistToUserAsOwner,
  userExistsWithUid,
  getUser,
  logInAndCreateUserIfDoesNotExist,
  addNewWishlistIdToUser,
  addInvitedUserToWishlist,
  addInvitedWishlistToUser
};
