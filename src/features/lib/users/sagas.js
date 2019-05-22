import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getUser } from "../authentication/db";
import types from "./types";
import { selectUserCache } from "./selectors.js";

const {
  GET_USERS_WITH_UIDS,
  GET_USERS_WITH_UIDS_ERROR,
  GET_USERS_WITH_UIDS_SUCCESS,
  CACHE_USER_ERROR,
  CACHE_USER_SUCCESS,
  CACHE_USER
} = types;

function* watchGetUsersWithUids() {
  yield takeEvery(GET_USERS_WITH_UIDS, workGetUsersWithUids);
}

function* watchCacheUser() {
  yield takeEvery(CACHE_USER, workCacheUser);
}

function* workGetUsersWithUids(action) {
  try {
    const userCache = yield select(selectUserCache);
    const { uids } = action;
    let users = [];
    for(let uidi = 0; uidi < uids.length; ++uidi) {
      if(!userCache[uids[uidi]])
        users.push(yield call(getUser, uids[uidi]));
    }
    
    yield put({ type: GET_USERS_WITH_UIDS_SUCCESS, users: users });
  } catch (error) {
    yield put({ type: GET_USERS_WITH_UIDS_ERROR, error: error });
  }
}

function* workCacheUser(action) {
  try {
    const userCache = yield select(selectUserCache);
    const { uid, value } = action;
    userCache[uid] = value;
    yield put({ type: CACHE_USER_SUCCESS, users: userCache });
  } catch (error) {
    yield put({ type: CACHE_USER_ERROR, error: error });
  }
}

export default {
  watchGetUsersWithUids,
  watchCacheUser
};
