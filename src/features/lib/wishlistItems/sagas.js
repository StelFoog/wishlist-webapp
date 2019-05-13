import { takeEvery, put, select, call, all } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import { replace } from "connected-react-router";
import { getUser } from "../authentication/selectors";
import wishlistItemDb from "./db.js";
import types from "./types.js";
import { types as dialogTypes } from "../../components/dialog";
import wishlistDb from "../wishlists/db";
import { getDialogValues } from "../../components/dialog/selectors";
import { getPathname } from "../router/selectors";

const { fetchWishlistByUid } = wishlistDb;

const {
  addWishlistItem,
  editWishlistItem,
  makeItem,
  claimWishlistItem
} = wishlistItemDb;

const {
  CREATE_WISHLIST_ITEM,
  CREATE_WISHLIST_ITEM_SUCCESS,
  CREATE_WISHLIST_ITEM_ERROR,
  EDIT_WISHLIST_ITEM,
  EDIT_WISHLIST_ITEM_ERROR,
  EDIT_WISHLIST_ITEM_SUCCESS,
  FETCH_ALL_ITEMS,
  FETCH_ALL_ITEMS_SUCCESS,
  FETCH_ALL_ITEMS_ERROR,
  CLAIM_WISHLIST_ITEM,
  CLAIM_WISHLIST_ITEM_SUCCESS,
  CLAIM_WISHLIST_ITEM_ERROR
} = types;

const { CLOSE_DIALOG } = dialogTypes;

function* watchCreateWishlistItem() {
  yield takeEvery(CREATE_WISHLIST_ITEM, workCreateWishlistItem);
}

function* watchEditWishlistItem() {
  yield takeEvery(EDIT_WISHLIST_ITEM, workEditWishlistItem);
}

function* watchFetchAllItems() {
  yield takeEvery(FETCH_ALL_ITEMS, workFetchAllItems);
}

function* watchClaimWishlistItem() {
  yield takeEvery(CLAIM_WISHLIST_ITEM, workClaimWishlistItem);
}

function* workCreateWishlistItem() {
  try {
    const itemForm = yield select(getFormValues("createItem"));
    const metaData = yield select(getDialogValues);
    const { wishlistUid } = metaData;
    const itemData = yield call(makeItem, itemForm);
    yield call(addWishlistItem, wishlistUid, itemData);
    yield put({ type: CREATE_WISHLIST_ITEM_SUCCESS, itemData, wishlistUid });
    yield all([put({ type: CLOSE_DIALOG }), put(reset("createItem"))]);
    const pathname = yield select(getPathname);
    yield put(replace("/temp"));
    yield put(replace(pathname));
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
    yield put({
      type: EDIT_WISHLIST_ITEM_SUCCESS,
      wishlistUid,
      index,
      itemData: itemForm
    });
    yield all([put(reset("editItem")), put({ type: CLOSE_DIALOG })]);
    const pathname = yield select(getPathname);
    yield put(replace("/temp"));
    yield put(replace(pathname));
  } catch (error) {
    yield put({ type: EDIT_WISHLIST_ITEM_ERROR, error });
  }
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

function* workClaimWishlistItem(action) {
  try {
    const { index, wishlistId } = action;
    const user = yield select(getUser);

    yield call(claimWishlistItem, user.uid, index, wishlistId);

    yield put({ type: CLAIM_WISHLIST_ITEM_SUCCESS });
  } catch (error) {
    yield put({ type: CLAIM_WISHLIST_ITEM_ERROR, error });
  }
}

export default {
  watchCreateWishlistItem,
  watchFetchAllItems,
  watchEditWishlistItem,
  watchClaimWishlistItem
};
