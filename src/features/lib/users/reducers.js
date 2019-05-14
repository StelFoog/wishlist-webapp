import types from "./types.js";

const { GET_USERS_WITH_UID_SUCCESS, GET_USERS_WITH_UID_ERROR } = types;

const initialState = {
  users: {}
};
const usersReducer = (state = initialState, action) => {
  let nextState = JSON.parse(JSON.stringify(state)); // Deep copy
  const { type, users } = action;

  switch (type) {
    case GET_USERS_WITH_UID_SUCCESS:
      //nextState.users = nextState.users.concat(users);
      nextState = addUsers(nextState, users);

      /*nextState.users = users.reduce(function(a, b) {
        if(a.indexOf(b.uid) == -1) {
          a.push(b.uid)
        }
      })*/
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

const addUsers = (nextState, users) => {
  users.forEach(user => nextState.users[user.uid] = user);
  return nextState;
}

export default {
  usersReducer
};
