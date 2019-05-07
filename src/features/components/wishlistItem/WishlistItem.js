import React from "react";
import { connect } from "react-redux";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";
import Button from "../button";
import EditItem from "../dialog/variants";
import { actions } from "../dialog";
import { selectors } from "../../lib/wishlists"

<<<<<<< HEAD
const { openDialog } = actions;

const wishListItem = ({ wishlists, index, editItem, wishlistUid }) => {
  const wishlist = wishlists.find((element) => element.uid == wishlistUid);
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
=======
const wishListItem = ({ item, index, isOwner = true }) => (
  <CardContainer key={item.name}>
    <div className="itemContent">
      <div className="itemText">
        <CardHeader children={item.name} />
        <CardContent>
          <p>{item.description}</p>
        </CardContent>
      </div>

      <div className="itemPrice">
        <h3>{item.price}</h3>
        {isOwner && (
>>>>>>> invite-users
          <Button
            variant={"filled"}
            label={"Edit"}
            color={"var(--color-primary"}
<<<<<<< HEAD
            handleClick={() => editItem({ item, index, wishlistUid })}
          />

        </div>
=======
            handleClick={showEditDialog}
          />
        )}
>>>>>>> invite-users
      </div>
    </CardContainer >
  );
}

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state)
  });
}

<<<<<<< HEAD
const mapDispatchToProps = dispatch => ({
  editItem: (dialogValues) => dispatch(openDialog("editItem", dialogValues))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wishListItem);
=======
export default wishListItem;
>>>>>>> invite-users
