import types from "./types.js";

const {
  // CREATE_WISHLIST_ITEM_SUCCESS,
  CREATE_WISHLIST_ITEM_ERROR,
  FETCH_ALL_ITEMS_SUCCESS,
  FETCH_ALL_ITEMS_ERROR,
  // EDIT_WISHLIST_ITEM_SUCCESS,
  EDIT_WISHLIST_ITEM_ERROR,
  CLAIM_WISHLIST_ITEM_SUCCESS,
  CLAIM_WISHLIST_ITEM_ERROR
} = types;

const initalState = {
  items: []
};

const wishlistItemReducer = (state = initalState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, itemData, error, index, userId } = action;

  switch (type) {
    case CREATE_WISHLIST_ITEM_ERROR:
      console.error(
        "Wishlist item creation error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    case FETCH_ALL_ITEMS_SUCCESS:
      nextState.items = itemData;
      console.log("Fetched items!" + itemData);
      return { ...nextState };

    case FETCH_ALL_ITEMS_ERROR:
      console.error(
        "Wishlist item fetching error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    case EDIT_WISHLIST_ITEM_ERROR:
      console.error(
        "Wishlist item editing error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    case CLAIM_WISHLIST_ITEM_SUCCESS:
      nextState.items[index].claimedBy.push(userId);
      return { ...nextState };
    case CLAIM_WISHLIST_ITEM_ERROR:
      console.error(
        "Wishlist item claiming error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    default:
      return { ...nextState };
  }
};

export default { wishlistItemReducer };
