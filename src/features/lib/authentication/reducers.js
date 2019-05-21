import types from "./types.js";

const {
  AUTH_LOGOUT,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_USER_ERROR,
  AUTH_USER_SUCCESS,
  ADD_USER_TO_WISHLIST_ERROR,
  ADD_USER_TO_WISHLIST_SUCCESS,
  ADD_WISHLIST_ID_TO_USER,
  REMOVE_WISHLIST_ID_FROM_USER,
  ADD_GROUP_ID_TO_USER,
  REMOVE_GROUP_ID_FROM_USER,
  SEARCH_FOR_USERS_WITH_NAME_ERROR,
  SEARCH_FOR_USERS_WITH_NAME_SUCCESS,
  CLEAR_SEARCH,
  REMOVE_USER_FROM_WISHLIST_ERROR,
  REMOVE_USER_FROM_WISHLIST_SUCCESS,
  UPDATE_CURRENT_USER_ERROR,
  UPDATE_CURRENT_USER_SUCCESS
} = types;

const initialState = {
  user: null,
  loggedIn: false,
  searchResults: []
};

const userReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const {
    type,
    userData,
    error,
    wishlistUid,
    groupId,
    searchResults,
    userUid
  } = action;

  switch (type) {
    case AUTH_USER_ERROR:
      console.error(
        "authentication error: " + error.code + "-> " + error.message
      );
      return nextState;

    case AUTH_USER_SUCCESS:
      nextState.loggedIn = true;
      nextState.user = userData;
      return nextState;

    case AUTH_LOGOUT_ERROR:
      console.log("Error logging out " + error);
      break;
    case AUTH_LOGOUT_SUCCESS:
      nextState.loggedIn = false;
      nextState.user = null;
      break;

    case CLEAR_SEARCH:
      nextState.searchResults = [];
      return { ...nextState };

    case ADD_WISHLIST_ID_TO_USER:
      nextState.user.ownedWishlists.push(wishlistUid);
      return nextState;

    case REMOVE_WISHLIST_ID_FROM_USER:
      let wishlistIndexDelete = nextState.user.ownedWishlists.findIndex(
        element => element === wishlistUid
      );
      if (wishlistIndexDelete >= 0)
        nextState.user.ownedWishlists.splice(wishlistIndexDelete, 1);

      wishlistIndexDelete = nextState.user.wishlists.findIndex(
        element => element === wishlistUid
      );
      if (wishlistIndexDelete >= 0)
        nextState.user.wishlists.splice(wishlistIndexDelete, 1);

      return nextState;

    case ADD_GROUP_ID_TO_USER:
      nextState.user.groups.push(groupId);
      return nextState;

    case REMOVE_GROUP_ID_FROM_USER:
      return {
        ...nextState,
        user: {
          ...nextState.user,
          groups: nextState.user.groups.filter(group => !(group === groupId))
        }
      };

    case SEARCH_FOR_USERS_WITH_NAME_ERROR:
      console.error("User search error: " + error.code + "-> " + error.message);
      return nextState;

    case SEARCH_FOR_USERS_WITH_NAME_SUCCESS:
      nextState.searchResults = searchResults;
      return nextState;

    case UPDATE_CURRENT_USER_ERROR:
      console.error(
        "User updating error: " + error.code + "-> " + error.message
      );
      return nextState;
    case UPDATE_CURRENT_USER_SUCCESS:
      nextState.user = userData;
      return nextState;
  }
  return nextState;
};

export default { userReducer };
