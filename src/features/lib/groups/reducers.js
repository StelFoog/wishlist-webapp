import types from "./types";

const groupReducer = (state, action) => {
  const {type, value} = action;
  let nextState = {...state};

  switch(type) {
    case types.CREATE_GROUP:
      break;
    case types.CREATE_GROUP_SUCCESS:
      break;
    case types.CREATE_GROUP_ERROR:
      break;
    case types.FETCH_ALL_USER_GROUPS:
      break;
    case types.FETCH_ALL_USER_GROUPS_SUCCESS:
      break;
    case types.FETCH_ALL_USER_GROUPS_ERROR:
      break;
    case types.INVITE_USER_TO_GROUP:
      break;
    case types.INVITE_USER_TO_GROUP_SUCCESS:
      break;
    case types.INVITE_USER_TO_GROUP_ERROR:
      break;
    case types.REMOVE_USER_FROM_GROUP:
      break;
    case types.REMOVE_USER_FROM_GROUP_SUCCESS:
      break;
    case types.REMOVE_USER_FROM_GROUP_ERROR:
      break;
  }
  return nextState;
}

export default {
  groupReducer
};
