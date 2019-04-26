import { firebase } from "../firebase/";
import { logInAndCreateUserIfDoesNotExist } from './db.js';

function authWithProvider(provider) {
	return firebase.auth().signInWithPopup(provider)
		.then((result) => {
      return logInAndCreateUserIfDoesNotExist(result.user);
		}).catch((error) => {
      throw error;
		});
}

function authWithFacebookAPI() {
  return authWithProvider(new firebase.auth.FacebookAuthProvider());
}

function authWithGoogleAPI() {
	return authWithProvider(new firebase.auth.GoogleAuthProvider());
}

export {
	authWithFacebookAPI,
	authWithGoogleAPI
};
