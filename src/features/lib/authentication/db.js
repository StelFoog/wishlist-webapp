import { database, firebase } from "../firebase/";
import { defaultUser } from "./user.js";

const _getUserRef = uid => database.collection("Users").doc(uid.toString());

const userExistsWithUid = async uid => {
  return (await getUser(uid)) !== null;
};

const nextHigherString = (string) => {
  let seq = Array.from(string);
  ++seq[seq.length-1];
  return seq.join("");
}

const searchForUsersWithName = async (name, start, end) => {
  return Promise.all((await 
    database.collection("Users")
    .orderBy("name")
    .where("name", ">=", name)
    .where("name", "<", nextHigherString(name))
    .limit(20)
    .get()
    .then())
      .docs
      .map(doc => doc.data()));
}

const userFromFirebaseUser = firebaseUser => {
  return {
    ...defaultUser,
    ...{
      name: firebaseUser.displayName,
      uid: firebaseUser.uid,
      profilePictureUrl: firebaseUser.photoURL
    }
  };
};

const getUser = async uid => {
  return await _getUserRef(uid)
    .get()
    .then(doc => {
      return doc.exists ? doc.data() : null;
    });
};

const createUser = async firebaseUser => {
  const user = userFromFirebaseUser(firebaseUser);
  await _getUserRef(user.uid).set(user);
  return user;
};

const setUser = async (uid, user) => {
  await _getUserRef(uid).set(user);
};

const logInAndCreateUserIfDoesNotExist = async firebaseUser => {
  const uid = firebaseUser.uid;
  if (!(await userExistsWithUid(uid))) await createUser(firebaseUser);

  const user = {
    ...userFromFirebaseUser(firebaseUser),
    ...(await getUser(uid))
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
};

const addGroupToUser = (userId, groupId) => {
  setUserProperty(userId, {
    groups: firebase.firestore.FieldValue.arrayUnion(groupId)
  });
};

const removeGroupFromUser = (userId, groupId) => {
  setUserProperty(userId, {
    groups: firebase.firestore.FieldValue.arrayRemove(groupId)
  });
};

const addInvitedWishlistToUser = ({ wishlistId, uid }) => {
  setUserProperty(uid, {
    wishlists: firebase.firestore.FieldValue.arrayUnion(wishlistId)
  });
};

// Should really be moved to woshlists/db.js, but it was fucking with importing so I didn't
const addInvitedUserToWishlist = ({ wishlistID, uid }) => {
  database
    .collection("Wishlists")
    .doc(wishlistID)
    .update({ members: firebase.firestore.FieldValue.arrayUnion(uid) });
};

const addNewWishlistIdToUser = (uid, wishlistId) => {
  giveWishlistToUserAsOwner(uid, wishlistId);
};

export {
  giveWishlistToUserAsOwner,
  userExistsWithUid,
  getUser,
  logInAndCreateUserIfDoesNotExist,
  addNewWishlistIdToUser,
  addInvitedUserToWishlist,
  addInvitedWishlistToUser,
  addGroupToUser,
  removeGroupFromUser,
  searchForUsersWithName
};
