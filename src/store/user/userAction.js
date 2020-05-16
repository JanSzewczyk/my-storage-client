import axios from "../../shared/axios";
import { logout } from "../";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";

export const userStart = () => {
  return {
    type: actionTypes.USER_START,
  };
};

export const userSuccess = (userData, role) => {
  return {
    type: actionTypes.USER_SUCCESS,
    user: userData,
    role: role,
  };
};

export const userFail = () => {
  return {
    type: actionTypes.USER_FAIL,
  };
};

export const getUserDetails = (authData) => {
  return (dispatch) => {
    dispatch(userStart());

    axios
      .get("users/details")
      .then((res) => {
        const { user, role } = res.data;
        dispatch(userSuccess(user, role));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(logout());
        dispatch(userFail());
      });
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};
