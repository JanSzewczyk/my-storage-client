import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  AuthActionTypes,
  AuthFailureAction,
  AuthLogoutAction,
  AuthStartAction,
  AuthState,
  AuthSuccessAction,
} from "./types";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  authLoading: false,
};

const authStart = (state: AuthState, action: AuthStartAction): AuthState => {
  return updateObject(state, { error: null, authLoading: true });
};

const authSuccess = (
  state: AuthState,
  action: AuthSuccessAction
): AuthState => {
  return updateObject(state, {
    accessToken: action.accessToken,
    refreshToken: action.refreshToken,
    error: null,
    authLoading: false,
  });
};

const authFailure = (
  state: AuthState,
  action: AuthFailureAction
): AuthState => {
  return updateObject(state, {
    error: action.error,
    authLoading: false,
  });
};

const authLogout = (state: AuthState, action: AuthLogoutAction): AuthState => {
  return updateObject(state, {
    accessToken: null,
    refreshToken: null,
  });
};

const reducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE:
      return authFailure(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
