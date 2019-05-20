import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./features/lib/authentication";
import { sagas as wishlistSagas } from "./features/lib/wishlists";
import { sagas as wishlistItemSagas } from "./features/lib/wishlistItems";
import { sagas as chatSagas } from "./features/lib/chat";
import { sagas as groupSagas } from "./features/lib/groups";
import { sagas as usersSagas } from "./features/lib/users";
import { sagas as groupItemSagas } from "./features/lib/groupItems";

function* rootSaga() {
  yield all([
    authSagas.watchUserAuthFacebook(),
    authSagas.watchAddUserToWishlist(),
    authSagas.watchRemoveUserFromWishlist(),
    authSagas.watchSearchForUsersWithName(),
    authSagas.watchLogout(),
    wishlistSagas.watchCreateUserWishlist(),
    wishlistItemSagas.watchCreateWishlistItem(),
    wishlistSagas.watchFetchWishlists(),
    wishlistSagas.watchFetchOwnedWishlists(),
    wishlistSagas.watchDeleteWishlist(),
    wishlistSagas.watchEditWishlistProperties(),
    wishlistItemSagas.watchEditWishlistItem(),
    wishlistItemSagas.watchClaimWishlistItem(),
    wishlistItemSagas.watchUnclaimWishlistItem(),
    chatSagas.watchCreateChat(),
    chatSagas.watchLoadChat(),
    chatSagas.watchSendChatMessage(),
    chatSagas.watchDeleteChat(),
    groupSagas.watchFetchAllUserGroups(),
    groupSagas.watchCreateGroup(),
    groupSagas.watchInviteUserToGroup(),
    groupSagas.watchRemoveUserFromGroup(),
    groupSagas.watchEditGroupProperites(),
    groupSagas.watchLeaveGroup(),
    groupSagas.watchDeleteGroup(),
    groupItemSagas.watchCreateGroupItem(),
    groupItemSagas.watchFetchGroupItems(),
    groupItemSagas.watchEditGroupItem(),
    groupItemSagas.watchClaimGroupItem(),
    usersSagas.watchGetUsersWithUids(),
    usersSagas.watchCacheUser()
  ]);
}

export default rootSaga;
