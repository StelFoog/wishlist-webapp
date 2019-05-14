import React from "react";
import { connect } from "react-redux";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";
import Button from "../button";
import { actions } from "../dialog";
import { selectors } from "../../lib/wishlists";

const { openDialog } = actions;

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
          <Button
            variant={"filled"}
            label={"Edit"}
            color={"var(--color-primary"}
            handleClick={() => editItem({ item, index, wishlistUid })}
          />
        </div>
      </div>
    </CardContainer>
  );
};

const mapStateToProps = () => {
  const getOwnedWishlists = selectors.getOwnedWishlistsState();
  return state => ({
    wishlists: getOwnedWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  editItem: dialogValues => dispatch(openDialog("editItem", dialogValues))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wishListItem);
