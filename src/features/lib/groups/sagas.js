import { takeEvery, put } from "redux-saga/effects";
import { getUser } from "../authentication/selectors.js";
import {
  createGroupWithOwner, 
  inviteUserToGroup, 
  removeUserFromGroup, 
  fetchAllUserGroups
} from "./db.js";
import types from "./types";

function* watchFetchAllUserGroups() {
  yield takeEvery(types.FETCH_ALL_USER_GROUPS, workFetchAllUserGroups);
}

function* watchCreateGroup() {
  yield takeEvery(types.CREATE_GROUP, workCreateGroup);
}

function* watchInviteUserToGroup() {
  yield takeEvery(types.INVITE_USER_TO_GROUP, workInviteUserToGroup);
}

function* watchRemoveUserFromGroup() {
  yield takeEvery(types.INVITE_USER_TO_GROUP, workRemoveUserFromGroup);
}

function* workFetchAllUserGroups(action) {
  try {
    const {type, user} = action;
    const result = yield call(fetchAllUserGroups, user);
    yield put({type: types.FETCH_ALL_USER_GROUPS_SUCCESS, value: result});
  }catch(error) {
    yield put({type: types.FETCH_ALL_USER_GROUPS_ERROR, value: error});
  }
}

function* workCreateGroup(action) {
  try {
    const {type, user, groupName} = action;
    const result = yield call(createGroupWithOwner, user, groupName);
    yield put({type: types.CREATE_GROUP_SUCCESS, value: result});
  }catch(error) {
    yield put({type: types.CREATE_GROUP_ERROR, value: error});
  }
}

function* workInviteUserToGroup(action) {
  try {
    const {groupId, userId} = action;
    yield call(inviteUserToGroup, groupId, userId);
    yield put({type: types.INVITE_USER_TO_GROUP_SUCCESS});
  }catch(error) {
    yield put({type: types.INVITE_USER_TO_GROUP_ERROR, value: error});
  }
}

function* workRemoveUserFromGroup() {
  try {
    const {groupId, userId} = action;
    yield call(removeUserFromGroup, groupId, userId);
    yield put({type: REMOVE_USER_FROM_GROUP_SUCCESS});
  }catch(error) {
    yield put({type: REMOVE_USER_FROM_GROUP_ERROR, value: error});
  }
}

export default {
  watchFetchAllUserGroups
  watchCreateGroup
  watchInviteUserToGroup
  watchRemoveUserFromGroup
};
