import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import { replace } from "connected-react-router";
import db from "./db";
import { getUser } from "../authentication/selectors";
import { addNewWishlistIdToUser } from "../authentication/db";
import wishlistTypes from "./types.js";
import chatTypes from "../chat/types";
import { types as authTypes } from "../authentication";
import { types as dialogTypes } from "../../components/dialog";
import { getPathname } from "../router/selectors";

const {
  createWishlistWithOwner,
  fetchAllWishlistsFromUser,
  fetchAllOwnedWishlistsFromUser,
  editWishlistProperties
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
  EDIT_WISHLIST_PROPERTIES_SUCCESS
} = wishlistTypes;

const { CREATE_CHAT } = chatTypes;

const { ADD_WISHLIST_ID_TO_USER } = authTypes;

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
    const pathname = yield select(getPathname);
    yield put(replace("/temp"));
    yield put(replace(pathname));
  } catch (error) {
    yield put({ type: CREATE_USER_WISHLIST_ERROR, error: error });
  }
}

function* workFetchWishlists() {
  try {
    const user = yield select(getUser);
    const wishlists = yield call(fetchAllWishlistsFromUser, user);
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
    const wishlists = yield call(fetchAllOwnedWishlistsFromUser, user);
    console.log(wishlists);
    yield put({
      type: FETCH_OWNED_WISHLISTS_SUCCESS,
      wishlistData: wishlists
    });
  } catch (error) {
    yield put({ type: FETCH_OWNED_WISHLISTS_ERROR, error: error });
  }
}

function* workEditWishlistProperties() {
  try {
    const wishlistForm = yield select(getFormValues("WishlistEditForm")); // TODO: Create this form!
    const uid = ""; // TODO: Get edited wishlist's UID somehow. Send with form maybe?
    let result = yield call(editWishlistProperties, uid, wishlistForm);

    yield all([
      put({ type: EDIT_WISHLIST_PROPERTIES_SUCCESS }),
      put(reset("WishlistEditForm"))
    ]);
    yield put({ type: CLOSE_DIALOG });
    const pathname = yield select(getPathname);
    yield put(replace("/temp"));
    yield put(replace(pathname));
  } catch (error) {
    yield put({ type: EDIT_WISHLIST_PROPERTIES_ERROR, error: error });
  }
}

export default {
  watchCreateUserWishlist,
  watchFetchWishlists,
  watchFetchOwnedWishlists,
  watchEditWishlistProperties
};
