import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  UserActionTypes,
  UserLoadFailureAction,
  UserLoadStartAction,
  UserLoadSuccessAction,
  UserLogoutAction,
  UserState,
} from "./types";

const initialState: UserState = {
  user: null,
  role: null,
};

const userLoadStart = (
  state: UserState,
  action: UserLoadStartAction
): UserState => {
  return updateObject(state, { user: null, role: null });
};

const userLoadSuccess = (
  state: UserState,
  action: UserLoadSuccessAction
): UserState => {
  return updateObject(state, {
    user: action.user,
    role: action.role,
  });
};

const userLoadFailure = (
  state: UserState,
  action: UserLoadFailureAction
): UserState => {
  return updateObject(state, {
    user: null,
    role: null,
  });
};

const userLogout = (state: UserState, action: UserLogoutAction): UserState => {
  return updateObject(state, {
    user: null,
    role: null,
  });
};

const reducer = (state = initialState, action: UserActionTypes): UserState => {
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
