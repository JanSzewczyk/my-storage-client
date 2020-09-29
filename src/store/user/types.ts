import { UserRole } from "../../shared/constants";
import User from "../../shared/types/user/User";
import * as actionTypes from "../actionTypes";

export interface UserState {
  user: User | null;
  role: UserRole | null;
}

export interface UserLoadStartAction {
  type: typeof actionTypes.USER_LOAD_START;
}

export interface UserLoadSuccessAction {
  type: typeof actionTypes.USER_LOAD_SUCCESS;
  user: User;
  role: UserRole;
}

export interface UserLoadFailureAction {
  type: typeof actionTypes.USER_LOAD_FAILURE;
}

export interface UserLogoutAction {
  type: typeof actionTypes.USER_LOGOUT;
}

export type UserActionTypes =
  | UserLoadStartAction
  | UserLoadSuccessAction
  | UserLoadFailureAction
  | UserLogoutAction;
