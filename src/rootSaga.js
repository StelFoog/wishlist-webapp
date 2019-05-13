import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./features/lib/authentication";
import { sagas as wishlistSagas } from "./features/lib/wishlists";
import { sagas as wishlistItemSagas } from "./features/lib/wishlistItems";
import { sagas as chatSagas } from "./features/lib/chat";
import { sagas as groupSagas } from "./features/lib/groups";
import { sagas as usersSagas } from "./features/lib/users";

function* rootSaga() {
  yield all([
    authSagas.watchUserAuthFacebook(),
    authSagas.watchAddUserToWishlist(),
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
    groupSagas.watchRemoveUserFromGroup(),
    usersSagas.watchGetUserWithUid()
  ]);
}

export default rootSaga;
