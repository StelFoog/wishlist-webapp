import { createSelector } from "reselect";

const getItems = ({ items }) => items.items;

const getItemsState = () =>
  createSelector(
    [getItems],
    items => items
  );

export default { getItemsState };