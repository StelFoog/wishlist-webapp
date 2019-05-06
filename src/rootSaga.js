import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./features/lib/authentication";
import { sagas as wishlistSagas } from "./features/lib/wishlists";
import { sagas as wishlistItemSagas } from "./features/lib/wishlistItems";

function* rootSaga() {
  yield all([
    authSagas.watchUserAuthFacebook(),
    wishlistSagas.watchCreateUserWishlist(),
<<<<<<< HEAD
<<<<<<< HEAD
    wishlistItemSagas.watchCreateWishlistItem(),
=======
>>>>>>> Added functionality to list and display wishlists
=======
>>>>>>> eb0e4c27cdd7d6224324a684602f9038955cf1b7
    wishlistSagas.watchFetchWishlists()
  ]);
}

export default rootSaga;
