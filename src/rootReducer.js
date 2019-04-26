import { combineReducers } from "redux";
import { reducers as dialogReducers } from "./features/components/dialog";

const appReducer = combineReducers({
  dialog: dialogReducers.dialogReducer
});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
