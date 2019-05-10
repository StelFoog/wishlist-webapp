import types from "./types";

// const {
//   FETCH_ALL_USER_GROUPS_ERROR,
//   FETCH_ALL_USER_GROUPS_SUCCESS,
//   CREATE_GROUP_ERROR,
//   CREATE_GROUP_SUCCESS,
//   INVITE_USER_TO_GROUP_ERROR,
//   INVITE_USER_TO_GROUP_SUCCESS,
//   REMOVE_USER_FROM_GROUP_ERROR,
//   REMOVE_USER_FROM_GROUP_SUCCESS
// } = types;

const initialState = {
  groups: []
};

const groupReducer = (state = initialState, action) => {
  const { type, value, error } = action;
  let nextState = state;

  const groupData = action.value;
  switch (type) {
    case types.CREATE_GROUP_SUCCESS:
      nextState.groups.push(groupData);

      break;
    case types.CREATE_GROUP_ERROR:
      console.error(
        "CREATE_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      break;

    case types.FETCH_ALL_USER_GROUPS_SUCCESS:
      break;
    case types.FETCH_ALL_USER_GROUPS_ERROR:
      console.error(
        "FETCH_ALL_USER_GROUPS_ERROR: " + error.code + "-> " + error.message
      );
      break;

    case types.INVITE_USER_TO_GROUP_SUCCESS:
      break;
    case types.INVITE_USER_TO_GROUP_ERROR:
      console.error(
        "INVITE_USER_TO_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      break;

    case types.REMOVE_USER_FROM_GROUP_SUCCESS:
      break;
    case types.REMOVE_USER_FROM_GROUP_ERROR:
      console.error(
        "REMOVE_USER_FROM_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      break;
    default:
  }
  return { ...nextState };
};

export default {
  groupReducer
};
