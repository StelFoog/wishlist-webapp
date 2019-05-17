import React from "react";
import { WishlistTitle } from "./components";
import WishlistItem from "../../components/wishlistItem";
import actions from "../../lib/authentication/actions.js";

import { connect } from "react-redux";

import "./wishlistPage.css";

import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import Button from "../../components/button";
import dialogActions from "../../components/dialog/actions.js";

const { addUserToWishlist } = actions;
const { openDialog } = dialogActions;

const WishlistPage = ({
  wishlists,
  createItem,
  setCurrentPage,
  match,
  firebase,
  editing,
  editWishlistProperties,
  shareWishlist,
  user /* Actually auth */
}) => {
  const { uid } = match.params;
  const wishlist = wishlists.find(element => element.uid === uid);
  const { items } = wishlist;

  return (
    <div className="page">
      <WishlistTitle
        title={wishlist.title}
        editing={editing}
        editWishlistProperties={editWishlistProperties}
        uid={uid}
        wishlist={wishlist}
      />
      {/*
      <div className="shareWishlistButton">
        <Button
          variant="filled"
          label="Share"
          color="var(--color-primary)"
          handleClick={() => shareWishlist(wishlist, user.user)}
        />
      </div>
      */}
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
            color="var(--color-primary)"
            handleClick={() => createItem(wishlist.uid)}
          >
            <PlusIcon size={50} color="white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return state => ({
    user: state.auth
  });
};

const mapDispatchToProps = dispatch => ({
  createItem: wishlistUid =>
    dispatch(openDialog("createItem", { wishlistUid })),
  /* With each UID; invite the users to the wishlist
   * Only show users that are a) not yourself and b) not already
   * members of the wishlist
   */
  shareWishlist: (currentWishlist, currentUser) =>
    dispatch(
      openDialog("share", {
        title: "Share wishlist",
        share: users => {
          users.forEach(user => {
            dispatch(addUserToWishlist(currentWishlist.uid, user));
          });
        },
        showIf: user => {
          return (
            user.uid !== currentUser.uid &&
            !currentWishlist.members.includes(user.uid) &&
            !currentWishlist.owner !== user.uid
          );
        }
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
