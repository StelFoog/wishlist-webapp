import types from "./types.js";
const { GET_USERS_WITH_UIDS, CACHE_USER } = types;

const getUsersWithUids = uids => ({
  type: GET_USERS_WITH_UIDS,
  uids
});

const cacheUser = (uid, value) => ({
  type: CACHE_USER,
  uid: uid,
  value: value
});

const getUsersWithUid = getUsersWithUids;

export default { cacheUser, getUsersWithUid, getUsersWithUids  };
