import types from "./types";

const {
  CREATE_GROUP_WISHLIST_ITEM_SUCCESS,
  CREATE_GROUP_WISHLIST_ITEM_ERROR,

  FETCH_ALL_GROUP_ITEMS_SUCCESS,
  FETCH_ALL_GROUP_ITEMS_ERROR,

  EDIT_GROUP_WISHLIST_ITEM_SUCCESS,
  EDIT_GROUP_WISHLIST_ITEM_ERROR,

  CLAIM_GROUP_WISHLIST_ITEM_ERROR,
  CLAIM_GROUP_WISHLIST_ITEM_SUCCESS
} = types;

const initialState = {
  items: []
};

// A reducer function that takes the old state and an action. Should only
// augment the state.
const groupWishlistReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, error, itemData, userID, index } = action;

  switch (type) {
    case CREATE_GROUP_WISHLIST_ITEM_SUCCESS:
      return { ...nextState, items: nextState.items.concat(itemData) };

    case CREATE_GROUP_WISHLIST_ITEM_ERROR:
      console.error(
        "Wishlist item creation error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    case FETCH_ALL_GROUP_ITEMS_SUCCESS:
      console.log(itemData);
      return { ...nextState, items: itemData };

    case FETCH_ALL_GROUP_ITEMS_ERROR:
      console.error(
        "Wishlist item fetching error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    case EDIT_GROUP_WISHLIST_ITEM_SUCCESS:
      return {
        ...nextState,
        items: nextState.items.map((item, i) =>
          i === index
            ? {
                ...item,
                description: itemData.description,
                name: itemData.name,
                price: itemData.price
              }
            : { ...item }
        )
      };

    case EDIT_GROUP_WISHLIST_ITEM_ERROR:
      console.error(
        "Wishlist item editing error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    case CLAIM_GROUP_WISHLIST_ITEM_SUCCESS:
      return {
        ...nextState,
        items: nextState.items.map((item, i) =>
          i === index
            ? { ...item, claimedBy: item.claimedBy.concat(userID) }
            : { ...item }
        )
      };

    case CLAIM_GROUP_WISHLIST_ITEM_ERROR:
      console.error(
        "Wishlist item claiming error: " + error.code + "->" + error.message
      );
      return { ...nextState };

    default:
      return { ...nextState };
  }
};

export default groupWishlistReducer;
