import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import { getFormValues, reset } from "redux-form";
import { createWishlistWithOwner, fetchAllWishlistsFromUser } from "./db.js";
import { getUser } from "../authentication/selectors";
import types from "./types.js";

const {
  CREATE_USER_WISHLIST,
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS,
  FETCH_WISHLISTS,
  FETCH_WISHLISTS_ERROR,
  FETCH_WISHLISTS_SUCCESS
} = types;

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
    console.log(result);
    // TODO: add the wishlist to the user obejct
    yield all([
      put({ type: CREATE_USER_WISHLIST_SUCCESS, wishlistData: result }),
      put(reset("WishlistCreateForm"))
    ]);
    yield put(push("/dashboard"));
  } catch (error) {
    yield put({ type: CREATE_USER_WISHLIST_ERROR, error: error });
  }
}

function* watchFetchWishlists() {
  yield takeEvery(FETCH_WISHLISTS, workFetchWishlists);
}

function* workFetchWishlists() {
  try {
    const user = yield call(getUser);
    const wishlists = yield call(fetchAllWishlistsFromUser(user.uid));
    yield put({
      type: FETCH_WISHLISTS_SUCCESS,
      wishlistData: wishlists
    });

  }
  catch (error) {
    yield put({ type: FETCH_WISHLISTS_ERROR, error: error });
  }
}

export default { watchCreateUserWishlist, watchFetchWishlists };
