import axios, { setBasicToken, setBearerToken } from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import Cookies from "js-cookie";
import { error } from "../../components/UI/Notification";

const BASIC_TOKEN =
  "bXlzdG9yYWdlaWQ6MkpnWlJjc0FQdzBkYVlvZDk3S2FoRzZiWENsaHFHSDU=";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (accessToken, refreshToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (authData) => {
  return (dispatch) => {
    dispatch(authStart());
    setBasicToken(BASIC_TOKEN);

    axios
      .post(
        `oauth/token?grant_type=password&username=${authData.email}&password=${authData.password}`,
        {}
      )
      .then((res) => {
        const { expires_in, access_token, refresh_token } = res.data;
        setBearerToken(access_token);

        const expirationDate = new Date(
          new Date().getTime() + expires_in * 1000
        );

        Cookies.set("access_token", access_token);
        Cookies.set("expiration_date", expirationDate);
        Cookies.set("refresh_token", refresh_token);

        dispatch(authSuccess(access_token, refresh_token));
        dispatch(checkAuthTimeout(expires_in, refresh_token));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail("Invalid email or password."));
        } else {
          dispatch(authFail(null));
          error("Server error");
        }
      });
  };
};

export const authCheck = () => {
  return (dispatch) => {
    const access_token = Cookies.get("access_token");
    const expiration_date = Cookies.get("expiration_date");
    const refresh_token = Cookies.get("refresh_token");

    if (
      access_token &&
      expiration_date &&
      refresh_token &&
      new Date(expiration_date) > new Date()
    ) {
      setBearerToken(access_token);
      dispatch(authSuccess(access_token, refresh_token));
      dispatch(
        checkAuthTimeout(
          (new Date(expiration_date).getTime() - new Date().getTime()) / 1000,
          refresh_token
        )
      );
    } else {
      dispatch(authLogout());
    }
  };
};

export const checkAuthTimeout = (expirationTime, refreshToken) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(refreshAuth(refreshToken));
    }, expirationTime * 1000);
  };
};

export const authLogout = () => {
  Cookies.remove("access_token");
  Cookies.remove("expiration_date");
  Cookies.remove("refresh_token");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const refreshAuth = (refreshToken) => {
  return (dispatch) => {
    setBasicToken(BASIC_TOKEN);

    axios
      .post(
        `oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}&undefined`,
        {}
      )
      .then((res) => {
        const { expires_in, access_token, refresh_token } = res.data;
        setBearerToken(access_token);

        const expirationDate = new Date(
          new Date().getTime() + expires_in * 1000
        );

        Cookies.set("access_token", access_token);
        Cookies.set("expiration_date", expirationDate);
        Cookies.set("refresh_token", refresh_token);

        dispatch(authSuccess(access_token, refresh_token));
        dispatch(checkAuthTimeout(expires_in, refresh_token));
      })
      .catch((err) => {
        dispatch(authLogout());
        error(err.response ? err.response.data.message : "Server error");
      });
  };
};
