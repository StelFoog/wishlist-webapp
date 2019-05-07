import { database, firebase } from "../firebase/";
import { makeUser } from "./user.js";
import { fetchWishlistByUid, editWishlist } from "../wishlists/db.js";

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

const userExistsWithUid = async uid => (await _getUserDoc(uid)).exists;

const getUser = async uid => {
  const doc = await _getUserDoc(uid);

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
  const doc = await _getRefDoc(ref);

  ref.set(newUser);
};

const logInAndCreateUserIfDoesNotExist = async firebaseUser => {
  if (await !userExistsWithUid(firebaseUser.uid))
    await createUser(makeUser(firebaseUser.displayName, firebaseUser.uid));
  console.log(firebaseUser);
  const user = {
    ...makeUser(firebaseUser.displayName, firebaseUser.uid),
    ...(await getUser(firebaseUser.uid))
  };
  await editUser(user.uid, user);
  return user;
};

const addNewWishlistIdToUser = async (uid, wishlistId) => {
  if (!(await userExistsWithUid(uid)))
    throw new Error(
      "addNewWishlistIdToUser: No user with UID " + uid + " exists"
    );
  let userData = await getUser(uid);
  userData.wishlists.push(wishlistId);
  editUser(uid, userData);
};

const giveWishlistToUserAsOwner = async (uid, wishlistId) => {
  let user = await getUser(uid);
  user.ownedWishlists.push(wishlistId);
  editUser(uid, user);

  let wishlist = await fetchWishlistByUid(wishlistId);
  wishlist.owner = uid;
  editWishlist(wishlistId, wishlist);
};

const addInvitedWishlistToUser = ({ wishlistID, uid }) => {
  database
    .collection("Users")
    .doc(uid)
    .update({
      wishlists: firebase.firestore.FieldValue.arrayUnion(wishlistID)
    });
};

const addInvitedUserToWishlist = ({ wishlistID, uid }) => {
  database
    .collection("Wishlists")
    .doc(wishlistID)
    .update({ members: firebase.firestore.FieldValue.arrayUnion(uid) });
};

export {
  giveWishlistToUserAsOwner,
  userExistsWithUid,
  getUser,
  editUser,
  createUser,
  logInAndCreateUserIfDoesNotExist,
  addNewWishlistIdToUser,
  addInvitedUserToWishlist,
  addInvitedWishlistToUser
};
