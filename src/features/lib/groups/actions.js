import types from "./types";

const {
  FETCH_ALL_USER_GROUPS,
  CREATE_GROUP,
  INVITE_USER_TO_GROUP,
  REMOVE_USER_FROM_GROUP,
  UPDATE_CURRENT_GROUP,
  EDIT_GROUP_PROPERTIES,
  LEAVE_GROUP,
  DELETE_GROUP
} = types;

const fetchAllUserGroups = () => ({
  type: FETCH_ALL_USER_GROUPS
});

const createGroup = groupName => ({
  type: CREATE_GROUP,
  groupName: groupName
});

const addUserToGroup = (userId, maybeGroupId) => ({
  type: INVITE_USER_TO_GROUP,
  userId: userId,
  maybeGroupId: maybeGroupId
});

const removeUserFromGroup = (groupID, userID) => ({
  type: REMOVE_USER_FROM_GROUP,
  groupID,
  userID
});

const editGroupProperties = (uid, field, data) => ({
  type: EDIT_GROUP_PROPERTIES,
  uid,
  field,
  data
});

const leaveGroup = (groupID, userID) => ({
  type: LEAVE_GROUP,
  groupID,
  userID
});

const deleteGroup = (groupID, userID) => ({
  type: DELETE_GROUP,
  groupID,
  userID
});

const updateCurrentGroup = group => ({
  // Used by listener
  type: UPDATE_CURRENT_GROUP,
  group: group
});

export default {
  fetchAllUserGroups,
  createGroup,
  addUserToGroup,
  removeUserFromGroup,
  updateCurrentGroup,
  editGroupProperties,
  leaveGroup,
  deleteGroup
};
