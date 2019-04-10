import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  connectRouter(history)(persistedReducer),
  compose(applyMiddleware(routerMiddleware(history), logger))
);

const persistor = persistStore(store);

export default { store, persistor };
