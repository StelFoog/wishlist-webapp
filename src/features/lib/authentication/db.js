import { database, firebase } from "../firebase/";
import { defaultUser } from "./user.js";
import db from "../wishlists/db";

const { fetchWishlistByUid, editWishlist } = db;

const _getUserRef = uid => database.collection("Users").doc("" + uid);

const userExistsWithUid = async uid => {
  return (await getUser(uid)) !== null;
}

const userFromFirebaseUser = (firebaseUser) => {
  return {
    ...defaultUser,
    ...{
      name: firebaseUser.displayName,
      uid: firebaseUser.uid,
      profilePictureUrl: (firebaseUser.photoURL + "?height=100")
    }
}

const getUser = async uid => {
  return await _getUserRef(uid).get().then((doc) => {
    return doc.exists ? doc.data() : null;
  });
};

const createUser = async (firebaseUser) => {
  await _getUserRef(uid).set(userFromFirebaseUser(firebaseUser));
  return user;
};

const setUser = async (uid, user) => {
  await _getUserRef(uid).set(user);
}

const logInAndCreateUserIfDoesNotExist = async firebaseUser => {
  const uid = firebaseUser.uid;
  if (!(await userExistsWithUid(uid)))
    await createUser(firebaseUser);

  const user = {
    ...(await getUser(uid)), 
    ...userFromFirebaseUser(firebaseUser)
    }
  };
  // Update database incase any fields are missing
  await setUser(user.uid, user);
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
