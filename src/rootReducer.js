import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducers as authReducers } from "./features/lib/authentication";
import { reducers as dialogReducers } from "./features/components/dialog";
import { reducers as wishlistReducers } from "./features/lib/wishlists";
import { reducers as chatReducers } from "./features/lib/chat";
import { reducers as miscReducers } from "./features/lib/misc";
import { reducers as groupReducers } from "./features/lib/groups";
import { reducers as usersReducers } from "./features/lib/users";
import { reducers as groupWishlistReducers } from "./features/lib/groupItems";

const appReducer = combineReducers({
  auth: authReducers.userReducer,
  dialog: dialogReducers.dialogReducer,
  wishlist: wishlistReducers.wishlistReducer,
  form: formReducer,
  chat: chatReducers.chatReducer,
  misc: miscReducers.miscReducer,
  group: groupReducers.groupReducer,
  users: usersReducers.usersReducer,
  groupWishlist: groupWishlistReducers
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
