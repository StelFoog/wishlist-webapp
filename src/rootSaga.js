import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./features/lib/authentication/";
import { sagas as wishlistSagas } from "./features/lib/wishlists/";

function* rootSaga() {
  yield all([
    authSagas.watchUserAuthFacebook(),
    wishlistSagas.watchCreateUserWishlist(),
    wishlistSagas.watchFetchWishlists()
  ]);
}

export default rootSaga;
