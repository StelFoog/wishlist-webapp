import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "./features/pages/homePage";
import Dashboard from "./features/pages/dashboard";
import WishlistPage from "./features/pages/wishlistPage";
import Dialog from "./features/components/dialog/DialogContainer";
// import { WishListTitle as NewWishlist } from "./features/components/wishListForm";
import { ItemAddition as WishlistItem } from "./features/components/wishListForm";
import { WishListTitle as Form } from "./features/components/wishListForm";
import { WishlistPageTest } from "./features/components/listWishlists/ListWishlists.js";

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
            <Route
              path={"/dashboard"}
              exact
              render={props => {
                return <Dashboard {...props} />;
              }}
            />
            {/*
            <Route
              path={"/wishlist/:uid"}
              exact
              render={props => {
                return <WishlistPage {...props} />;
              }}
            />
            <Route
              path={"/wishlist/:uid"}
              exact
              render={props => {
                return <WishlistPage {...props} />;
              }}
            />
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
        </Router>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
