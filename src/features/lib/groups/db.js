import { firebase, database } from "../firebase";
import defaultGroup from "./group.js";
import { generateWishlistOrGroupUid } from "../authentication/user.js";

const _getGroupRef = uid => database.collection("Groups").doc(uid.toString());

const createGroupWithOwner = async (user, groupName) => {
  const uid = generateWishlistOrGroupUid(user);

  const group = {
    ...defaultGroup,
    ...{
      title: groupName,
      uid: uid,
      owner: user.uid,
      members: [user.uid],
      wishlists: []
    }
  };
  await _getGroupRef(uid).set(group);

  return group;
};

const addUserToGroup = async (groupId, userId) => {
  await editGroupProperties(groupId, {
    members: firebase.firestore.FieldValue.arrayUnion(userId)
  });
};

const addWishlistToGroup = async (groupId, userId) => {
  await editGroupProperties(groupId, {
    ["wishlists." + userId]: []
  });
};

const removeUserFromGroup = async (groupId, userId) => {
  await editGroupProperties(groupId, {
    members: firebase.firestore.FieldValue.arrayRemove(userId)
  });
};

const editGroupProperties = async (groupId, fields) => {
  await _getGroupRef(groupId).update(fields);
};

const fetchGroupByUid = async groupId => {
  return await _getGroupRef(groupId)
    .get()
    .then(doc => {
      if (doc.data()) return doc.data();
      else if (!doc.exists) {
        console.log("(DB) user group doesn't exist: " + groupId);
        return groupId; // Hacky, but it lets the Saga handle a deleted group
      } else return undefined; // Group not missing, but not properly loaded somehow
    });
};

const fetchAllGroupsFromUser = user => {
  return Promise.all(user.groups.map(fetchGroupByUid));
};

function onGroupChanged(uid, callback) {
  return _getGroupRef(uid).onSnapshot(doc => {
    callback(doc.data());
  });
}

export {
  _getGroupRef,
  createGroupWithOwner,
  addUserToGroup,
  removeUserFromGroup,
  editGroupProperties,
  fetchGroupByUid,
  fetchAllGroupsFromUser,
  addWishlistToGroup,
  onGroupChanged
};
