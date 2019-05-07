import React, { Component } from "react";
import PageHeader from "../../components/pageHeader";
import WishlistItem from "../../components/wishlistItem";

import "./wishlistPage.css";
import { firebase } from "../../lib/firebase";
import { connect } from "react-redux";
import { actions } from "../../lib/wishlistItems";
import { selectors } from "../../lib/wishlists"

// const { fetchAllItems } = actions;

/*
class WishlistPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      items: [],
      uid: props.match.params.uid
    };
  }
  getAllWishlistItems() {
    const { uid } = this.state;
    firebase
      .firestore()
      .collection("Wishlists")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.data()) {
          this.setState({ items: doc.data().items });
        }
      });
    
  }
  
  componentDidMount() {
    this.getAllWishlistItems();
  }
  

  render() {
<<<<<<< HEAD
    console.log("y9o");
=======
    const { items } = this.state;
>>>>>>> invite-users
    return (
      <div className="wishlistPage">
        <PageHeader title="Name of wishlist" />
        {items.length > 0 && (
          <React.Fragment>
            {items.map((item, index) => (
              <WishlistItem item={item} index={index} wishlistUid={uid} />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}
*/

const WishlistPage = ({ wishlists, pathname }) => {
  const wishlistUid = pathname.split("wishlist/").pop();
  const wishlist = wishlists.find((element) => element.uid == wishlistUid);
  const { items } = wishlist;
  return (
    <div className="wishlistPage">
      <PageHeader title="Name of wishlist" />
      {items.length > 0 && (
        <React.Fragment>
          {items.map((item, index) => (
            <WishlistItem index={index} wishlistUid={wishlist.uid} />
          ))}
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state),
    pathname: state.router.location.pathname
  });
  /*
  const getWishlistItems = selectors.getItemsState();
  return state => ({
    items: getWishlistItems(state)
  });
  */
};

export default connect(
  mapStateToProps,
  null
)(WishlistPage);
