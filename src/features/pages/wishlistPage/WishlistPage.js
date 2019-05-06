import React, { Component } from "react";
import PageHeader from "../../components/pageHeader";
import WishlistItem from "../../components/wishlistItem";

import "./wishlistPage.css";
import { firebase } from "../../lib/firebase";
import { connect } from "react-redux";
import { actions, selectors } from "../../lib/wishlistItems";

const { fetchAllItems } = actions;

class WishlistPage extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  getAllWishlistItems() {
    firebase
      .firestore()
      .collection("Wishlists")
      .doc("jxS5xHaHRyPwtJp7GWe0AfOlHBN2-873964620")
      .get()
      .then(doc => {
        this.setState({ items: doc.data().items });
      });
  }

  componentDidMount() {
    this.getAllWishlistItems();
  }

  render() {
    const { items } = this.state;
    return (
      <div className="wishlistPage">
        <PageHeader title="Name of wishlist" />
        {items.length > 0 && (
          <React.Fragment>
            {items.map(item => (
              <WishlistItem item={item} />
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
