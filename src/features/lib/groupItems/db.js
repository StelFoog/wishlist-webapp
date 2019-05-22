import { firebase } from "../firebase";
import { _getGroupRef } from "../groups/db";

const validateLink = (link) => {
  return !link ? "" : link.replace("https://", "")
             .replace("http://", "");
}

const addGroupWishlistItem = async ({ groupID, userID, itemData }) => {
  itemData.weblink = validateLink(itemData.weblink);
  await _getGroupRef(groupID).update({
    ["wishlists." + userID]: firebase.firestore.FieldValue.arrayUnion(itemData)
  });
};
const editGroupWishlistItem = async ({ groupID, userID, itemData, index }) => {
  itemData.weblink = validateLink(itemData.weblink);
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
