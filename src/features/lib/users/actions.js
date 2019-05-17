import types from "./types.js";
const { GET_USERS_WITH_UIDS } = types;

const getUsersWithUids = uids => ({
  type: GET_USERS_WITH_UIDS,
  uids
});

export default { getUsersWithUids  };
