import { firebase } from "../firebase/";
import { logInAndCreateUserIfDoesNotExist } from "./db.js";

const authWithProvider = async provider =>
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      return logInAndCreateUserIfDoesNotExist(result.user);
    })
    .catch(error => {
      throw error;
    });

const authWithFacebookAPI = async () =>
  await authWithProvider(new firebase.auth.FacebookAuthProvider());

const authWithGoogleAPI = async () =>
  await authWithProvider(new firebase.auth.GoogleAuthProvider());

export { authWithFacebookAPI, authWithGoogleAPI };
