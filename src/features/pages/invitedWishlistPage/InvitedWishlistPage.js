import React from "react";

import PageHeader from "../../components/pageHeader";
import WishlistItem from "../../components/wishlistItem";

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
    const { items } = this.state;
    return (
      <div>
        <PageHeader title="Name of wishlist" />
        {items.length > 0 && (
          <React.Fragment>
            {items.map((item, index) => (
              <WishlistItem item={item} index={index} isOwner={false} />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default InvitedWishlistPage;
