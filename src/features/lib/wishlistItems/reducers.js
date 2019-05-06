import types from "./types.js";

const { FETCH_ALL_ITEMS_SUCCESS, FETCH_ALL_ITEMS_ERROR } = types;

const initalState = {
  items: []
}

const wishlistItemReducer = (state = initalState, action) => {
  let nextState = state;
  const { type, itemData, error } = action;

  switch (type) {

    case FETCH_ALL_ITEMS_SUCCESS:
      nextState.items = itemData;
      console.log("Fetched items!" + itemData);
      return { ...nextState };

    case FETCH_ALL_ITEMS_ERROR:
      console.error(
        "Wishlist item fetching error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    default:
      return { ...nextState }
  }
}

export default { wishlistItemReducer };
