import { firebase } from "../firebase/";
import { logInAndCreateUserIfDoesNotExist } from './db.js';

async function authWithProvider(provider) {
	return await firebase.auth().signInWithPopup(provider)
		.then((result) => {
      return logInAndCreateUserIfDoesNotExist(result.user);
		}).catch((error) => {
      throw error;
		});
}

async function authWithFacebookAPI() {
  return await authWithProvider(new firebase.auth.FacebookAuthProvider());
}

async function authWithGoogleAPI() {
	return await authWithProvider(new firebase.auth.GoogleAuthProvider());
}

export {
	authWithFacebookAPI,
	authWithGoogleAPI
};
