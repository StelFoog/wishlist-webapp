import React from "react";
import WishlistMembers from "../../../../components/wishlistMembers";

import CardContainer, {
  CardHeader,
  CardContent
} from "../../../../components/card";

class SharedWishlists extends React.Component {
  constructor(props) {
    super(props);
    this.displayWishlist = this.displayWishlist.bind(this);
  }

  displayWishlist(wishlist) {
    return (
      <div onClick={() => this.props.goToWishlist(wishlist)}>
        <CardContainer
          children={
            <div className="wishlistCard">
              <h1 className="wishlistCardTitle">{wishlist.title}</h1>
              {wishlist.description || "No description provided"}
              <div className="wishlistMembersDue">
                <WishlistMembers wishlist={wishlist} size={60} />
                {wishlist.endDate && <h3>Date: {wishlist.endDate}</h3>}
              </div>
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
    console.log(this.props);
    return this.props.wishlists.map(this.displayWishlist);
  }

  render() {
    return <div className="listWishlists">{this.getWishlists()}</div>;
  }
}

export default SharedWishlists;
