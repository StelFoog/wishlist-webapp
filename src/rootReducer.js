import { combineReducers } from "redux";

const appReducer = combineReducers({});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
