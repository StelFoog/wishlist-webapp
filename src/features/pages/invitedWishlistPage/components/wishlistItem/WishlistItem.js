import React from "react";
import { connect } from "react-redux";
import Button from "../../../../components/button";
import { selectors } from "../../../../lib/wishlists";
import { actions } from "../../../../lib/wishlistItems"
import "./wishlistItem.css";
import ProfilePicture from "../../../../components/profilePicture/ProfilePicture";

const { claimWishlistItem } = actions;

const wishListItem = ({ wishlists, index, wishlistUid, claimItem }) => {
  const wishlist = wishlists.find(element => element.uid == wishlistUid);
  const item = wishlist.items[index];
  console.log(item);
  const { name, description, price, claimedBy } = item;

  function getClaimContent() {
    if (claimedBy === undefined || claimedBy.length == 0) {
      return (
        <div className="itemContent itemClaim">
          <Button
            handleClick={() => claimItem(wishlistUid, index)}
            variant="filled"
            label="Claim item"
            color="var(--color-primary)"
          />
        </div>
      );
    }
    else {
      return (
        <div className="itemContent itemClaim">
          <h3>Claimed by:</h3>
          <div className="claimUsers">
            {claimedBy.map(uid => getUserWhoClaimed(uid))}
          </div>
        </div>
      );
    }
  }


  function getUserWhoClaimed(uid) {

    return (
      <div className="userWhoClaimed">
        {/*
        <div className="userWhoClaimedName">
          <p>{name}</p>
        </div>
      */}
      </div>

    );
  }

  return (

    <React.Fragment>
      <div className="wishlistItem">
        <div className="itemContent itemTitle"><h2>{name}</h2></div>
        <div className="itemContent itemDescription">
          <p>{description}</p>
        </div>
        <div className="itemContent">
          <div className="itemPrice"><h3>{price}:-</h3></div>
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
        {getClaimContent()}
      </div>

    </React.Fragment>
  );
};

const mapStateToProps = () => {
  const getWishlists = selectors.getWishlistsState();
  return state => ({
    wishlists: getWishlists(state)
  });
};

const mapDispatchToProps = dispatch => ({
  claimItem: (wishlistUid, index) => dispatch(claimWishlistItem(wishlistUid, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wishListItem);
