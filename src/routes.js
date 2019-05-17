import React from "react";
import { Provider, connect } from "react-redux";
import { ConnectedRouter, push } from "connected-react-router";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// State management
import { actions as authActions } from "./features/lib/authentication";
import { selectors as routerSelectors } from "./features/lib/router";

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
import GroupPage from "./features/pages/groupPage";
import NoLogin from "./features/pages/noLoginPage";
import InvitePage from "./features/pages/invitePage";
import HelpPage from "./features/pages/helpPage";

const Root = ({
  store,
  history,
  persistor,
  handleNotLoggedIn,
  loggedIn,
  pathname,
  push
}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router>
          <RequireLogin
            loggedIn={loggedIn}
            pathname={pathname}
            handleNotLoggedIn={handleNotLoggedIn}
            push={push}
          >
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
                path={"/dashboard/:pathParam1?/:pathParam2?"}
                render={props => {
                  return <Dashboard {...props} />;
                }}
              />
              <Route
                path={"/nologin"}
                render={props => {
                  return <NoLogin {...props} />;
                }}
              />
              <Route
                path={"/invite"}
                render={props => {
                  return <InvitePage {...props} />;
                }}
              />
              <Route
                exact
                render={props => {
                  return <h1> 404 </h1>;
                }}
              />
            </Switch>
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
              path="/dashboard/help"
              exact
              render={props => {
                return <HelpPage {...props} />;
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
              path={"/dashboard/group/:uid/:user"}
              exact
              render={props => {
                return <GroupPage {...props} />;
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
              path={"/wishlistitem"}
              exact
              render={props => {
                return <WishlistItem {...props} />;
              }}
            />
          </RequireLogin>
        </Router>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

const RequireLogin = ({
  children,
  loggedIn,
  pathname,
  handleNotLoggedIn,
  accepted = ["/", "invite"],
  push
}) => {
  const ifNot = accepted.includes(pathname);
  if (pathname.endsWith("/invite") && pathname.length > 7 && loggedIn) {
    push(pathname.substring(0, pathname.length - 7));
    return null;
  } else if (
    loggedIn ||
    ifNot ||
    pathname.startsWith("/nologin") ||
    pathname.startsWith("/invite")
  ) {
    return <React.Fragment>{children}</React.Fragment>;
  } else if (pathname.endsWith("/invite")) {
    push(`/invite?${pathname.substring(0, pathname.length - 7)}`);
    return null;
  } else {
    push(`/nologin?${pathname}`);
    return null;
  }
};

const mapStateToProps = () => {
  const getPathname = routerSelectors.getPathhameState();
  return state => ({
    loggedIn: state.auth.loggedIn,
    pathname: getPathname(state)
  });
};

const { handleNotLoggedIn } = authActions;
const mapDispatchToProps = dispatch => ({
  handleNotLoggedIn: () => dispatch(handleNotLoggedIn()),
  push: path => dispatch(push(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
