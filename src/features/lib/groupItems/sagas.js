import { takeEvery, put, select, all, call } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import { getDialogValues } from "../../components/dialog/selectors";
import types from "./types";
import {
  addGroupWishlistItem,
  fetchGroupWishlistItems,
  editGroupWishlistItem,
  claimGroupItem
} from "./db";
import wishlistItemDb from "../wishlistItems/db";
import { types as dialogTypes } from "../../components/dialog";
import { getUser } from "../authentication/selectors";

const { makeItem } = wishlistItemDb;

const {
  CREATE_GROUP_WISHLIST_ITEM,
  CREATE_GROUP_WISHLIST_ITEM_ERROR,
  CREATE_GROUP_WISHLIST_ITEM_SUCCESS,

  FETCH_ALL_GROUP_ITEMS,
  FETCH_ALL_GROUP_ITEMS_SUCCESS,
  FETCH_ALL_GROUP_ITEMS_ERROR,

  EDIT_GROUP_WISHLIST_ITEM,
  EDIT_GROUP_WISHLIST_ITEM_SUCCESS,
  EDIT_GROUP_WISHLIST_ITEM_ERROR,

  CLAIM_GROUP_WISHLIST_ITEM,
  CLAIM_GROUP_WISHLIST_ITEM_ERROR,
  CLAIM_GROUP_WISHLIST_ITEM_SUCCESS
} = types;
const { CLOSE_DIALOG } = dialogTypes;

function* watchCreateGroupItem() {
  yield takeEvery(CREATE_GROUP_WISHLIST_ITEM, workCreateGroupItem);
}

function* watchEditGroupItem() {
  yield takeEvery(EDIT_GROUP_WISHLIST_ITEM, workEditGroupItem);
}

function* watchFetchGroupItems() {
  yield takeEvery(FETCH_ALL_GROUP_ITEMS, workFetchGroupItems);
}

function* watchClaimGroupItem() {
  yield takeEvery(CLAIM_GROUP_WISHLIST_ITEM, workClaimGroupItem);
}

function* workCreateGroupItem() {
  try {
    const itemForm = yield select(getFormValues("createGroupItem"));
    const { groupID, userID } = yield select(getDialogValues);

    const itemData = yield call(makeItem, itemForm);
    yield call(addGroupWishlistItem, { groupID, userID, itemData });

    yield all([
      put({
        type: CREATE_GROUP_WISHLIST_ITEM_SUCCESS,
        itemData
      }),
      put({ type: CLOSE_DIALOG }),
      put(reset("createGroupItem"))
    ]);
  } catch (error) {
    yield put({ type: CREATE_GROUP_WISHLIST_ITEM_ERROR, error });
  }
}

function* workEditGroupItem() {
  try {
    const itemForm = yield select(getFormValues("editGroupItem"));
    const { groupID, userID, index } = yield select(getDialogValues);

    const itemData = yield call(makeItem, itemForm);
    yield call(editGroupWishlistItem, { groupID, userID, itemData, index });

    yield all([
      put({
        type: EDIT_GROUP_WISHLIST_ITEM_SUCCESS,
        itemData,
        index
      }),
      put({ type: CLOSE_DIALOG }),
      put(reset("EditGroupItem"))
    ]);
  } catch (error) {
    yield put({ type: EDIT_GROUP_WISHLIST_ITEM_ERROR, error });
  }
}

function* workFetchGroupItems({ userID, groupID }) {
  try {
    const items = yield call(fetchGroupWishlistItems, { groupID, userID });
    yield put({ type: FETCH_ALL_GROUP_ITEMS_SUCCESS, itemData: items });
  } catch (error) {
    yield put({ type: FETCH_ALL_GROUP_ITEMS_ERROR, error });
  }
}

function* workClaimGroupItem({ index, groupID, userID }) {
  try {
    const user = yield select(getUser);
    yield call(claimGroupItem, {
      claimerID: user.uid,
      index,
      groupID,
      ownerID: userID
    });

    yield put({
      type: CLAIM_GROUP_WISHLIST_ITEM_SUCCESS,

      userID: user.uid,
      index
    });
  } catch (error) {
    yield put({ type: CLAIM_GROUP_WISHLIST_ITEM_ERROR, error });
  }
}

export default {
  watchCreateGroupItem,
  watchFetchGroupItems,
  watchEditGroupItem,
  watchClaimGroupItem
};
