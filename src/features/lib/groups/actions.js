import types from "./types";

const fetchAllUserGroups = user => ({
  type: types.FETCH_ALL_USER_GROUPS,
  user: user
});

const createGroup = (user, groupName) => ({
  type: types.CREATE_GROUP,
  user: user,
  groupName: groupName
});

const addUserToGroup = (groupId, userId) => ({
  type: types.ADD_USER_TO_GROUP,
  groupId: groupId,
  userId: userId
});

const removeUserFromGroup = (groupId, userId) => ({
  type: types.REMOVE_USER_FROM_GROUP;
});

export default {
  fetchAllUserGroups,
  createGroup,
  addUserToGroup,
  removeUserFromGroup
};
