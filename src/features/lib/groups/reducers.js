import types from "./types";

const {
  FETCH_ALL_USER_GROUPS_ERROR,
  FETCH_ALL_USER_GROUPS_SUCCESS,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_SUCCESS,
  INVITE_USER_TO_GROUP_ERROR,
  INVITE_USER_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  UPDATE_CURRENT_GROUP,

  EDIT_GROUP_PROPERTIES_ERROR,
  EDIT_GROUP_PROPERTIES_SUCCESS,

  LEAVE_GROUP_ERROR,
  LEAVE_GROUP_SUCCESS,

  DELETE_GROUP_ERROR,
  DELETE_GROUP_SUCCESS
} = types;

const initialState = {
  groups: []
};

const groupReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, error, value, groupId, userId, group, field } = action;

  switch (type) {
    case CREATE_GROUP_SUCCESS:
      // This is a bit convulted because sometimes the DB listener would manage
      // to get the next list first, which would cause the item to be added twice
      const i = state.groups.findIndex(locGroup => locGroup.uid === value.uid);
      if (i === -1)
        return { ...nextState, groups: nextState.groups.concat(value) };
      else return nextState;

    case CREATE_GROUP_ERROR:
      console.error(
        "CREATE_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      return nextState;

    case FETCH_ALL_USER_GROUPS_SUCCESS:
      return { ...nextState, groups: value };
    case FETCH_ALL_USER_GROUPS_ERROR:
      console.error(
        "FETCH_ALL_USER_GROUPS_ERROR: " + error.code + "-> " + error.message
      );
      return nextState;

    case INVITE_USER_TO_GROUP_SUCCESS:
      // DB listener handles state update
      return nextState;
    case INVITE_USER_TO_GROUP_ERROR:
      console.error(
        "INVITE_USER_TO_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      return nextState;

    case REMOVE_USER_FROM_GROUP_SUCCESS:
      // DB listener handles state update
      return nextState;

    case REMOVE_USER_FROM_GROUP_ERROR:
      console.error(
        "REMOVE_USER_FROM_GROUP_ERROR: " + error.code + "-> " + error.message
      );
      return nextState;

    case UPDATE_CURRENT_GROUP:
      if (group !== undefined) {
        const i = state.groups.findIndex(
          locGroup => locGroup.uid === group.uid
        );
        if (i >= 0) {
          nextState.groups[i] = group;
        } else
          console.error(
            "(REDUX) DB listener: Couldn't find local group to update"
          );
      }
      return nextState;

    case EDIT_GROUP_PROPERTIES_SUCCESS:
      // DB listener handles state update
      return nextState;

    case EDIT_GROUP_PROPERTIES_ERROR:
      console.error(
        "EDIT_GROUP_PROPERTIES_ERROR: " + error.code + "-> " + error.message
      );
      return nextState;

    case LEAVE_GROUP_SUCCESS:
      return {
        ...nextState,
        groups: nextState.groups.filter(group => !(group.uid === groupId))
      };

    case LEAVE_GROUP_ERROR:
      console.error("LEAVE_GROUP_ERROR: " + error.code + "-> " + error.message);
      return nextState;

    case DELETE_GROUP_ERROR:
      console.log("DELETE_GROUP_ERROR: " + error.code + "-> " + error.message);
      return nextState;

    default:
      return nextState;
  }
};

export default {
  groupReducer
};
