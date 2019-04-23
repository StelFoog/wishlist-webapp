import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App"; // should be destroyed

const Root = ({ store, history, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path={"/"}
            exact
            render={props => {
              return <App {...props} />;
            }}
          />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
