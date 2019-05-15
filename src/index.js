import React from "react";
import ReactDOM from "react-dom";
/* CSS */
import "./index.css";
/* Typefaces */
import "typeface-ibm-plex-sans";
import "typeface-noto-sans-sc";
/* Routes and Store */
import Root from "./routes";
import store, { history } from "./store";

ReactDOM.render(
  <Root store={store.store} history={history} persistor={store.persistor} />,
  document.getElementById("root")
);
