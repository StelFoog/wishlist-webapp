import types from "./types.js";

const {
  AUTH_USER_ERROR,
  AUTH_USER_SUCCESS,
  AUTH_LOGOUT,
  ADD_USER_TO_WISHLIST_ERROR,
  ADD_USER_TO_WISHLIST_SUCCESS,
  ADD_WISHLIST_ID_TO_USER,
  REMOVE_WISHLIST_ID_FROM_USER,
  ADD_GROUP_ID_TO_USER,
  REMOVE_GROUP_ID_FROM_USER,
  SEARCH_FOR_USERS_WITH_NAME_ERROR,
  SEARCH_FOR_USERS_WITH_NAME_SUCCESS,
  CLEAR_SEARCH
} = types;

const initialState = {
  user: null,
  loggedIn: false,
  searchResults: []
};

const userReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, userData, error, wishlistUid, groupId, searchResults } = action;

  switch (type) {
    case AUTH_USER_ERROR:
      console.error(
        "authentication error: " + error.code + "-> " + error.message
      );
      return nextState;

    case AUTH_USER_SUCCESS:
      nextState.loggedIn = true;
      nextState.user = userData;
      console.log("Logged in!" + userData);
      return nextState;

    case AUTH_LOGOUT:
      nextState.loggedIn = false;
      nextState.user = null;
      alert("logged out successfully");
      return nextState;

    case ADD_USER_TO_WISHLIST_ERROR:
      console.error(
        "Wishlist invitation error: " + error.code + "-> " + error.message
      );
      return nextState;

    case ADD_USER_TO_WISHLIST_SUCCESS:
      nextState.user.wishlists.push(wishlistUid);
      return { ...nextState };
    case CLEAR_SEARCH:
      nextState.searchResults = [];
      return { ...nextState };

    case ADD_WISHLIST_ID_TO_USER:
      console.log(wishlistUid);
      nextState.user.ownedWishlists.push(wishlistUid);
      return nextState;

    case REMOVE_WISHLIST_ID_FROM_USER:
      let wishlistIndexDelete = nextState.user.ownedWishlists.findIndex(
        element => element === wishlistUid
      );
      if (wishlistIndexDelete)
        nextState.user.ownedWishlists.splice(wishlistIndexDelete, 1);

      wishlistIndexDelete = nextState.user.wishlists.findIndex(
        element => element === wishlistUid
      );
      if (wishlistIndexDelete)
        nextState.user.wishlists.splice(wishlistIndexDelete, 1);

      return nextState;

    case ADD_GROUP_ID_TO_USER:
      nextState.user.groups.push(groupId);
      return nextState;
    case REMOVE_GROUP_ID_FROM_USER:
      let groupIndexDelete = nextState.user.groups.findIndex(
        element => element === groupId
      );
      if (groupIndexDelete) nextState.user.groups.splice(groupIndexDelete, 1);
      return nextState;

    default:
      return nextState;

    case SEARCH_FOR_USERS_WITH_NAME_ERROR:
      console.error("User search error: " + error.code + "-> " + error.message);
      return nextState;
    case SEARCH_FOR_USERS_WITH_NAME_SUCCESS:
      nextState.searchResults = searchResults;
      return nextState;
  }
};

export default { userReducer };
