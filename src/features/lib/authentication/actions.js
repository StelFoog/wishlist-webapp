import types from "./types.js";

const { AUTH_LOGOUT, AUTH_USER_FACEBOOK, AUTH_USER_GOOGLE } = types;

const authenticateFacebook = () => ({
  type: AUTH_USER_FACEBOOK
});

const authenticateGoogle = () => ({
  type: AUTH_USER_GOOGLE
});

const logout = () => ({
  type: AUTH_LOGOUT
});

export default {
  authenticateFacebook,
  authenticateGoogle,
  logout
};
