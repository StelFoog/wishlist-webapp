import { firebase } from "../firebase/";
import { logInAndCreateUserIfDoesNotExist } from "./db.js";

<<<<<<< HEAD
<<<<<<< HEAD
const authWithProvider = async provider =>
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
=======
=======
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7
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

<<<<<<< HEAD
const authWithGoogleAPI = async () =>
  await authWithProvider(new firebase.auth.GoogleAuthProvider());
=======
=======
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7
async function authWithFacebookAPI() {
  return await authWithProvider(new firebase.auth.FacebookAuthProvider());
}

async function authWithGoogleAPI() {
	return await authWithProvider(new firebase.auth.GoogleAuthProvider());
}
>>>>>>> Fixed bug in database regarding reading of user data

export { authWithFacebookAPI, authWithGoogleAPI };
