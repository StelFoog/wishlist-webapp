import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./features/lib/authentication/";

function* rootSaga() {
  yield all([
    authSagas.watchUserAuthFacebook()
    //authSagas.watchUserAuthGoogle()
  ]);
}

export default rootSaga;
