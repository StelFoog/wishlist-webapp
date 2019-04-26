import { combineReducers } from "redux";
import { reducers as authReducers } from "./features/lib/authentication";
import { reducers as dialogReducers } from "./features/components/dialog";

const appReducer = combineReducers({
  auth: authReducers.userReducer,
  dialog: dialogReducers.dialogReducer
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
