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
      members: [user.uid]
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

const removeUserFromGroup = async (groupId, userId) => {
  await editGroupProperties(groupId, {
    members: firebase.firestore.FieldValue.arrayRemove(userId)
  });
};

const editGroupProperties = async (groupId, fields) => {
  await _getGroupRef(groupId).update(fields);
};

const fetchGroupByUid = groupId => {
  return _getGroupRef(groupId)
    .get()
    .then();
};

const fetchAllGroupsFromUser = user => {
  return Promise.all(user.groups.map(fetchGroupByUid));
};

export {
  createGroupWithOwner,
  addUserToGroup,
  removeUserFromGroup,
  editGroupProperties,
  fetchGroupByUid,
  fetchAllGroupsFromUser
};
