import types from "./types.js";

const { GET_USERS_WITH_UIDS_SUCCESS, GET_USERS_WITH_UIDS_ERROR } = types;

const initialState = {
  users: {}
};
const usersReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, users, error } = action;

  switch (type) {
    case GET_USERS_WITH_UIDS_SUCCESS:
      users.forEach(user => (nextState.users[user.uid] = user));
      break;
    case GET_USERS_WITH_UIDS_ERROR:
      console.log(error);
      break;
  }
  return nextState;
};

export default {
  usersReducer
};
