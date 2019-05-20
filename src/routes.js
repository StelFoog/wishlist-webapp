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
  user,
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
            <ProtectedRoute
              path={"/dashboard/wishlist/:uid"}
              exact
              user={user}
              component={WishlistPage}
              pathname={pathname}
              push={push}
              variant={"ownWishlist"}
            />
            <Route
              path="/dashboard/help"
              exact
              render={props => {
                return <HelpPage {...props} />;
              }}
            />
            <ProtectedRoute
              path={"/dashboard/group/:uid/:user"}
              exact
              user={user}
              component={GroupPage}
              pathname={pathname}
              push={push}
              variant={"group"}
            />
            <ProtectedRoute
              path={"/dashboard/guest/:uid"}
              exact
              user={user}
              component={InvitedWishlistPage}
              pathname={pathname}
              push={push}
              variant={"sharedWishlist"}
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

const ProtectedRoute = ({
  component: Component,
  pathname,
  user,
  variant,
  exact = false,
  path,
  push
}) => {
  let hasAccess = false;
  if (user) {
    switch (variant) {
      case "ownWishlist":
        const ownWishlistUid = pathname.split("/")[3];
        hasAccess = user.ownedWishlists.includes(ownWishlistUid);
        break;
      case "sharedWishlist":
        const sharedWishlistUid = pathname.split("/")[3];
        hasAccess = user.wishlists.includes(sharedWishlistUid);
        break;
      case "group":
        const groupUid = pathname.split("/")[3];
        hasAccess = user.groups.includes(groupUid);
        break;
    }
  }
  return (
    <Route
      path={path}
      exact={exact}
      render={props => {
        if (hasAccess) return <Component {...props} />;
        // Should be a proper component or a page push
        else return <div>{"Not for your eyes"}</div>;
      }}
    />
  );
};

const mapStateToProps = () => {
  const getPathname = routerSelectors.getPathhameState();
  return state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
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
