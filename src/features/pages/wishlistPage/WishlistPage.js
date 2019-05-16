import React from "react";
import WishlistTitle from "./../../components/wishlistTitle";
import WishlistItem from "../../components/wishlistItem";
import actions from "../../lib/wishlists/actions.js";

import { connect } from "react-redux";

import "./wishlistPage.css";

import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import dialogActions from "../../components/dialog/actions.js";

import { getUser } from "../../lib/authentication/selectors";

const { addUserToWishlist } = actions;
const { editWishlistProperties } = actions;
const { openDialog } = dialogActions;

const WishlistPage = ({
  wishlists,
  createItem,
  setCurrentPage,
  match,
  firebase,
  editProperties,
  deleteObject,
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
        editProperties={editProperties}
        uid={uid}
        wishlist={wishlist}
        deleteObject={deleteObject}
        user={user}
        type="wishlist"
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
    user: getUser(state)
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
    dispatch(openDialog("share", {
      title: "Share wishlist",
      onShare: (users) => {
        dispatch(editWishlistProperties(
          currentWishlist.uid, 
          "members", 
          users.map((x) => { 
            return x.uid;
          })
        ));
      },
      preSelected: currentWishlist.members,
      showIf: (user) => {
        return user.uid !== currentUser.uid
            && !currentWishlist.owner !== user.uid;
      }
    }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
