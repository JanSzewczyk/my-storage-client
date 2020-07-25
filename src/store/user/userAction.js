import axios from "../../shared/config/axios";
import { logout } from "../";
import * as actionTypes from "../actionTypes";
import { error, log } from "../../hoc/withNotificationProvider";

export const userLoadStart = () => {
  return {
    type: actionTypes.USER_LOAD_START,
  };
};

export const userLoadSuccess = (userData, role) => {
  return {
    type: actionTypes.USER_LOAD_SUCCESS,
    user: userData,
    role: role,
  };
};

export const userLoadFail = () => {
  return {
    type: actionTypes.USER_LOAD_FAIL,
  };
};

export const getUserDetails = (authData) => {
  return (dispatch) => {
    dispatch(userLoadStart());

    axios
      .get("users/details")
      .then((res) => {
        const { user, role } = res.data;

        role === "EMPLOYEE" &&
          !user.workPlace &&
          log("You have not been assigned to any storage");

        dispatch(userLoadSuccess(user, role));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(logout());
        dispatch(userLoadFail());
      });
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};
