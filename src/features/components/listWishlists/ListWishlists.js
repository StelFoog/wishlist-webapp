import React, { Component } from "react";
import PageHeader from "../pageHeader";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card/";
import ProfilePicture from "../profilePicture/ProfilePicture.js";
import "./listWishlists.css";
import { connect } from "react-redux";
import { actions, selectors } from "../../lib/wishlists";
import { Switch, Route } from "react-router";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { ConnectedRouter, push } from "connected-react-router";
import Dashboard from "../../pages/dashboard";
import HomePage from "../../pages/homePage";

function WishlistPageTest({ match }) {
  return <h1> {"Hello" + match.params.uid} </h1>;
}

export { WishlistPageTest };

import { Switch, Route } from "react-router";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Dashboard from "../../pages/dashboard";
import HomePage from "../../pages/homePage";

function WishlistPageTest({ match }) {
  return <h1> {"Hello" + match.params.uid} </h1>;
}

export { WishlistPageTest };

const { fetchWishlists } = actions;

const MAX_WISHLIST_AVATARS = 5;

function homog_seq(x, n) {
  let seq = [];
  for (let i = 0; i < n; ++i) {
    seq.unshift(x);
  }
  return seq;
}

function createWishlistRoutes() {
  return (
    <ConnectedRouter history="none">
      <Router>
        <Switch>
          <Route
            path={"/dashboard/wishlist/test"}
            exact
            render={props => {
              return <HomePage {...props} />;
            }}
          />
          <Route
            path={"/dashboard/wishlist/test2"}
            exact
            render={props => {
              return <Dashboard {...props} />;
            }}
          />
        </Switch>
      </Router>
    </ConnectedRouter>
  );
}

function getUserAvatarElem(user) {
  return (
    <ProfilePicture
      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
      width="30px"
    />
  );
}

const moreMembers = (
  <ProfilePicture
    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    width="30px"
  />
);

function getWishlistAvatars(wishlist) {
  const members = homog_seq(1, 10); // placeholder
  const avatars = members
    .slice(0, Math.min(MAX_WISHLIST_AVATARS - 1, members.length))
    .map(getUserAvatarElem);

  if (members.length >= MAX_WISHLIST_AVATARS)
    avatars.push(
      members.length === MAX_WISHLIST_AVATARS
        ? getUserAvatarElem(members[MAX_WISHLIST_AVATARS - 1])
        : moreMembers
    );
  return avatars;
}

class ListWishlists extends Component {
  constructor(props) {
    super(props);

    this.displayWishlist = this.displayWishlist.bind(this);
  }

  displayWishlist(wishlist) {
    return (
      <div onClick={() => this.props.goToWishlist(wishlist)}>
        <CardContainer
          children={
            <div className="cardContent">
              <CardHeader children={wishlist.title} />
              <hr />
              <CardContent
                children={
                  <div className="wishlistCard">
                    <p className="wishlistText">...</p>
                    <div className="wishlistAvatarList">
                      {getWishlistAvatars(wishlist)}
                    </div>
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchWishlists();
  }

  getWishlists() {
    //const x = { title: "Yellow", text: "blue red black yellow green gray orange purple magenta violet turqoise lime white blue yellow orange brown gray" };
    console.log(this.props);
    return this.props.wishlists.map(this.displayWishlist);
  }
  render() {
    return (
      <div>
        <Route path="/dashboard/nirb" exact component={Dashboard} />
        <div className="listWishlists">
          <PageHeader title={"Your wishlists"} />
          {/* Fetch users wishlists from database*/}
          {this.getWishlists()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  fetchWishlists: () => dispatch(fetchWishlists()),
  goToWishlist: wishlist => dispatch(push(`/wishlist/${wishlist.uid}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWishlists);
