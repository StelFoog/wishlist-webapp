import { takeEvery, call, put, select, all } from "redux-saga/effects";
import { getUser } from "../authentication/db";
import types from "./types";
import { selectUserCache } from "./selectors.js";

const {
  GET_USERS_WITH_UIDS,
  GET_USERS_WITH_UIDS_ERROR,
  GET_USERS_WITH_UIDS_SUCCESS
} = types;

function* watchGetUsersWithUids() {
  yield takeEvery(GET_USERS_WITH_UIDS, workGetUsersWithUids);
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

export default {
  watchGetUsersWithUids
};
