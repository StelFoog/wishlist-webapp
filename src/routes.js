import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { SETTINGS_PATH } from "./features/shared/constants";
import App from "./App"; // should be destroyed
import SettingsContainer from "./features/settings/SettingsContainer";

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
          <Route
            path={SETTINGS_PATH}
            exact
            render={props => {
              return <SettingsContainer {...props} />;
            }}
          />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
