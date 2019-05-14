import React from "react";
import { WishlistTitle } from "./components";
import WishlistItem from "../../components/wishlistItem";

import "./wishlistPage.css";

import IconButton from "../../components/iconButton";
import PlusIcon from "../../components/svgIcon/icons/PlusIcon";

const WishlistPage = ({
  wishlists,
  createItem,
  setCurrentPage,
  match,
  editing,
  editWishlistProperties
}) => {
  const { uid } = match.params;
  setCurrentPage(uid);
  const wishlist = wishlists.find(element => element.uid === uid);
  const { items } = wishlist;
  return (
    <div className="page">
      <WishlistTitle
        title={wishlist.title}
        editing={editing}
        editWishlistProperties={editWishlistProperties}
        uid={uid}
      />
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
};

export default WishlistPage;
