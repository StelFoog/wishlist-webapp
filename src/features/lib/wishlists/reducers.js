import types from "./types.js";
import itemTypes from "../wishlistItems/types";

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
  TOGGLE_EDIT
} = types;

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
      console.log(wishlistData);
      nextState.ownedWishlists = wishlistData;
      console.log("Fetched owned wishlists!" + wishlistData);
      return nextState;

    case FETCH_OWNED_WISHLISTS_ERROR:
      console.error(
        "Wishlist fetching error: " + error.code + "-> " + error.message
      );
      return nextState;

    case FETCH_WISHLISTS_SUCCESS:
      nextState.wishlists = wishlistData;
      console.log("Fetched wishlists!" + wishlistData);
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

      console.log("Edited Wishlist!");
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
      const wishlistClaimIndex = nextState.wishlists.findIndex(function (
        element
      ) {
        return element.uid === wishlistUid;
      });
      nextState.wishlists[wishlistClaimIndex].items[index].claimedBy.push(
        userUid
      );
      return { ...nextState };

    case UNCLAIM_WISHLIST_ITEM_SUCCESS:
      console.log(nextState);
      const wishlistUnclaimIndex = nextState.wishlists.findIndex(function (
        element
      ) {
        return element.uid === wishlistUid;
      });
      console.log(wishlistUid);
      const claimedBy = nextState.wishlists[wishlistUnclaimIndex].items[index].claimedBy;
      for (let i = 0; i < claimedBy.length; i++) {
        if (claimedBy[i] === userUid) {
          claimedBy.splice(i, 1);
          break;
        }
      }
      nextState.wishlists[wishlistUnclaimIndex].items[index].claimedBy = claimedBy;
      return nextState;

    case DELETE_WISHLIST_SUCCESS:
      const wishlistIndexDelete = ownedWishlists.findIndex(
        element => element.uid === wishlistUid
      );
      nextState.ownedWishlists.splice(wishlistIndexDelete, 1);
      return nextState;

    case DELETE_WISHLIST_ERROR:
      console.error(
        "Wishlist deleting error: " + error.code + "-> " + error.message
      );
      return nextState;

    case TOGGLE_EDIT:
      nextState.editing = !nextState.editing;
      return nextState;

    default:
      return nextState;
  }
};

export default { wishlistReducer };
