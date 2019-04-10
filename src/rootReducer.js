import { combineReducers } from "redux";
import { reducers as coffeeButtonReducers } from "./features/coffeeButton";

const appReducer = combineReducers({});

const rootReducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") return state;

  return appReducer(state, action);
};

export default rootReducer;
