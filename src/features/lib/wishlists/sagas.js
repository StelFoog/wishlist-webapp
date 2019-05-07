import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import {
  createWishlistWithOwner,
  fetchAllWishlistsFromUser,
  fetchAllOwnedWishlistsFromUser
} from "./db";
import { getUser } from "../authentication/selectors";
import { addNewWishlistIdToUser } from "../authentication/db";
import wishlistTypes from "./types.js";
import { types as authTypes } from "../authentication";
import { types as dialogTypes } from "../../components/dialog";

const {
  CREATE_USER_WISHLIST,
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS,
  FETCH_OWNED_WISHLISTS,
  FETCH_OWNED_WISHLISTS_ERROR,
  FETCH_OWNED_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS,
  FETCH_WISHLISTS_ERROR,
  FETCH_WISHLISTS_SUCCESS
} = wishlistTypes;

const { ADD_WISHLIST_ID_TO_USER } = authTypes;

const { CLOSE_DIALOG } = dialogTypes;

function* watchCreateUserWishlist() {
  yield takeEvery(CREATE_USER_WISHLIST, workCreateUserWishlist);
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
      put({ type: ADD_WISHLIST_ID_TO_USER, wishlistId: result.uid })
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

function* watchFetchWishlists() {
  yield takeEvery(FETCH_WISHLISTS, workFetchWishlists);
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

function* watchFetchOwnedWishlists() {
  yield takeEvery(FETCH_OWNED_WISHLISTS, workFetchOwnedWishlists);
}

function* workFetchOwnedWishlists() {
  try {
    const user = yield select(getUser);
    const wishlists = yield call(fetchAllOwnedWishlistsFromUser, user);

    yield put({
      type: FETCH_OWNED_WISHLISTS_SUCCESS,
      wishlistData: wishlists
    });
  } catch (error) {
    yield put({ type: FETCH_OWNED_WISHLISTS_ERROR, error: error });
  }
}

export default {
  watchCreateUserWishlist,
  watchFetchWishlists,
  watchFetchOwnedWishlists
};
