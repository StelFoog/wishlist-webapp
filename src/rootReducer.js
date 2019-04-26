import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducers as authReducers } from "./features/lib/authentication";
import { reducers as dialogReducers } from "./features/components/dialog";
import { reducers as wishlistReducers } from "./features/lib/wishlists";

const appReducer = combineReducers({
  auth: authReducers.userReducer,
  dialog: dialogReducers.dialogReducer,
  wishlist: wishlistReducers.wishlistReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
