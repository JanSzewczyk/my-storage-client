import axios from "../../shared/config/axios";
import { logout } from "..";
import * as actionTypes from "../actionTypes";
import {
  UserLoadFailureAction,
  UserLoadStartAction,
  UserLoadSuccessAction,
  UserLogoutAction,
} from "./types";
import { UserRole } from "../../shared/constants";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import { AxiosResponse } from "axios";
import UserDetails from "../../shared/types/apiResponse/UserDetails";
import UserDto from "../../shared/types/user/UserDto";
import { mapEmployeeDtoToEmployee } from "../../shared/data-utils/employeeUtils";
import EmployeeDto from "../../shared/types/employee/EmployeeDto";
import OwnerDto from "../../shared/types/owner/OwnerDto";
import { mapOwnerDtoToOwner } from "../../shared/data-utils/ownerUtils";

export const userLoadStart = (): UserLoadStartAction => {
  return {
    type: actionTypes.USER_LOAD_START,
  };
};

export const userLoadSuccess = (
  userDto: UserDto,
  role: UserRole
): UserLoadSuccessAction => {
  return {
    type: actionTypes.USER_LOAD_SUCCESS,
    user:
      role === UserRole.EMPLOYEE
        ? mapEmployeeDtoToEmployee(userDto as EmployeeDto)
        : mapOwnerDtoToOwner(userDto as OwnerDto),
    role: role,
  };
};

export const userLoadFailure = (): UserLoadFailureAction => {
  return {
    type: actionTypes.USER_LOAD_FAILURE,
  };
};

export const getUserDetails = (): any => (dispatch: StoreDispatch): any => {
  dispatch(userLoadStart());

  return axios
    .get("users/details")
    .then((res: AxiosResponse<any>) => {
      const { user, role } = res.data;

      dispatch(userLoadSuccess(user, role));
    })
    .catch((err) => {
      dispatch(logout());
      dispatch(userLoadFailure());
    });
};

export const userLogout = (): UserLogoutAction => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};
