import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getUser } from "../authentication/selectors";
import { fetchWishlistByUid } from "./db.js";
import types from "./types.js";

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
    })
  }
  catch (error) {
    yield put({
      type: FETCH_ALL_ITEMS_ERROR,
      error: error
    })
  }
}

export default { watchFetchAllItems };