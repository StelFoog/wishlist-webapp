import { takeEvery, call, put } from "redux-saga/effects";
import { createWishlistWithOwner } from "./db.js";
import types from "./types.js";

const {
  CREATE_USER_WISHLIST,
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS
} = types;

function* watchCreateUserWishlist() {
  yield takeEvery(CREATE_USER_WISHLIST, workCreateUserWishlist);
}

function* workCreateUserWishlist() {
  try {
    let result = yield call(createWishlistWithOwner, "TODO"); // TODO: Get user with selector
    yield put({ type: CREATE_USER_WISHLIST_SUCCESS, userData: result });
  } catch (error) {
    yield put({ type: CREATE_USER_WISHLIST_ERROR, error: error });
  }
}

export default { watchCreateUserWishlist };
