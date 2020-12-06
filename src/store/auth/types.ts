import * as actionTypes from "../actionTypes";

export interface AuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  authLoading: false;
}

export interface AuthStartAction {
  type: typeof actionTypes.AUTH_START;
}

export interface AuthSuccessAction {
  type: typeof actionTypes.AUTH_SUCCESS;
  accessToken: string;
  refreshToken: string;
}

export interface AuthFailureAction {
  type: typeof actionTypes.AUTH_FAILURE;
  error: string | null;
}

export interface AuthLogoutAction {
  type: typeof actionTypes.AUTH_LOGOUT;
}

export type AuthActionTypes =
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailureAction
  | AuthLogoutAction;
