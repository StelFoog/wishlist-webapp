import { firebase } from "../firebase";
import { _getGroupRef } from "../groups/db";

const validateLink = link => {
  return link.replace("https://", "").replace("http://", "");
};

const addGroupWishlistItem = async ({ groupID, userID, itemData }) => {
  console.log("itemData", itemData);
  itemData.websitelink = validateLink(itemData.websitelink);
  await _getGroupRef(groupID).update({
    ["wishlists." + userID]: firebase.firestore.FieldValue.arrayUnion(itemData)
  });
};
const editGroupWishlistItem = async ({ groupID, userID, itemData, index }) => {
  itemData.websitelink = validateLink(itemData.websitelink);
  let doc = await fetchGroupWishlistItems({ groupID, userID });
  doc[index] = itemData;
  await _getGroupRef(groupID).update({
    ["wishlists." + userID]: doc
  });
};

const fetchGroupWishlistItems = async ({ groupID, userID }) =>
  await _getGroupRef(groupID)
    .get()
    .then(doc => doc.data().wishlists[userID]);

const claimGroupItem = async ({ claimerID, index, groupID, ownerID }) => {
  let doc = await fetchGroupWishlistItems({ groupID, userID: ownerID });

  doc[index].claimedBy.push(claimerID);
  await _getGroupRef(groupID).update({
    ["wishlists." + ownerID]: doc
  });
};

export {
  addGroupWishlistItem,
  fetchGroupWishlistItems,
  editGroupWishlistItem,
  claimGroupItem
};
