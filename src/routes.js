import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Components
import Dialog from "./features/components/dialog/DialogContainer";
import { ItemAddition as WishlistItem } from "./features/components/wishListForm";

// Pages
import HomePage from "./features/pages/homePage";
import Dashboard from "./features/pages/dashboard";
import LoggedInPage from "./features/pages/loggedInPage";
import WishlistPage from "./features/pages/wishlistPage";
import InvitedUserPage from "./features/pages/invitedUserPage";
import InvitedWishlistPage from "./features/pages/invitedWishlistPage";

const Root = ({ store, history, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router>
          <Dialog />
          <Route
            path={"/"}
            exact
            render={props => {
              return <HomePage {...props} />;
            }}
          />
          <Route
            path={"/dashboard/"}
            render={props => {
              return <Dashboard {...props} />;
            }}
          />
          <Switch>
            <Route
              path={"/dashboard"}
              exact
              render={props => {
                return <LoggedInPage {...props} />;
              }}
            />
            <Route
              path={"/dashboard/wishlist/:uid"}
              exact
              render={props => {
                return <WishlistPage {...props} />;
              }}
            />
            <Route
              path={"/wishlist/:uid/invite"}
              exact
              render={props => {
                return <InvitedUserPage {...props} />;
              }}
            />
            <Route
              path={"/dashboard/guest/:uid"}
              exact
              render={props => {
                return <InvitedWishlistPage {...props} />;
              }}
            />
            <Route
              exact
              render={props => {
                return <h1> 404 </h1>;
              }}
            />
            <Route
              path={"/dashboard/wishlist/:uid"}
              exact
              component={WishlistPageTest}
            />
            <Route
              exact
              render={props => {
                return <h1> 404 </h1>;
              }}
            />
            <Route
              path={"/dashboard/wishlist/:uid"}
              exact
              component={WishlistPageTest}
            />
            <Route
              exact
              render={props => {
                return <h1> 404 </h1>;
              }}
            />
          </Switch>
          {/*
            <Route
              path={"/formtest"}
              exact
              render={props => {
                return <NewWishlist {...props} />;
              }}
            />
          */}
          <Route
            path={"/wishlistitem"}
            exact
            render={props => {
              return <WishlistItem {...props} />;
            }}
          />
        </Router>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
