import { combineReducers } from "redux";
import { reducers as authReducers } from "./features/lib/authentication";

const appReducer = combineReducers({
  auth: authReducers.userReducer
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
