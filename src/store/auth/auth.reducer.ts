import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  AuthActionTypes,
  AuthFailureAction,
  AuthLogoutAction,
  AuthStartAction,
  AuthStoreState,
  AuthSuccessAction,
} from "./types";

export const initialState: AuthStoreState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  authLoading: false,
};

const authStart = (
  state: AuthStoreState,
  action: AuthStartAction
): AuthStoreState => {
  return updateObject(state, { error: null, authLoading: true });
};

const authSuccess = (
  state: AuthStoreState,
  action: AuthSuccessAction
): AuthStoreState => {
  return updateObject(state, {
    accessToken: action.accessToken,
    refreshToken: action.refreshToken,
    error: null,
    authLoading: false,
  });
};

const authFailure = (
  state: AuthStoreState,
  action: AuthFailureAction
): AuthStoreState => {
  return updateObject(state, {
    error: action.error,
    authLoading: false,
  });
};

const authLogout = (
  state: AuthStoreState,
  action: AuthLogoutAction
): AuthStoreState => {
  return initialState;
};

const reducer = (
  state = initialState,
  action: AuthActionTypes
): AuthStoreState => {
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
