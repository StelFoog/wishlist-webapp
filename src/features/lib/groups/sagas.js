import { takeLeading, put, select, call, all } from "redux-saga/effects";
import { getUser } from "../authentication/selectors.js";
import { getDialogValues } from "../../components/dialog/selectors";
import {
  createGroupWithOwner,
  addUserToGroup,
  removeUserFromGroup,
  fetchAllGroupsFromUser,
  addWishlistToGroup,
  editGroupProperties,
  deleteGroupByUid
} from "./db.js";
import groupTypes from "./types";
import { types as chatTypes } from "../chat";
import { types as authTypes } from "../authentication";
import { types as dialogTypes } from "../../components/dialog";
import { addGroupToUser, removeGroupFromUser } from "../authentication/db.js";
import { replace, push } from "connected-react-router";

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
  REMOVE_USER_FROM_GROUP_SUCCESS,
  EDIT_GROUP_PROPERTIES,
  EDIT_GROUP_PROPERTIES_ERROR,
  EDIT_GROUP_PROPERTIES_SUCCESS,

  LEAVE_GROUP,
  LEAVE_GROUP_ERROR,
  LEAVE_GROUP_SUCCESS,

  DELETE_GROUP,
  DELETE_GROUP_ERROR,
  DELETE_GROUP_SUCCESS
} = groupTypes;

const { CREATE_CHAT, DELETE_CHAT } = chatTypes;

const { ADD_GROUP_ID_TO_USER, REMOVE_GROUP_ID_FROM_USER } = authTypes;

const { CLOSE_DIALOG } = dialogTypes;

function* watchFetchAllUserGroups() {
  yield takeLeading(FETCH_ALL_USER_GROUPS, workFetchAllUserGroups);
}

function* watchCreateGroup() {
  yield takeLeading(CREATE_GROUP, workCreateGroup);
}

function* watchInviteUserToGroup() {
  yield takeLeading(INVITE_USER_TO_GROUP, workInviteUserToGroup);
}

function* watchRemoveUserFromGroup() {
  yield takeLeading(REMOVE_USER_FROM_GROUP, workRemoveUserFromGroup);
}

function* watchEditGroupProperites() {
  yield takeLeading(EDIT_GROUP_PROPERTIES, workEditGroupProperties);
}

function* watchLeaveGroup() {
  yield takeLeading(LEAVE_GROUP, workLeaveGroup);
}

function* watchDeleteGroup() {
  yield takeLeading(DELETE_GROUP, workDeleteGroup);
}

function* workFetchAllUserGroups() {
  try {
    const user = yield select(getUser);
    let result = yield call(fetchAllGroupsFromUser, user);

    // Remove reference to deleted groups in db and user state
    for (let i = 0; i < result.length; i++) {
      let group = result[i];
      if (typeof group === "string") {
        console.log("deleting group reference: " + group);
        yield call(removeGroupFromUser, user.uid, group);
        yield put({
          type: REMOVE_GROUP_ID_FROM_USER,
          groupId: group
        });
      }
    }

    // Don't send invalid groups to state
    result = result.filter(function(group) {
      return typeof group !== "string" && group !== undefined;
    });

    yield put({ type: FETCH_ALL_USER_GROUPS_SUCCESS, value: result });
  } catch (error) {
    yield put({ type: FETCH_ALL_USER_GROUPS_ERROR, error: error });
  }
}

function* workCreateGroup(action) {
  try {
    const user = yield select(getUser);
    const userUid = user.uid;
    const { groupName } = action;
    const result = yield call(createGroupWithOwner, user, groupName);
    const groupId = result.uid;
    yield all([
      call(addGroupToUser, userUid, groupId),
      call(addWishlistToGroup, groupId, userUid),
      put({ type: CREATE_CHAT, id: groupId })
    ]);

    yield put({ type: ADD_GROUP_ID_TO_USER, groupId });
    yield put({ type: CREATE_GROUP_SUCCESS, value: result });
    yield put({ type: CLOSE_DIALOG });
    yield put(push(`/dashboard/group/${groupId}/${userUid}`));
  } catch (error) {
    yield put({ type: CREATE_GROUP_ERROR, error: error });
  }
}

function* workInviteUserToGroup(action) {
  try {
    const { userId, maybeGroupId } = action;
    const { uid } = yield select(getDialogValues);
    const groupId = maybeGroupId || uid;

    yield call(addUserToGroup, groupId, userId);
    yield call(addWishlistToGroup, groupId, userId);
    yield call(addGroupToUser, userId, groupId);
    yield put({ type: CLOSE_DIALOG });
    yield put({ type: INVITE_USER_TO_GROUP_SUCCESS, userId, groupId });
  } catch (error) {
    yield put({ type: INVITE_USER_TO_GROUP_ERROR, error: error });
  }
}

function* workRemoveUserFromGroup({ groupID, userID }) {
  try {
    yield call(removeUserFromGroup, groupID, userID);
    yield call(removeGroupFromUser, userID, groupID);
    yield put({
      type: REMOVE_USER_FROM_GROUP_SUCCESS,
      userId: userID,
      groupId: groupID
    });
  } catch (error) {
    yield put({ type: REMOVE_USER_FROM_GROUP_ERROR, error: error });
  }
}

function* workEditGroupProperties({ uid, field, data }) {
  try {
    const fields = {
      [field]: data
    };
    yield call(editGroupProperties, uid, fields);
    yield put({
      type: EDIT_GROUP_PROPERTIES_SUCCESS,
      groupId: uid,
      field,
      value: data
    });
  } catch (error) {
    yield put({ type: EDIT_GROUP_PROPERTIES_ERROR, error: error });
  }
}

function* workLeaveGroup({ groupID, userID }) {
  try {
    yield call(workRemoveUserFromGroup, { groupID, userID });
    yield put(push(`/dashboard/`));
    yield put({ type: REMOVE_GROUP_ID_FROM_USER, groupId: groupID });
    yield put({ type: LEAVE_GROUP_SUCCESS, userId: userID, groupId: groupID });
  } catch (error) {
    yield put({ type: LEAVE_GROUP_ERROR, error: error });
  }
}

function* workDeleteGroup({ groupID, userID }) {
  try {
    yield call(deleteGroupByUid, { groupID });
    yield put(push(`/dashboard/`));
    yield put({ type: REMOVE_GROUP_ID_FROM_USER, groupId: groupID });
    yield put({ type: DELETE_CHAT, groupID });
    yield put({ type: LEAVE_GROUP_SUCCESS, userId: userID, groupId: groupID });
  } catch (error) {
    yield put({ type: LEAVE_GROUP_ERROR, error: error });
  }
}

export default {
  watchFetchAllUserGroups,
  watchCreateGroup,
  watchInviteUserToGroup,
  watchRemoveUserFromGroup,
  watchEditGroupProperites,
  watchLeaveGroup,
  watchDeleteGroup
};
