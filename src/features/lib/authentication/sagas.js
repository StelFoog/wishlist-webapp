import { takeEvery, call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { authWithFacebookAPI, authWithGoogleAPI } from "./auth.js";
import { addInvitedUserToWishlist, addInvitedWishlistToUser } from "./db";
import types from "./types.js";

const {
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  ADD_INVITED_USER_TO_WISHLIST
} = types;

function* watchUserAuthFacebook() {
  yield takeEvery(AUTH_USER_FACEBOOK, workUserAuthFacebook);
}
function* watchUserAuthGoogle() {
  yield takeEvery(AUTH_USER_GOOGLE, workUserAuthGoogle);
}

function* workInvitedUser({ checkIfInvite, result }) {
  const wishlistURL = checkIfInvite[0].split("/invite")[0];

  const wishlistID = wishlistURL.split("wishlist/")[1];
  const { uid } = result;

  yield call(addInvitedWishlistToUser, { wishlistID, uid });
  yield call(addInvitedUserToWishlist, { wishlistID, uid });

  yield put(push("/dashboard/guest/" + wishlistID));
}

function* workUserAuthFacebook() {
  try {
    let result = yield call(authWithFacebookAPI);
    yield put({ type: AUTH_USER_SUCCESS, userData: result });

    const checkIfInvite = window.location.pathname.match(
      /(wishlist\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\/invite)/g
    );

    if (checkIfInvite) {
      yield call(workInvitedUser, { checkIfInvite, result });
    } else {
      yield put(push("/dashboard"));
    }
  } catch (error) {
    yield put({ type: AUTH_USER_ERROR, error: error });
  }
}

function* workUserAuthGoogle() {
  /*
  let result = undefined;

  try {
    alert("Saga preparing to access database");
    result = yield call( () => ( authWithGoogleAPI() ));
    alert("Saga extracted " + result.uid + " from database");

    yield put({type: AUTH_USER_SUCCESS, value: result});
  } catch(error) {
    result = error;
    yield put({type: AUTH_USER_ERROR, value: result});
  }
  */
}

export default { watchUserAuthFacebook, watchUserAuthGoogle };
