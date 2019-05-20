import React from "react";
import WishlistTitle from "./../../components/wishlistTitle";
import WishlistItem from "../../components/wishlistItem";
import actions from "../../lib/wishlists/actions.js";
import userActions from "../../lib/users/actions.js";
import { actions as authActions } from "../../lib/authentication/";
import { selectUserCache } from "../../lib/users/selectors.js";
import { actions as wishlistActions } from "../../lib/wishlists/";

import { connect } from "react-redux";

import "./wishlistPage.css";

import IconButton from "../../components/iconButton";
import Button from "../../components/button";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import dialogActions from "../../components/dialog/actions.js";

import { getUser } from "../../lib/authentication/selectors";

const { editWishlistProperties } = wishlistActions;
const { openDialog } = dialogActions;
const { getUsersWithUids } = userActions;
const { addUserToWishlist, removeUserFromWishlist } = authActions;

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
      <div className="wishlistPage">
        <div className="shareWishlistButton">
          <Button
            borderRadius={0}
            variant="filled"
            label="Share"
            color="var(--color-primary)"
            handleClick={() => shareWishlist(wishlist, user.user)}
          />
        </div>
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

const shareWishlistWithDispatch = dispatch => {
  return (currentWishlist, currentUser) => {
    dispatch(
      openDialog("share", {
        title: "Share wishlist",
        withAdded: added => {
          added.forEach(user =>
            dispatch(addUserToWishlist(user.uid, currentWishlist.uid))
          );
        },
        withRemoved: removed => {
          removed.forEach(user =>
            dispatch(removeUserFromWishlist(user.uid, currentWishlist.uid))
          );
        },
        preSelectedUids: currentWishlist.members,
        showIf: user => user.uid !== currentUser.uid
      })
    );
  };
};

const mapStateToProps = state => ({
  user: state.auth
});

const mapDispatchToProps = dispatch => ({
  createItem: wishlistUid =>
    dispatch(openDialog("createItem", { wishlistUid })),
  shareWishlist: shareWishlistWithDispatch(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
