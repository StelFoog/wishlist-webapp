import { database } from "../firebase/";
import { user } from "./user.js";

const logInAndCreateUserIfDoesNotExist = firebaseUser => {
  console.log(firebaseUser);
  let userData = user(firebaseUser.displayName, firebaseUser.uid);
  console.log(userData);
  let ref = database.collection("Users").doc("" + userData.uid);
  ref
    .get()
    .then(doc => {
      if (doc.exists) userData = { ...userData, ...doc.data() };
      // Always set the user in DB to the one just read in case any fields
      // in DB are missing
      ref.set(userData);
    })
    .catch(error => {
      throw error;
    });
  return userData;
};

export { logInAndCreateUserIfDoesNotExist };
