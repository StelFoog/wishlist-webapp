import { firebase } from "../firebase/";
import { logInAndCreateUserIfDoesNotExist } from "./db.js";

<<<<<<< HEAD
const authWithProvider = async provider =>
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
=======
async function authWithProvider(provider) {
	return await firebase.auth().signInWithPopup(provider)
		.then((result) => {
>>>>>>> Fixed bug in database regarding reading of user data
      return logInAndCreateUserIfDoesNotExist(result.user);
    })
    .catch(error => {
      throw error;
    });

<<<<<<< HEAD
const authWithFacebookAPI = async () =>
  await authWithProvider(new firebase.auth.FacebookAuthProvider());

const authWithGoogleAPI = async () =>
  await authWithProvider(new firebase.auth.GoogleAuthProvider());
=======
async function authWithFacebookAPI() {
  return await authWithProvider(new firebase.auth.FacebookAuthProvider());
}

async function authWithGoogleAPI() {
	return await authWithProvider(new firebase.auth.GoogleAuthProvider());
}
>>>>>>> Fixed bug in database regarding reading of user data

export { authWithFacebookAPI, authWithGoogleAPI };
