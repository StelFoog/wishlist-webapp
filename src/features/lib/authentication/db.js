import { database } from '../firebase/';
import { makeUser } from './user.js';

function _getUserRef(uid) {
  return database.collection('Users').doc('' + uid);
}

function _getRefDoc(ref) {
  return ref.get().then((doc) => {
    return doc;
  }).catch((error) => {
    throw error;
  });
}

function _getUserDoc(uid) {
  return _getRefDoc(_getUserRef(uid));
}

function userExistsWithUid(uid) {
  return _getUserDoc(uid).exists;
}

function getUser(uid) {
  const doc = _getUserDoc(uid);
  return !doc.exists ? null :{...makeUser(), ...doc.data()};
}

function createUser(user) {
  const ref = _getUserRef(user.uid);
  if(_getRefDoc(ref).exists)
    throw "createUser(): User with UID " + user.uid + " already exists";
  ref.set(user);
}

function editUser(uid, newUser) {
  const ref = _getUserRef(uid);
  if(_getRefDoc(ref).exists)
    throw "editUser(): No user with UID " + uid + " exists";
  ref.set(newUser);
}

function logInAndCreateUserIfDoesNotExist(firebaseUser) {
  if(!userExistsWithUid(firebaseUser.uid))
    makeUser(makeUser(firebaseUser.displayName, firebaseUser.uid));

  const user = {...makeUser(firebaseUser.displayName, firebaseUser.uid),
                ...getUser(firebaseUser.uid)};
  editUser(user.uid, user);
  return user;
}

export {
  userExistsWithUid,
  getUser,
  editUser,
  createUser,
  logInAndCreateUserIfDoesNotExist
};
