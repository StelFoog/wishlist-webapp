import { takeEvery, put, select, call } from "redux-saga/effects";
import { getUser } from "../authentication/selectors.js";
import {
  createGroupWithOwner,
  addUserToGroup,
  removeUserFromGroup,
  fetchAllGroupsFromUser
} from "./db.js";
import types from "./types";
import { addGroupToUser, removeGroupFromUser } from "../authentication/db.js";

const {
  FETCH_ALL_USER_GROUPS,
  FETCH_ALL_USER_GROUPS_ERROR,
  FETCH_ALL_USER_GROUPS_SUCCESS,
  CREATE_GROUP,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_SUCCESS,
  INVITE_USER_TO_GROUP,
  INVITE_USER_TO_GROUP_ERROR,
  INVITE_USER_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP,
  REMOVE_USER_FROM_GROUP_ERROR,
  REMOVE_USER_FROM_GROUP_SUCCESS
} = types;

function* watchFetchAllUserGroups() {
  yield takeEvery(FETCH_ALL_USER_GROUPS, workFetchAllUserGroups);
}

function* watchCreateGroup() {
  yield takeEvery(CREATE_GROUP, workCreateGroup);
}

function* watchInviteUserToGroup() {
  yield takeEvery(INVITE_USER_TO_GROUP, workInviteUserToGroup);
}

function* watchRemoveUserFromGroup() {
  yield takeEvery(REMOVE_USER_FROM_GROUP, workRemoveUserFromGroup);
}

function* workFetchAllUserGroups() {
  try {
    const user = yield select(getUser);
    const result = yield call(fetchAllGroupsFromUser, user);
    yield put({ type: FETCH_ALL_USER_GROUPS_SUCCESS, value: result });
  } catch (error) {
    yield put({ type: FETCH_ALL_USER_GROUPS_ERROR, error: error });
  }
}

function* workCreateGroup(action) {
  try {
    const user = yield select(getUser);
    const userUid = user.uid;
    const { type, groupName } = action;
    const result = yield call(createGroupWithOwner, user, groupName);
    yield call(addGroupToUser, userUid, result);
    yield put({ type: CREATE_GROUP_SUCCESS, value: result });
  } catch (error) {
    yield put({ type: CREATE_GROUP_ERROR, error: error });
  }
}

function* workInviteUserToGroup(action) {
  try {
    const { groupId, userId } = action;
    yield call(addUserToGroup, groupId, userId);
    yield call(addGroupToUser, userId, groupId);
    yield put({ type: INVITE_USER_TO_GROUP_SUCCESS });
  } catch (error) {
    yield put({ type: INVITE_USER_TO_GROUP_ERROR, error: error });
  }
}

function* workRemoveUserFromGroup(action) {
  try {
    const { groupId, userId } = action;
    yield call(removeUserFromGroup, groupId, userId);
    yield call(removeGroupFromUser, userId, groupId);
    yield put({ type: REMOVE_USER_FROM_GROUP_SUCCESS });
  } catch (error) {
    yield put({ type: REMOVE_USER_FROM_GROUP_ERROR, error: error });
  }
}

export default {
  watchFetchAllUserGroups,
  watchCreateGroup,
  watchInviteUserToGroup,
  watchRemoveUserFromGroup
};
