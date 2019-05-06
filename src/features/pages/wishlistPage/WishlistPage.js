import React, { Component } from "react";
import PageHeader from "../../components/pageHeader";
import WishlistItem from "../../components/wishlistItem";

import "./wishlistPage.css";
import { firebase } from "../../lib/firebase";
import { connect } from "react-redux";
import { actions, selectors } from "../../lib/wishlistItems";

const { fetchAllItems } = actions;

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
    const { items } = this.state;
    console.log("y9o");
    return (
      <div className="wishlistPage">
        <PageHeader title="Name of wishlist" />
        {items.length > 0 && (
          <React.Fragment>
            {items.map((item, index) => (
              <WishlistItem item={item} index={index} />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => {
  const getWishlistItems = selectors.getItemsState();
  return state => ({
    items: getWishlistItems(state)
  });
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
