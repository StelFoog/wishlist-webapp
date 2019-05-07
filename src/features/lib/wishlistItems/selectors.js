import { createSelector } from "reselect";

const getItems = ({ wishlist }) => {
  console.log(wishlist);
  wishlist.wishlists[0].items;
};

const getItemsState = () =>
  createSelector(
    [getItems],
    items => items
  );

export default { getItemsState };
