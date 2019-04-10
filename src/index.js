import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./routes";
import store, { history } from "./store";

ReactDOM.render(
  <Root store={store.store} history={history} persistor={store.persistor} />,
  document.getElementById("root")
);
