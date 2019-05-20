import { takeEvery, takeLatest, call, put, select, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import { authWithFacebookAPI, logout /* authWithGoogleAPI */ } from "./auth.js";
import {
  addInvitedWishlistToUser,
  addInvitedUserToWishlist,
  searchForUsersWithName
} from "./db";
import authTypes from "./types.js";
import { types as dialogTypes } from "../../components/dialog";
import { getUser } from "./selectors";
import actions from "./actions.js";
import { getPathname, getSearch } from "../router/selectors";

import wishlistDB from "../wishlists/db.js";
import { firebase } from "../firebase";

const { addUserToWishlist } = actions;

const { editWishlistProperties, deleteWishlistFromUser } = wishlistDB;

const {
  AUTH_LOGOUT,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  ADD_USER_TO_WISHLIST,
  ADD_USER_TO_WISHLIST_ERROR,
  ADD_USER_TO_WISHLIST_SUCCESS,
  SEARCH_FOR_USERS_WITH_NAME,
  SEARCH_FOR_USERS_WITH_NAME_ERROR,
  SEARCH_FOR_USERS_WITH_NAME_SUCCESS,
  HANDLE_NOT_LOGGED_IN,
  REMOVE_USER_FROM_WISHLIST,
  REMOVE_USER_FROM_WISHLIST_ERROR,
  REMOVE_USER_FROM_WISHLIST_SUCCESS
} = authTypes;

const { CLOSE_DIALOG } = dialogTypes;

function* watchUserAuthFacebook() {
  yield takeEvery(AUTH_USER_FACEBOOK, workUserAuthFacebook);
}

function* watchUserAuthGoogle() {
  yield takeEvery(AUTH_USER_GOOGLE, workUserAuthGoogle);
}

function* watchAddUserToWishlist() {
  yield takeEvery(ADD_USER_TO_WISHLIST, workAddUserToWishlist);
}

function* watchRemoveUserFromWishlist() {
  yield takeEvery(REMOVE_USER_FROM_WISHLIST, workRemoveUserFromWishlist);
}

function* watchSearchForUsersWithName() {
  yield takeLatest(SEARCH_FOR_USERS_WITH_NAME, workSearchForUsersWithName);
}

function* watchLogout() {
  yield takeEvery(AUTH_LOGOUT, workLogout);
}

function* workSearchForUsersWithName(action) {
  try {
    const { name } = action;
    const searchResults = yield call(searchForUsersWithName, name);

    yield put({
      type: SEARCH_FOR_USERS_WITH_NAME_SUCCESS,
      searchResults: searchResults
    });
  } catch (error) {
    yield put({ type: SEARCH_FOR_USERS_WITH_NAME_ERROR, error: error });
  }
}

function* workAddUserToWishlist(action) {
  try {
    const { type, userUid, wishlistUid } = action;
    const addedUser = userUid || (yield select(getUser)).uid;
    
    yield all([
      call(addInvitedWishlistToUser, { wishlistId: wishlistUid, uid: userUid }),
      call(addInvitedUserToWishlist, { wishlistId: wishlistUid, uid: userUid })
    ]);

    yield put({ 
      type: ADD_USER_TO_WISHLIST_SUCCESS, 
      wishlistUid: wishlistUid, 
      userUid: userUid 
    });
  } catch (error) {
    yield put({ type: ADD_USER_TO_WISHLIST_ERROR, error: error });
  }
}

function* workRemoveUserFromWishlist(action) {
  try {
    const { type, userUid, wishlistUid } = action;
    
    yield all([
      call(deleteWishlistFromUser, wishlistUid, userUid),
      call(editWishlistProperties, wishlistUid, "members",
        firebase.firestore.FieldValue.arrayRemove(userUid)
      )
    ]);

    yield put({ 
      type: REMOVE_USER_FROM_WISHLIST_SUCCESS,
      wishlistUid: wishlistUid,
      userUid: userUid
    });
  } catch (error) {
    yield put({ type: REMOVE_USER_FROM_WISHLIST_ERROR, error: error });
  }
}

function* workUserAuthFacebook() {
  try {
    let result = yield call(authWithFacebookAPI);
    yield put({ type: AUTH_USER_SUCCESS, userData: result });
    const pathname = yield select(getPathname);

    if (pathname === "/") {
      yield put(push("/dashboard"));
    } else if (pathname.startsWith("/nologin")) {
      const pathBack = (yield select(getSearch)).substr(1);
      yield all([put({ type: CLOSE_DIALOG }), put(push(pathBack))]);
    } else if (pathname.startsWith("/invite")) {
      const pathBack = (yield select(getSearch)).substr(1);
      // yield put({ type: CLOSE_DIALOG });
      // yield put(push(pathBack));
      yield all([put({ type: CLOSE_DIALOG }), put(push(pathBack))]);
    }
  } catch (error) {
    yield put({ type: AUTH_USER_ERROR, error: error });
  }
}

function* workUserAuthGoogle() {}

function* workLogout() {
  try {
    yield call(logout);
    yield put({ type: AUTH_LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: AUTH_LOGOUT_ERROR, error: error });
  }
}

export default {
  watchUserAuthFacebook,
  watchUserAuthGoogle,
  watchAddUserToWishlist,
  watchRemoveUserFromWishlist,
  watchSearchForUsersWithName,
  watchLogout
};
