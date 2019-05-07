import { createSelector } from "reselect";
import { auth } from "firebase";

const getWishlists = ({ wishlist }) => wishlist.wishlists;
const getOwnedWishlists = ({ wishlist }) => wishlist.ownedWishlists;

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

export default { getWishlistsState, getOwnedWishlistsState };
