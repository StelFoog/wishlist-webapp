import types from "./types.js";
const { GET_USERS_WITH_UID } = types;

const getUsersWithUid = uid => ({
  type: GET_USERS_WITH_UID,
  uid
});

export default { getUsersWithUid };
