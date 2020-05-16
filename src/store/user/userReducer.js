import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  user: null,
  role: null,
};

const userStart = (state, action) => {
  return updateObject(state, { user: null, role: null });
};

const userSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    role: action.role,
  });
};

const userFail = (state, action) => {
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
    case actionTypes.USER_START:
      return userStart(state, action);
    case actionTypes.USER_SUCCESS:
      return userSuccess(state, action);
    case actionTypes.USER_FAIL:
      return userFail(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
