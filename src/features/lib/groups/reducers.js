import types from "./types";

const {
  FETCH_ALL_USER_GROUPS_ERROR,
  FETCH_ALL_USER_GROUPS_SUCCESS,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_SUCCESS,
  INVITE_USER_TO_GROUP_ERROR,
  INVITE_USER_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP_SUCCESS
} = types;

const initialState = {
  groups: []
};

const groupReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, error, value, groupId, userId } = action;

  switch (type) {
    case CREATE_GROUP_SUCCESS:
      nextState.groups.push(value);
      break;
    case CREATE_GROUP_ERROR:
      console.error(
        "CREATE_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      break;

    case FETCH_ALL_USER_GROUPS_SUCCESS:
      nextState.groups = value;
      break;
    case FETCH_ALL_USER_GROUPS_ERROR:
      console.error(
        "FETCH_ALL_USER_GROUPS_ERROR: " + error.code + "-> " + error.message
      );
      break;

    case INVITE_USER_TO_GROUP_SUCCESS:
      const inviteUserIndex = nextState.groups.findIndex(
        group => group.uid === groupId
      );
      nextState.groups[inviteUserIndex].members.push(userId);
      break;
    case INVITE_USER_TO_GROUP_ERROR:
      console.error(
        "INVITE_USER_TO_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      break;

    case REMOVE_USER_FROM_GROUP_SUCCESS:
      break;
    case REMOVE_USER_FROM_GROUP_ERROR:
      console.error(
        "REMOVE_USER_FROM_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      break;
    default:
  }
  return nextState;
};

export default {
  groupReducer
};
