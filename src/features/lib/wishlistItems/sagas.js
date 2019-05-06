import { takeEvery, put, select, call } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import { getUser } from "../authentication/selectors";
import { fetchWishlistByUid } from "./db.js";
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
<<<<<<< HEAD
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
=======
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
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7
