import { takeEvery, call, put, all } from "redux-saga/effects";
import { getUser } from "../authentication/db";
import types from "./types";

const {
  GET_USERS_WITH_UID,
  GET_USERS_WITH_UID_ERROR,
  GET_USERS_WITH_UID_SUCCESS
} = types;

function* watchGetUserWithUid() {
  yield takeEvery(GET_USERS_WITH_UID, workGetUserWithUid);
}

function* workGetUserWithUid(action) {
  try {
    const { uid } = action;
    const users = yield all(uid.map(x => call(getUser, x)));
    yield put({ type: GET_USERS_WITH_UID_SUCCESS, users: users });
  } catch (error) {
    yield put({ type: GET_USERS_WITH_UID_ERROR, error: error });
  }
}

export default {
  watchGetUserWithUid
};
