import types from "./types.js";

const { FETCH_ALL_WISHLISTS } = types;

const fetchAllItems = () => ({
  type: FETCH_ALL_WISHLISTS
});

export default { fetchAllItems };