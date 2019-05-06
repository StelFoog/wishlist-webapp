import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getFormValues, reset } from "redux-form";
import db from "./db";
import { getUser } from "../authentication/selectors";
import { addNewWishlistIdToUser } from "../authentication/db";
import wishlistTypes from "./types.js";
import { types as authTypes } from "../authentication";
import { types as dialogTypes } from "../../components/dialog";

const { createWishlistWithOwner } = db;

const {
  CREATE_USER_WISHLIST,
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS
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

export default { watchCreateUserWishlist };
