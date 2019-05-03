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

const userExistsWithUid = uid => {
  console.log(uid);
  console.log(_getUserDoc(uid));
  return _getUserDoc(uid).exists;
};

const getUser = uid => {
  const doc = _getUserDoc(uid);
  console.log(typeof doc);
  return !doc.exists ? null : { ...makeUser(), ...doc.data() };
};

const createUser = user => {
  const ref = _getUserRef(user.uid);
  if (_getRefDoc(ref).exists)
    throw new Error(
      "createUser(): User with UID " + user.uid + " already exists"
    );
  ref.set(user);
};

const editUser = (uid, newUser) => {
  const ref = _getUserRef(uid);
  if (_getRefDoc(ref).exists)
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

const addNewWishlistIdToUser = (uid, wishlistId) => {
  if (!userExistsWithUid(uid))
    throw new Error(
      "addNewWishlistIdToUser: No user with UID " + uid + " exists"
    );
  let userData = getUser(uid);
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
