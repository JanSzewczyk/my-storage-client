import axios, {
  setBasicToken,
  setBearerToken,
} from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import Cookies from "js-cookie";
import {
  AuthFailureAction,
  AuthLogoutAction,
  AuthStartAction,
  AuthSuccessAction,
} from "./types";
import AuthData from "../../shared/types/auth/AuthData";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import { AxiosResponse } from "axios";
import AuthResponseData from "../../shared/types/apiResponse/AuthResponseData";

const BASIC_TOKEN: string =
  "bXlzdG9yYWdlaWQ6MkpnWlJjc0FQdzBkYVlvZDk3S2FoRzZiWENsaHFHSDU=";

export const authStart = (): AuthStartAction => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (
  accessToken: string,
  refreshToken: string
): AuthSuccessAction => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const authFailure = (error: string | null): AuthFailureAction => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error,
  };
};

export const auth = (authData: AuthData): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(authStart());
  setBasicToken(BASIC_TOKEN);

  return axios
    .post(
      `oauth/token?grant_type=password&username=${authData.email}&password=${authData.password}`,
      {}
    )
    .then((res: AxiosResponse<AuthResponseData>) => {
      const { expires_in, access_token, refresh_token } = res.data;
      setBearerToken(access_token);

      const expirationDate = new Date(new Date().getTime() + expires_in * 1000);

      Cookies.set("access_token", access_token);
      Cookies.set("expiration_date", expirationDate);
      Cookies.set("refresh_token", refresh_token);

      dispatch(authSuccess(access_token, refresh_token));
      dispatch(checkAuthTimeout(expires_in, refresh_token));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(authFailure("Invalid email or password."));
      } else {
        dispatch(authFailure(null));
      }
    });
};

export const authCheck = (): any => (dispatch: StoreDispatch): any => {
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

export const checkAuthTimeout = (
  expirationTime: number,
  refreshToken: string
): any => (dispatch: StoreDispatch) => {
  setTimeout(() => {
    dispatch(refreshAuth(refreshToken));
  }, expirationTime * 1000);
};

export const authLogout = (): AuthLogoutAction => {
  Cookies.remove("access_token");
  Cookies.remove("expiration_date");
  Cookies.remove("refresh_token");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const refreshAuth = (refreshToken: string): any => (
  dispatch: StoreDispatch
): any => {
  setBasicToken(BASIC_TOKEN);

  return axios
    .post(
      `oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}&undefined`,
      {}
    )
    .then((res: AxiosResponse<AuthResponseData>) => {
      const { expires_in, access_token, refresh_token } = res.data;
      setBearerToken(access_token);

      const expirationDate = new Date(new Date().getTime() + expires_in * 1000);

      Cookies.set("access_token", access_token);
      Cookies.set("expiration_date", expirationDate);
      Cookies.set("refresh_token", refresh_token);

      dispatch(authSuccess(access_token, refresh_token));
      dispatch(checkAuthTimeout(expires_in, refresh_token));
    })
    .catch((err) => {
      dispatch(authLogout());
    });
};
