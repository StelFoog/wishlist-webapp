import { createSelector } from "reselect";

const getWishlists = ({ wishlist }) => wishlist.wishlists;
const getOwnedWishlists = ({ wishlist }) => wishlist.ownedWishlists;
const getEdit = ({ wishlist }) => wishlist.editing;

const getEditState = () =>
  createSelector(
    [getEdit],
    editing => editing
  );

const getWishlistsState = () =>
  createSelector(
    [getWishlists],
    wishlists => wishlists
  );

const getOwnedWishlistsState = () =>
  createSelector(
    [getOwnedWishlists],
    ownedWishlists => ownedWishlists
  );

export default { getWishlistsState, getOwnedWishlistsState, getEditState };
