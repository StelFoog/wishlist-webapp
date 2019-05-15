import types from "./types";

const {
  FETCH_ALL_USER_GROUPS,
  CREATE_GROUP,
  INVITE_USER_TO_GROUP,
  REMOVE_USER_FROM_GROUP
} = types;

const fetchAllUserGroups = () => ({
  type: FETCH_ALL_USER_GROUPS
});

const createGroup = groupName => ({
  type: CREATE_GROUP,
  groupName: groupName
});

const addUserToGroup = userId => ({
  type: INVITE_USER_TO_GROUP,
  userId: userId
});

const removeUserFromGroup = (groupId, userId) => ({
  type: REMOVE_USER_FROM_GROUP
});

export default {
  fetchAllUserGroups,
  createGroup,
  addUserToGroup,
  removeUserFromGroup
};
