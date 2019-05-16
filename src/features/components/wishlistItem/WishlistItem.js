import React from "react";
import { connect } from "react-redux";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";
import Button from "../button";
import { actions } from "../dialog";
import { selectors } from "../../lib/wishlists";
import "./wishlistItem.css";

const { openDialog } = actions;

const wishListItem = ({ wishlists, index, editItem, wishlistUid }) => {
  const wishlist = wishlists.find(element => element.uid === wishlistUid);
  const item = wishlist.items[index];
  console.log(item);
  const { name, description, price } = item;
  return (
    <React.Fragment>
      <div className="wishlistItem">
        <div className="itemContent itemTitle">
          <h2>{name}</h2>
        </div>

        <div className="itemContent itemDescription">
          <p>{description}</p>
        </div>

        <div className="itemContent">
          <div className="itemPrice">
            <h3>{price}:-</h3>
          </div>
          <div className="itemLink">
            <Button
              variant="filled"
              label="Link"
              className="itemLinkButton"
              padding="0"
              color="var(--color-primary)"
            />
          </div>
        </div>

        <div className="itemContent">
          <Button
            variant={"filled"}
            label={"Edit"}
            color={"var(--color-primary"}
            handleClick={() => editItem({ item, index, wishlistUid })}
          />
        </div>
      </div>
    </React.Fragment>
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
