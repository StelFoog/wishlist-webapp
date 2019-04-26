import { combineReducers } from "redux";
import { reducers as authReducers } from "./features/lib/authentication";
import { reducers as wishlistReducers } from "./features/lib/wishlists";

const appReducer = combineReducers({
  auth: authReducers.userReducer, 
  wishlist: wishlistReducers.wishlistReducer
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
