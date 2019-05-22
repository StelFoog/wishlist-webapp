import types from "./types";

const {
  CREATE_GROUP_WISHLIST_ITEM,
  FETCH_ALL_GROUP_ITEMS,
  EDIT_GROUP_WISHLIST_ITEM,
  CLAIM_GROUP_WISHLIST_ITEM,
  UNCLAIM_GROUP_WISHLIST_ITEM
} = types;

const createGroupWishlistItem = () => ({ type: CREATE_GROUP_WISHLIST_ITEM });

const editGroupItem = () => ({ type: EDIT_GROUP_WISHLIST_ITEM });

const fetchGroupWishlistItems = ({ groupID, userID }) => ({
  type: FETCH_ALL_GROUP_ITEMS,
  userID,
  groupID
});

const claimGroupItem = ({ index, groupID, userID }) => ({
  type: CLAIM_GROUP_WISHLIST_ITEM,
  index,
  groupID,
  userID
});

const unclaimGroupItem = ({ index, groupID, userID }) => ({
  type: UNCLAIM_GROUP_WISHLIST_ITEM,
  index,
  groupID,
  userID
});

export default {
  fetchGroupWishlistItems,
  createGroupWishlistItem,
  editGroupItem,
  claimGroupItem,
  unclaimGroupItem
};
