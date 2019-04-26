import { takeEvery, call, put } from "redux-saga/effects";
import { authWithFacebookAPI, authWithGoogleAPI } from "./auth.js";
import types from "./types.js";

const {
  AUTH_USER_FACEBOOK,
  AUTH_USER_GOOGLE,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR
} = types;

function* watchUserAuthFacebook() {
  yield takeEvery(AUTH_USER_FACEBOOK, workUserAuthFacebook);
}
function* watchUserAuthGoogle() {
  yield takeEvery(AUTH_USER_GOOGLE, workUserAuthGoogle);
}

function* workUserAuthFacebook() {
  try {
    let result = yield call(authWithFacebookAPI);
    yield put({ type: AUTH_USER_SUCCESS, userData: result });
  } catch (error) {
    yield put({ type: AUTH_USER_ERROR, error: error });
  }
}

function* workUserAuthGoogle() {
  /*
  let result = undefined;

  try {
    alert("Saga preparing to access database");
    result = yield call( () => ( authWithGoogleAPI() ));
    alert("Saga extracted " + result.uid + " from database");

    yield put({type: AUTH_USER_SUCCESS, value: result});
  } catch(error) {
    result = error;
    yield put({type: AUTH_USER_ERROR, value: result});
  }
  */
}

export default { watchUserAuthFacebook, watchUserAuthGoogle };
