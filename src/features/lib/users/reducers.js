import types from "./types.js";

const { GET_USERS_WITH_UID_SUCCESS } = types;

const initialState = {
  users: []
};
const usersReducer = (state = initialState, action) => {
  const { type, users } = action;
  let nextState = state;
  switch (type) {
    case GET_USERS_WITH_UID_SUCCESS:
      nextState.users = users;
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default usersReducer;
