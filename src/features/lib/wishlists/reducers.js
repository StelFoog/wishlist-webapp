import types from "./types.js";
import itemTypes from "../wishlistItems/types";

const {
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS,
  FETCH_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS_ERROR
} = types;

const {
  EDIT_WISHLIST_ITEM_SUCCESS,
  EDIT_WISHLIST_ITEM_ERROR
} = itemTypes;

const initialState = {
  wishlists: []
};

const wishlistReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, wishlistData, wishlistUid, index, itemData, error } = action;

  switch (type) {
    case CREATE_USER_WISHLIST_ERROR:
      console.error(
        "wishlist creation error: " + error.code + "-> " + error.message
      );
      return { ...nextState };
    case CREATE_USER_WISHLIST_SUCCESS:
      nextState.wishlists.push(wishlistData);
      return { ...nextState };
    case FETCH_WISHLISTS_SUCCESS:
      nextState.wishlists = wishlistData;
      console.log("Fetched wishlists!" + wishlistData);
      return { ...nextState };
    case FETCH_WISHLISTS_ERROR:
      console.error("Error occurred while fetching wishlists.");
      return { ...nextState };

    case EDIT_WISHLIST_ITEM_SUCCESS:
      const { wishlists } = nextState;
      let item = itemData;
      // let item = itemData ? itemData : {};
      const wishlistIndex = wishlists.findIndex(element => element.uid == wishlistUid);
      item = { ...wishlists[wishlistIndex].items[index], ...item };
      nextState.wishlists[wishlistIndex].items[index] = item;
      return { ...nextState };

    default:
      return { ...nextState };
  }
};

/* const wishlistItemReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, wishlistUid, index, itemData, error } = action;

  switch (type) {
    case EDIT_WISHLIST_ITEM_SUCCESS:
      const { wishlists } = nextState;
      let item = itemData;
      console.log(state);
      // let item = itemData ? itemData : {};
      const wishlistIndex = wishlists.findIndex(element => element.uid == wishlistUid);
      console
      item = { ...wishlists[wishlistIndex].items[index], ...item };
      console.log(item);
      nextState.wishlists[wishlistIndex].items[index] = { item };
      return { ...nextState };
    default:
      return { ...nextState };
  }
};
*/

export default { wishlistReducer };
