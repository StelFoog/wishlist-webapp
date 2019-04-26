import types from "./types.js";

const { AUTH_USER_ERROR, AUTH_USER_SUCCESS, AUTH_LOGOUT } = types;

const initialState = {
  user: null,
  loggedIn: false
};

const userReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, userData, error } = action;

  switch (type) {
    case AUTH_USER_ERROR:
      console.error(
        "authentication error: " + error.code + "-> " + error.message
      );
      return { ...nextState };
    case AUTH_USER_SUCCESS:
      nextState.loggedIn = true;
      nextState.user = userData;
      console.log("Logged in!" + userData);
      return { ...nextState };
    case AUTH_LOGOUT:
      nextState.loggedIn = false;
      nextState.user = null;
      alert("logged out successfully");
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default { userReducer };
