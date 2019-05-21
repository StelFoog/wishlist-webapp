import { takeLeading, takeEvery, call, put, select } from "redux-saga/effects";
import types from "./types.js";
import {
  createNewChat,
  sendChatMessage,
  loadChatMessages,
  deleteChatFromDB
} from "./db";
import { getUser } from "../authentication/selectors";

const {
  CREATE_CHAT,
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  LOAD_CHAT,
  LOAD_CHAT_ERROR,
  LOAD_CHAT_SUCCESS,
  SEND_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE_ERROR,
  SEND_CHAT_MESSAGE_SUCCESS,
  DELETE_CHAT,
  DELETE_CHAT_ERROR,
  DELETE_CHAT_SUCCESS
} = types;

function* watchCreateChat() {
  yield takeLeading(CREATE_CHAT, workCreateChat);
}

function* watchLoadChat() {
  yield takeLeading(LOAD_CHAT, workLoadChat);
}

function* watchSendChatMessage() {
  yield takeEvery(SEND_CHAT_MESSAGE, workSendChatMessage);
}

function* watchDeleteChat() {
  yield takeLeading(DELETE_CHAT, workDeleteChat);
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
  } catch (error) {
    yield put({ type: LOAD_CHAT_ERROR, error: error });
  }
}

function* workSendChatMessage(action) {
  const { id, message } = action;
  const userValues = yield select(getUser);
  try {
    const result = yield call(sendChatMessage, id, userValues, message);
    yield put({ type: SEND_CHAT_MESSAGE_SUCCESS, messages: result });
  } catch (error) {
    yield put({ type: SEND_CHAT_MESSAGE_ERROR, error: error });
  }
}

function* workDeleteChat({ uid }) {
  try {
    yield call(deleteChatFromDB, uid);
    yield put({ type: DELETE_CHAT_SUCCESS });
  } catch (error) {
    yield put({ type: DELETE_CHAT_ERROR, error: error });
  }
}

export default {
  watchCreateChat,
  watchLoadChat,
  watchSendChatMessage,
  watchDeleteChat
};
