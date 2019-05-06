import { takeEvery, call, put, select, all } from "redux-saga/effects";
import types from "./types.js";
import { createNewChat, sendChatMessage, loadChatMessages } from "./db";

const {
  CREATE_CHAT,
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  LOAD_CHAT,
  LOAD_CHAT_ERROR,
  LOAD_CHAT_SUCCESS,
  SEND_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE_ERROR,
  SEND_CHAT_MESSAGE_SUCCESS
} = types;

function* watchCreateChat() {
  yield takeEvery(CREATE_CHAT, workCreateChat);
}

function* watchLoadChat() {
  yield takeEvery(LOAD_CHAT, workLoadChat);
}

function* watchSendChatMessage() {
  yield takeEvery(SEND_CHAT_MESSAGE, workSendChatMessage);
}


function* workCreateChat(action) {
  const { id } = action;
  try {
    yield call(createNewChat, id);
    yield put({ type: CREATE_CHAT_SUCCESS, value: "" });
  } catch (error) {
    yield put({ type: CREATE_CHAT_ERROR, error: error });
  }
}

function* workLoadChat(action) {
  const { id } = action;
  try {
    const result = yield call(loadChatMessages, id);
    yield put({ type: LOAD_CHAT_SUCCESS, messages: result });
    console.log("JAG ÄR FISK: " + result);
  } catch (error) {
    yield put({ type: LOAD_CHAT_ERROR, error: error });
  }
}

function* workSendChatMessage(action) {
  const { id, user, message } = action;
  try {
    yield call(sendChatMessage, id, user, message);
    yield put({ type: SEND_CHAT_MESSAGE_SUCCESS, value: "" });
  } catch (error) {
    yield put({ type: SEND_CHAT_MESSAGE_ERROR, error: error });
  }
}

export default {
  watchCreateChat,
  watchLoadChat,
  watchSendChatMessage
};
