import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import { authWithFacebookAPI /* authWithGoogleAPI */ } from "./auth.js";
import { addInvitedWishlistToUser, addInvitedUserToWishlist,
 searchForUsersWithName } from "./db";
import types from "./types.js";
import { getUser } from "./selectors";
import actions from "./actions.js";

const { addUserToWishlist } = actions;

const {
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  ADD_USER_TO_WISHLIST,
  ADD_USER_TO_WISHLIST_ERROR,
  ADD_USER_TO_WISHLIST_SUCCESS,
  SEARCH_FOR_USERS_WITH_NAME
} = types;

function* watchUserAuthFacebook() {
  yield takeEvery(AUTH_USER_FACEBOOK, workUserAuthFacebook);
}

function* watchUserAuthGoogle() {
  yield takeEvery(AUTH_USER_GOOGLE, workUserAuthGoogle);
}

function* watchAddUserToWishlist() {
  yield takeEvery(ADD_USER_TO_WISHLIST, workAddUserToWishlist);
}

function* watchSearchForUsersWithName() {
  yield takeEvery(SEARCH_FOR_USERS_WITH_NAME, workSearchForUsersWithName);
}

function* workSearchForUsersWithName(action) {
  const { type, name, list } = action;
  const users = yield call(searchForUsersWithName, name);
  for(let i = 0; i < users.length; ++i) {
    list.push(users[i]);
  }
}

function* workAddUserToWishlist(action) {
  try {
    const { wishlistUid } = action;
    const user = yield select(getUser);
    const userUid = user.uid;

    yield all([
      call(addInvitedWishlistToUser, wishlistUid, userUid),
      call(addInvitedUserToWishlist, wishlistUid, userUid)
    ]);

    yield put({ type: ADD_USER_TO_WISHLIST_SUCCESS, wishlistUid: wishlistUid });
  } catch (error) {
    yield put({ type: ADD_USER_TO_WISHLIST_ERROR, error: error });
  }
}

function* workUserAuthFacebook() {
  try {
    let result = yield call(authWithFacebookAPI);
    yield put({ type: AUTH_USER_SUCCESS, userData: result });

    // This code is used to detect and handle login/redirection for a user that has arrived through an invite link
    const checkIfInvite = window.location.pathname.match(
      /(wishlist\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\/invite)/g
    );

    if (checkIfInvite !== null) {
      const wishlistUid = checkIfInvite.toString().split("/")[1]; // Get wishlist Uid from URL (please shoot me)

      // Login via invite link
      yield call(addUserToWishlist, wishlistUid);
      yield put(push("/dashboard/guest/" + wishlistUid));
    } else {
      // Login via regular front page
      yield put(push("/dashboard"));
    }
  } catch (error) {
    yield put({ type: AUTH_USER_ERROR, error: error });
  }
}

function* workUserAuthGoogle() {}

export default {
  watchUserAuthFacebook,
  watchUserAuthGoogle,
  watchAddUserToWishlist,
  watchSearchForUsersWithName
};
