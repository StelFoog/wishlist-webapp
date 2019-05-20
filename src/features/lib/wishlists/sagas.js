import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import { replace, push } from "connected-react-router";
import db from "./db";
import { getUser } from "../authentication/selectors";
import { addNewWishlistIdToUser } from "../authentication/db";
import wishlistTypes from "./types.js";
import { types as authTypes } from "../authentication";
import { types as dialogTypes } from "../../components/dialog";
import { types as chatTypes } from "../chat";
import { getPathname } from "../router/selectors";

const {
  createWishlistWithOwner,
  fetchAllWishlistsFromUser,
  fetchAllOwnedWishlistsFromUser,
  editWishlistProperties,
  deleteWishlistFromDB,
  deleteWishlistFromUser
} = db;

const {
  CREATE_USER_WISHLIST,
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS,
  FETCH_OWNED_WISHLISTS,
  FETCH_OWNED_WISHLISTS_ERROR,
  FETCH_OWNED_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS,
  FETCH_WISHLISTS_ERROR,
  FETCH_WISHLISTS_SUCCESS,
  EDIT_WISHLIST_PROPERTIES,
  EDIT_WISHLIST_PROPERTIES_ERROR,
  EDIT_WISHLIST_PROPERTIES_SUCCESS,
  DELETE_WISHLIST,
  DELETE_WISHLIST_ERROR,
  DELETE_WISHLIST_SUCCESS
} = wishlistTypes;

const { CREATE_CHAT, DELETE_CHAT } = chatTypes;

const { ADD_WISHLIST_ID_TO_USER, REMOVE_WISHLIST_ID_FROM_USER } = authTypes;

const { CLOSE_DIALOG } = dialogTypes;

function* watchCreateUserWishlist() {
  yield takeEvery(CREATE_USER_WISHLIST, workCreateUserWishlist);
}

function* watchFetchWishlists() {
  yield takeEvery(FETCH_WISHLISTS, workFetchWishlists);
}

function* watchFetchOwnedWishlists() {
  yield takeEvery(FETCH_OWNED_WISHLISTS, workFetchOwnedWishlists);
}

function* watchEditWishlistProperties() {
  yield takeEvery(EDIT_WISHLIST_PROPERTIES, workEditWishlistProperties);
}

function* watchDeleteWishlist() {
  yield takeEvery(DELETE_WISHLIST, workDeleteWishlist);
}

function* workCreateUserWishlist() {
  try {
    const wishlistForm = yield select(getFormValues("WishlistCreateForm"));
    const userValues = yield select(getUser);
    let result = yield call(
      createWishlistWithOwner,
      userValues,
      wishlistForm.title
    );

    yield all([
      call(addNewWishlistIdToUser, userValues.uid, result.uid),
      put({ type: ADD_WISHLIST_ID_TO_USER, wishlistUid: result.uid }),
      put({ type: CREATE_CHAT, id: result.uid })
    ]);
    // TODO: add the wishlist to the user obejct
    yield all([
      put({ type: CREATE_USER_WISHLIST_SUCCESS, wishlistData: result }),
      put(reset("WishlistCreateForm"))
    ]);
    yield put({ type: CLOSE_DIALOG });
  } catch (error) {
    yield put({ type: CREATE_USER_WISHLIST_ERROR, error: error });
  }
}

function* workFetchWishlists() {
  try {
    const user = yield select(getUser);
    let wishlists = yield call(fetchAllWishlistsFromUser, user);

    // Remove reference to deleted wishlist in db and user state
    for (let i = 0; i < wishlists.length; i++) {
      let wishlist = wishlists[i];
      if (typeof wishlist === "string") {
        console.log("deleting...");
        yield call(deleteWishlistFromUser, wishlist, user);
        yield put({
          type: REMOVE_WISHLIST_ID_FROM_USER,
          wishlistUid: wishlist
        });
      }
    }

    // Don't send invalid wishlists to state
    wishlists = wishlists.filter(function(wishlist) {
      return typeof wishlist !== "string" && wishlist !== undefined;
    });

    yield put({
      type: FETCH_WISHLISTS_SUCCESS,
      wishlistData: wishlists
    });
  } catch (error) {
    yield put({ type: FETCH_WISHLISTS_ERROR, error: error });
  }
}

function* workFetchOwnedWishlists() {
  try {
    const user = yield select(getUser);
    let wishlists = yield call(fetchAllOwnedWishlistsFromUser, user);

    // Remove reference to deleted wishlist in db and user state
    for (let i = 0; i < wishlists.length; i++) {
      let wishlist = wishlists[i];
      if (typeof wishlist === "string") {
        console.log("deleting...");
        yield call(deleteWishlistFromUser, wishlist, user);
        yield put({
          type: REMOVE_WISHLIST_ID_FROM_USER,
          wishlistUid: wishlist
        });
      }
    }

    // Don't send invalid wishlists to state
    wishlists = wishlists.filter(function(wishlist) {
      return typeof wishlist !== "string" && wishlist !== undefined;
    });

    yield put({
      type: FETCH_OWNED_WISHLISTS_SUCCESS,
      wishlistData: wishlists
    });
  } catch (error) {
    yield put({ type: FETCH_OWNED_WISHLISTS_ERROR, error: error });
  }
}

function* workEditWishlistProperties({ uid, field, data }) {
  try {
    const result = yield call(editWishlistProperties, uid, field, data);

    yield put({
      type: EDIT_WISHLIST_PROPERTIES_SUCCESS,
      wishlistData: result,
      wishlistUid: uid
    });
  } catch (error) {
    yield put({ type: EDIT_WISHLIST_PROPERTIES_ERROR, error: error });
  }
}

function* workDeleteWishlist({ uid, user }) {
  try {
    yield put(push("/dashboard"));
    yield all([
      call(deleteWishlistFromDB, uid),
      call(deleteWishlistFromUser, uid, user),
      put({ type: REMOVE_WISHLIST_ID_FROM_USER, wishlistUid: uid }),
      put({ type: DELETE_CHAT, uid })
    ]);

    yield put({ type: DELETE_WISHLIST_SUCCESS, wishlistUid: uid });
  } catch (error) {
    yield put({ type: DELETE_WISHLIST_ERROR, error: error });
  }
}

export default {
  watchCreateUserWishlist,
  watchFetchWishlists,
  watchFetchOwnedWishlists,
  watchEditWishlistProperties,
  watchDeleteWishlist
};
