import React from "react";
import WishlistTitle from "./../../components/wishlistTitle";
import WishlistItem from "../../components/wishlistItem";
import actions from "../../lib/wishlists/actions.js";
import userActions from "../../lib/users/actions.js";
import { actions as authActions } from "../../lib/authentication/";
import { selectUserCache } from "../../lib/users/selectors.js";

import { connect } from "react-redux";

import "./wishlistPage.css";

import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";
import dialogActions from "../../components/dialog/actions.js";

import { getUser } from "../../lib/authentication/selectors";

const { addUserToWishlist } = actions;
const { editWishlistProperties } = actions;
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
  user, /* Actually auth */
  userCache
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
      <div className="shareWishlistButton">
        <Button
          variant="filled"
          label="Share"
          color="var(--color-primary)"
          handleClick={() => shareWishlist(wishlist, user.user)}
          handleClick={() => (shareWishlist(wishlist, user.user, state))}
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
  return (currentWishlist, currentUser, userCache) => {
    dispatch(openDialog("share", {
      title: "Share wishlist",
      withAdded: (added) => {
        console.log("with added");
        console.log(added);
        added.forEach(user => (
          dispatch(addUserToWishlist(user.uid, currentWishlist.uid))
        ));
      },
      withRemoved: (removed) => {
        console.log("with removed");
        console.log(removed);
        removed.forEach(user => (
          dispatch(removeUserFromWishlist(user.uid, currentWishlist.uid))
        ));
      },
      preSelected: currentWishlist.members.map((uid) => {
        console.log("getting preselected for " + uid);
        if(!userCache[uid]) {
          dispatch(getUsersWithUids([uid]));
        }
        return userCache[uid];
      }),
      showIf: (user) => {
        return user.uid !== currentUser.uid
            && !currentWishlist.owner !== user.uid;
      }
    }))
  };
}

const mapStateToProps = state => ({
  userCache: selectUserCache(state),
  user: state.auth
});

const mapDispatchToProps = dispatch => ({
  createItem: wishlistUid =>
    dispatch(openDialog("createItem", { wishlistUid })),
  shareWishlist: 
    shareWishlistWithDispatch(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
