import { database } from "../firebase/";
import { makeUser } from "./user.js";

const _getUserRef = uid => database.collection("Users").doc("" + uid);

const _getRefDoc = ref =>
  ref
    .get()
    .then(doc => {
      return doc;
    })
    .catch(error => {
      throw error;
    });

const _getUserDoc = uid => _getRefDoc(_getUserRef(uid));

const userExistsWithUid = async uid => {
  console.log(uid);
  console.log(_getUserDoc(uid));
  const doc = await _getUserDoc(uid);
  return doc.exists;
};

const getUser = async uid => {
  const doc = await _getUserDoc(uid);
  console.log(typeof doc);

  return !doc.exists ? null : { ...makeUser(), ...doc.data() };
};

const createUser = async user => {
  const ref = _getUserRef(user.uid);
  const doc = await _getRefDoc(ref);
  if (doc.exists)
    throw new Error(
      "createUser(): User with UID " + user.uid + " already exists"
    );
  ref.set(user);
};

const editUser = async (uid, newUser) => {
  const ref = _getUserRef(uid);
  console.log(ref);
  const doc = await _getRefDoc(ref);
  if (!doc.exists)
    throw new Error("editUser(): No user with UID " + uid + " exists");
  ref.set(newUser);
};

const logInAndCreateUserIfDoesNotExist = firebaseUser => {
  if (!userExistsWithUid(firebaseUser.uid))
    makeUser(makeUser(firebaseUser.displayName, firebaseUser.uid));

  const user = {
    ...makeUser(firebaseUser.displayName, firebaseUser.uid),
    ...getUser(firebaseUser.uid)
  };
  editUser(user.uid, user);
  return user;
};

const addNewWishlistIdToUser = async (uid, wishlistId) => {
  if (!userExistsWithUid(uid))
    throw new Error(
      "addNewWishlistIdToUser: No user with UID " + uid + " exists"
    );
  let userData = await getUser(uid);
  console.log(userData);
  userData.wishlists.push(wishlistId);
  editUser(uid, userData);
};

export {
  userExistsWithUid,
  getUser,
  editUser,
  createUser,
  logInAndCreateUserIfDoesNotExist,
  addNewWishlistIdToUser
};
