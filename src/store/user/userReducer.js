import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  user: null,
  role: null,
};

const userLoadStart = (state, action) => {
  return updateObject(state, { user: null, role: null });
};

const userLoadSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    role: action.role,
  });
};

const userLoadFail = (state, action) => {
  return updateObject(state, {
    user: null,
    role: null,
  });
};

const userLogout = (state, action) => {
  return updateObject(state, {
    user: null,
    role: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOAD_START:
      return userLoadStart(state, action);
    case actionTypes.USER_LOAD_SUCCESS:
      return userLoadSuccess(state, action);
    case actionTypes.USER_LOAD_FAIL:
      return userLoadFail(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
