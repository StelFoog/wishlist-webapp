import { getFormValues, reset } from "redux-form";
import types from "./types.js";
import { addWishlistItem, fetchWishlistByUid } from "./db";
import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getUser } from "../authentication/selectors";

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
    yield call(addWishlistItem, wishlistUid, itemForm);
    yield put(reset("itemAdd"));
  } catch (error) {
    yield put({ type: CREATE_WISHLIST_ITEM_ERROR, error });
  }
}

const {
  FETCH_ALL_ITEMS,
  FETCH_ALL_ITEMS_SUCCESS,
  FETCH_ALL_ITEMS_ERROR
} = types;

function* watchFetchAllItems() {
  yield takeEvery(FETCH_ALL_ITEMS, workFetchAllItems);
}

function* workFetchAllItems() {
  try {
    const user = yield select(getUser);
    const items = yield call(fetchWishlistByUid, user.uid);
    yield put({
      type: FETCH_ALL_ITEMS_SUCCESS,
      itemData: items
    });
  } catch (error) {
    yield put({
      type: FETCH_ALL_ITEMS_ERROR,
      error: error
    });
  }
}

export default {
  watchCreateWishlistItem,
  watchFetchAllItems
};
