import { firebase } from "../firebase/";
import { logInAndCreateUserIfDoesNotExist } from "./db.js";

const authWithProvider = provider => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => logInAndCreateUserIfDoesNotExist(result.user))
    .catch(error => {
      throw error;
    });
};

const authWithFacebookAPI = () =>
  authWithProvider(new firebase.auth.FacebookAuthProvider());

const authWithGoogleAPI = () =>
  authWithProvider(new firebase.auth.GoogleAuthProvider());

export { authWithFacebookAPI, authWithGoogleAPI };
