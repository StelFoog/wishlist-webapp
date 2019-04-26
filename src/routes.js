import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "./features/pages/homePage";
import Dialog from "./features/components/dialog/DialogContainer";

const Root = ({ store, history, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router>
          <Dialog />
          <Switch>
            <Route
              path={"/"}
              exact
              render={props => {
                return <HomePage {...props} />;
              }}
            />
          </Switch>
        </Router>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
