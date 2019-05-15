import React from "react";

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
            <div className="cardContent">
              <CardHeader children={wishlist.title} />
              <hr />
              <CardContent
                children={
                  <div className="wishlistCard">
                    <p className="wishlistText">...</p>
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
    console.log(this.props);
    return this.props.wishlists.map(this.displayWishlist);
  }

  render() {
    return <div className="listWishlists">{this.getWishlists()}</div>;
  }
}

export default SharedWishlists;
