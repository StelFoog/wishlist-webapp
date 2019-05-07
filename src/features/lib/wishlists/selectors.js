import { createSelector } from "reselect";

const getWishlists = ({ wishlist }) => wishlist.wishlists;

const getWishlistsState = () =>
  createSelector(
    [getWishlists],
    wishlists => wishlists
  );

export default { getWishlistsState };
