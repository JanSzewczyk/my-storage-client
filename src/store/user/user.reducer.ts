import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  UserActionTypes,
  UserLoadFailureAction,
  UserLoadStartAction,
  UserLoadSuccessAction,
  UserLogoutAction,
  UserStoreState,
} from "./types";

export const initialState: UserStoreState = {
  user: null,
  role: null,
};

const userLoadStart = (
  state: UserStoreState,
  action: UserLoadStartAction
): UserStoreState => {
  return updateObject(state, { user: null, role: null });
};

const userLoadSuccess = (
  state: UserStoreState,
  action: UserLoadSuccessAction
): UserStoreState => {
  return updateObject(state, {
    user: action.user,
    role: action.role,
  });
};

const userLoadFailure = (
  state: UserStoreState,
  action: UserLoadFailureAction
): UserStoreState => {
  return updateObject(state, {
    user: null,
    role: null,
  });
};

const userLogout = (
  state: UserStoreState,
  action: UserLogoutAction
): UserStoreState => {
  return updateObject(state, {
    user: null,
    role: null,
  });
};

const reducer = (
  state = initialState,
  action: UserActionTypes
): UserStoreState => {
  switch (action.type) {
    case actionTypes.USER_LOAD_START:
      return userLoadStart(state, action);
    case actionTypes.USER_LOAD_SUCCESS:
      return userLoadSuccess(state, action);
    case actionTypes.USER_LOAD_FAILURE:
      return userLoadFailure(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
