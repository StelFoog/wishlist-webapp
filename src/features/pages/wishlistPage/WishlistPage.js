import React from "react";
import { WishlistTitle } from "./components";
import WishlistItem from "../../components/wishlistItem";
import { connect } from "react-redux";

import "./wishlistPage.css";

import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import Button from "../../components/button";
import dialogActions from "../../components/dialog/actions.js";

const { openDialog } = dialogActions;

const WishlistPage = ({
  wishlists,
  createItem,
  setCurrentPage,
  match,
  editing,
  editWishlistProperties,
  shareWishlist
}) => {
  const wishlistUid = match.params.uid;
  const uid = wishlistUid;
  const wishlist = wishlists.find(element => element.uid == wishlistUid);
  const { items } = wishlist;

  return (
    <div className="page">
      <WishlistTitle
        title={wishlist.title}
        editing={editing}
        editWishlistProperties={editWishlistProperties}
        uid={uid}
      />
      <div className="shareWishlistButton">
        <Button
          variant="filled"
          label="Share"
          color="var(--color-primary)"
          handleClick={() => (shareWishlist(wishlist.uid))}
        />
      </div>
      <div className="wishlistPage">
        {items.length > 0 && (
          <React.Fragment>
            {items.map((item, index) => (
              <WishlistItem index={index} wishlistUid={wishlist.uid} />
            ))}
          </React.Fragment>
        )}
        <div className="createItemButton">
          <IconButton
            variant="filled"
            handleClick={() => createItem(wishlist.uid)}
          >
            <PlusIcon size={50} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
  createItem: wishlistUid =>
    dispatch(openDialog("createItem", { wishlistUid })),
  shareWishlist: wishlistUid =>
    dispatch(openDialog("share", {wishlistUid}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
