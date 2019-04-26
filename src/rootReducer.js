import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducers as authReducers } from "./features/lib/authentication";
import { reducers as dialogReducers } from "./features/components/dialog";

const appReducer = combineReducers({
  auth: authReducers.userReducer,
  dialog: dialogReducers.dialogReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
