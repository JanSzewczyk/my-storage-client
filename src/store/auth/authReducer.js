import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  authLoading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, authLoading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    accessToken: action.accessToken,
    refreshToken: action.refreshToken,
    error: null,
    authLoading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    authLoading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    accessToken: null,
    refreshToken: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
