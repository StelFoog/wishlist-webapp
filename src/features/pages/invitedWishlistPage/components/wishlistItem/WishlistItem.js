import React from "react";
import { connect } from "react-redux";
import CardContainer, {
  CardContent,
  CardHeader
} from "../../../../components/card";
import { selectors } from "../../../../lib/wishlists";

const wishListItem = ({ wishlists, index, editItem, wishlistUid }) => {
  const wishlist = wishlists.find(element => element.uid === wishlistUid);
  const item = wishlist.items[index];
  console.log(item);
  const { name, description, price } = item;
  return (
    <CardContainer key={name}>
      <div className="itemContent">
        <div className="itemText">
          <CardHeader children={name} />
          <CardContent>
            <p>{description}</p>
          </CardContent>
        </div>

        <div className="itemPrice">
          <h3>{price}:-</h3>
        </div>
      </div>
    </CardContainer>
  );
};

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state)
  });
};

export default connect(
  mapStateToProps,
  null
)(wishListItem);
