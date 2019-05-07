import React from "react";

import PageHeader from "../../components/pageHeader";
import WishlistItem from "./components/wishlistItem";

import { firebase } from "../../lib/firebase";

class InvitedWishlistPage extends React.Component {
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
    const { items, uid } = this.state;
    return (
      <div>
        <PageHeader title="Name of wishlist" />
        {items.length > 0 && (
          <React.Fragment>
            {items.map((item, index) => (
              <WishlistItem index={index} isOwner={false} wishlistUid={uid} />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default InvitedWishlistPage;
