import { createSelector } from "reselect";

const getItems = ({ wishlist }) => wishlist.wishlists[0].items;

const getItemsState = () =>
  createSelector(
    [getItems],
    items => items
  );

export default { getItemsState };
