import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  blacklist: ["dialog"],
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  connectRouter(history)(persistedReducer),
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger))
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default { store, persistor };
