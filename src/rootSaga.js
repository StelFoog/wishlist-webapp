import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./features/lib/authentication";
import { sagas as wishlistSagas } from "./features/lib/wishlists";
import { sagas as wishlistItemSagas } from "./features/lib/wishlistItems";
import { sagas as chatSagas } from "./features/lib/chat";
import { sagas as groupSagas } from "./features/lib/groups";

function* rootSaga() {
  yield all([
    authSagas.watchUserAuthFacebook(),
    wishlistSagas.watchCreateUserWishlist(),
    wishlistItemSagas.watchCreateWishlistItem(),
    wishlistSagas.watchFetchWishlists(),
    wishlistSagas.watchFetchOwnedWishlists(),
    wishlistSagas.watchEditWishlistProperties(),
    wishlistItemSagas.watchEditWishlistItem(),
    wishlistItemSagas.watchClaimWishlistItem(),
    chatSagas.watchCreateChat(),
    chatSagas.watchLoadChat(),
    chatSagas.watchSendChatMessage(),
    groupSagas.watchFetchAllUserGroups(),
    groupSagas.watchCreateGroup(),
    groupSagas.watchInviteUserToGroup(),
    groupSagas.watchRemoveUserFromGroup()
  ]);
}

export default rootSaga;
