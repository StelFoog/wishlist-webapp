import itemTypes from "../wishlistItems/types";
import { types as userTypes } from "../authentication/";
import { getUser } from "../authentication/selectors";
import types from "./types.js";

const {
  CREATE_USER_WISHLIST_ERROR,
  CREATE_USER_WISHLIST_SUCCESS,
  FETCH_OWNED_WISHLISTS_SUCCESS,
  FETCH_OWNED_WISHLISTS_ERROR,
  FETCH_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS_ERROR,
  EDIT_WISHLIST_PROPERTIES_ERROR,
  EDIT_WISHLIST_PROPERTIES_SUCCESS,
  DELETE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ERROR,
  TOGGLE_EDIT,
  UPDATE_CURRENT_WISHLIST
} = types;

const {
  ADD_USER_TO_WISHLIST_ERROR,
  ADD_USER_TO_WISHLIST_SUCCESS,
  REMOVE_USER_FROM_WISHLIST_ERROR,
  REMOVE_USER_FROM_WISHLIST_SUCCESS
} = userTypes;

const {
  CREATE_WISHLIST_ITEM_SUCCESS,
  // CREATE_WISHLIST_ITEM_ERROR, To be readded when implemented properly
  EDIT_WISHLIST_ITEM_SUCCESS,
  // EDIT_WISHLIST_ITEM_ERROR,   –––––––––––––––– || –––––––––––––––––––
  CLAIM_WISHLIST_ITEM_SUCCESS,
  CLAIM_WISHLIST_ITEM_ERROR,
  UNCLAIM_WISHLIST_ITEM_SUCCESS
} = itemTypes;

const initialState = {
  wishlists: [],
  ownedWishlists: [],
  editing: false
};

const wishlistReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const {
    type,
    wishlistData,
    wishlistUid,
    index,
    itemData,
    userUid,
    // result, tobe readded when EDIT_WISHLIST_PROPERTIES_SUCCESS is implemented
    error
  } = action;
  const { ownedWishlists } = nextState;
  let item = itemData;
  switch (type) {
    case CREATE_USER_WISHLIST_ERROR:
      console.error(
        "wishlist creation error: " + error.code + "-> " + error.message
      );
      return nextState;

    case CREATE_USER_WISHLIST_SUCCESS:
      nextState.ownedWishlists.push(wishlistData);
      return nextState;

    case FETCH_OWNED_WISHLISTS_SUCCESS:
      nextState.ownedWishlists = wishlistData;
      return nextState;

    case FETCH_OWNED_WISHLISTS_ERROR:
      console.error(
        "Wishlist fetching error: " + error.code + "-> " + error.message
      );
      return nextState;

    case FETCH_WISHLISTS_SUCCESS:
      nextState.wishlists = wishlistData;
      return nextState;

    case FETCH_WISHLISTS_ERROR:
      console.error(
        "Wishlist fetching error: " + error.code + "-> " + error.message
      );
      return nextState;

    case EDIT_WISHLIST_PROPERTIES_SUCCESS:
      const wishlistIndex = ownedWishlists.findIndex(
        element => element.uid === wishlistUid
      );
      nextState.ownedWishlists[wishlistIndex] = wishlistData;
      return nextState;

    case EDIT_WISHLIST_PROPERTIES_ERROR:
      console.error(
        "Wishlist editing error: " + error.code + "-> " + error.message
      );
      return nextState;

    case CREATE_WISHLIST_ITEM_SUCCESS:
      // let item = itemData ? itemData : {};
      const wishlistIndexCreate = ownedWishlists.findIndex(
        element => element.uid === wishlistUid
      );
      nextState.ownedWishlists[wishlistIndexCreate].items.push(item);
      return nextState;

    case EDIT_WISHLIST_ITEM_SUCCESS:
      // let item = itemData ? itemData : {};
      const wishlistIndexEdit = ownedWishlists.findIndex(
        element => element.uid === wishlistUid
      );
      item = { ...ownedWishlists[wishlistIndexEdit].items[index], ...item };
      nextState.ownedWishlists[wishlistIndexEdit].items[index] = item;
      return nextState;

    case CLAIM_WISHLIST_ITEM_SUCCESS:
      // No need to push to state as we listen to the DB anyway
      return { ...nextState };

    case UNCLAIM_WISHLIST_ITEM_SUCCESS:
      // No need to pop from state as we listen to the DB anyway
      return nextState;

    case DELETE_WISHLIST_ERROR:
      console.error(
        "Wishlist deleting error: " + error.code + "-> " + error.message
      );
      return nextState;

    case TOGGLE_EDIT:
      nextState.editing = !nextState.editing;
      return nextState;

    case UPDATE_CURRENT_WISHLIST:
      const wishlist = wishlistData;
      const iO = state.ownedWishlists.findIndex(ls => ls.uid === wishlist.uid);
      const iM = state.wishlists.findIndex(ls => ls.uid === wishlist.uid);
      if (iO >= 0) {
        nextState.ownedWishlists[iO] = wishlist;
      } else if (iM >= 0) {
        nextState.wishlists[iM] = wishlist;
      } else
        console.error(
          "(REDUX) DB listener: Couldn't find local wishlist to update"
        );
      return nextState;

    case ADD_USER_TO_WISHLIST_ERROR:
      console.log(error);
      break;
    case ADD_USER_TO_WISHLIST_SUCCESS:
      const index = nextState.ownedWishlists.findIndex(
        wishlist => wishlist.uid === wishlistUid
      );
      nextState.ownedWishlists[index].members.unshift(userUid);
      break;
    case REMOVE_USER_FROM_WISHLIST_ERROR:
      console.error(
        "Remove user from wishlist error: " + error.code + "-> " + error.message
      );
      break;
    case REMOVE_USER_FROM_WISHLIST_SUCCESS:
      const wIndex = nextState.ownedWishlists.findIndex(
        wishlist => wishlist.uid === wishlistUid
      );
      const uIndex = nextState.ownedWishlists[wIndex].members.findIndex(
        uuid => uuid === userUid
      );
      nextState.ownedWishlists[wIndex].members.splice(uIndex, 1);
      break;
  }
  return nextState;
};

export default { wishlistReducer };
