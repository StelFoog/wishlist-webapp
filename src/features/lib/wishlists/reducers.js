import types from "./types.js";

const {
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS,
  FETCH_OWNED_WISHLISTS_SUCCESS,
  FETCH_OWNED_WISHLISTS_ERROR,
  FETCH_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS_ERROR
} = types;

const initialState = {
  wishlists: [],
  ownedWishlists: []
};

const wishlistReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, wishlistData, error } = action;
  switch (type) {
    case CREATE_USER_WISHLIST_ERROR:
      console.error(
        "wishlist creation error: " + error.code + "-> " + error.message
      );
      return { ...nextState };
    case CREATE_USER_WISHLIST_SUCCESS:
      nextState.wishlists.push(wishlistData);
      return { ...nextState };
    case FETCH_OWNED_WISHLISTS_SUCCESS:
      console.log(wishlistData);
      nextState.ownedWishlists = wishlistData;
      console.log("Fetched owned wishlists!" + wishlistData);
      return { ...nextState };
    case FETCH_OWNED_WISHLISTS_ERROR:
      console.error("Error occurred while fetching wishlists.");
      return { ...nextState };
    case FETCH_WISHLISTS_SUCCESS:
      nextState.wishlists = wishlistData;
      console.log("Fetched wishlists!" + wishlistData);
      return { ...nextState };
    case FETCH_WISHLISTS_ERROR:
      console.error("Error occurred while fetching wishlists.");
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default { wishlistReducer };
