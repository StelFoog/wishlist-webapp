import { takeEvery, put, select, call, all } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import { getUser } from "../authentication/selectors";
import wishlistItemDb from "./db.js";
import types from "./types.js";
import { types as dialogTypes } from "../../components/dialog"
import wishlistDb from "../wishlists/db";
import { getDialogValues } from "../../components/dialog/selectors";


const { fetchWishlistByUid } = wishlistDb;

const { addWishlistItem, editWishlistItem, validateNewItem } = wishlistItemDb;

const {
  CREATE_WISHLIST_ITEM,
  CREATE_WISHLIST_ITEM_SUCCESS,
  CREATE_WISHLIST_ITEM_ERROR,
  EDIT_WISHLIST_ITEM,
  EDIT_WISHLIST_ITEM_ERROR,
  EDIT_WISHLIST_ITEM_SUCCESS
} = types;

const {
  CLOSE_DIALOG
} = dialogTypes;

function* watchCreateWishlistItem() {
  yield takeEvery(CREATE_WISHLIST_ITEM, workCreateWishlistItem);
}

function* watchEditWishlistItem() {
  yield takeEvery(EDIT_WISHLIST_ITEM, workEditWishlistItem);
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

function* workEditWishlistItem() {
  try {
    const itemForm = yield select(getFormValues("editItem"));
    const metaData = yield select(getDialogValues);
    const { index, wishlistUid } = metaData;
    const item = itemForm;
    // const item = yield call(validateNewItem, itemForm);
    yield call(editWishlistItem, wishlistUid, index, item);
    yield put({ type: EDIT_WISHLIST_ITEM_SUCCESS, wishlistUid, index, itemData: itemForm });
    yield all([
      put(reset("editItem")),
      put({ type: CLOSE_DIALOG })
    ])
  }
  catch (error) {
    yield put({ type: EDIT_WISHLIST_ITEM_ERROR, error })
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
  watchFetchAllItems,
  watchEditWishlistItem
};
