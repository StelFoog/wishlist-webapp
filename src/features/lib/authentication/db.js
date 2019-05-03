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
  return (await _getUserDoc(uid)).exists;
};

async function getUser(uid) {
  const doc = await _getUserDoc(uid);
  return !doc.exists ? null :{...makeUser(), ...doc.data()};
}

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

async function logInAndCreateUserIfDoesNotExist(firebaseUser) {
  if(!userExistsWithUid(firebaseUser.uid))
    makeUser(makeUser(firebaseUser.displayName, firebaseUser.uid));

  const user = {...makeUser(firebaseUser.displayName, firebaseUser.uid),
                ...(await getUser(firebaseUser.uid))};
  editUser(user.uid, user);
  return user;
};

const addNewWishlistIdToUser = async (uid, wishlistId) => {
  if (!(await userExistsWithUid(uid)))
    throw new Error(
      "addNewWishlistIdToUser: No user with UID " + uid + " exists"
    );
  let userData = (await getUser(uid));
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
