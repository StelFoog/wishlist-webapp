import { takeEvery, put, select, call } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import types from "./types.js";
import { addWishlistItem } from "./db";

const {
  CREATE_WISHLIST_ITEM,
  CREATE_WISHLIST_ITEM_SUCCESS,
  CREATE_WISHLIST_ITEM_ERROR
} = types;

function* watchCreateWishlistItem() {
  yield takeEvery(CREATE_WISHLIST_ITEM, workCreateWishlistItem);
}

function* workCreateWishlistItem(wishlistUid) {
  try {
    const itemForm = yield select(getFormValues("itemAdd"));
    yield call(addWishlistItem);
    yield put(reset("itemAdd"));
  } catch (error) {
    yield put({ type: CREATE_WISHLIST_ITEM_ERROR, error });
  }
}

export default {
  watchCreateWishlistItem
};
