import { createSelector } from "reselect";

const getGroupWishlistItems = ({ groupWishlist }) => groupWishlist.items;
const getGroupWishlistItemsState = () =>
  createSelector(
    [getGroupWishlistItems],
    items => items
  );

export default { getGroupWishlistItemsState };
