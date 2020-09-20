import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { createSearchQuery } from "../../shared/utils/utility";
import {
  mapEmployeeDtoToEmployee,
  mapEmployeeViewDtoToEmployeeView,
} from "../../shared/data-utils/employeeUtils";
import { FixMeLater } from "../../shared/types/common/FixMeLater";
import PageInfo from "../../shared/types/common/PageInfo";
import {
  EmployeeLoadFailureAction,
  EmployeeLoadStartAction,
  EmployeeLoadSuccessAction,
  EmployeeStoreClearAction,
  EmployeeViewListLoadFailureAction,
  EmployeeViewListLoadStartAction,
  EmployeeViewListLoadSuccessAction,
  SetEmployeeAction,
} from "./types";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import { AxiosResponse } from "axios";
import PagedModel from "../../shared/types/apiResponse/PagedModel";
import EmployeeDto from "../../shared/types/employee/EmployeeDto";
import EmployeeViewDto from "../../shared/types/employee/EmployeeViewDto";
import Query from "../../shared/types/query/Query";
import SearchQuery from "../../shared/types/query/SearchQuery";

export const employeeStoreClear = (): EmployeeStoreClearAction => {
  return {
    type: actionTypes.EMPLOYEE_STORE_CLEAR,
  };
};

export const employeeViewListLoadStart = (): EmployeeViewListLoadStartAction => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_START,
  };
};

export const employeeViewListLoadSuccess = (
  employeeViewDtoList: EmployeeViewDto[],
  pageInfo: PageInfo
): EmployeeViewListLoadSuccessAction => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_SUCCESS,
    employeeList: employeeViewDtoList.map(mapEmployeeViewDtoToEmployeeView),
    pageInfo: pageInfo,
  };
};

export const employeeViewListLoadFailure = (): EmployeeViewListLoadFailureAction => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_FAILURE,
  };
};

export const getEmployeesList = (queryData: SearchQuery): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(employeeViewListLoadStart());

  const query: string = createSearchQuery(queryData);

  return axios
    .get(`employees${query}`)
    .then((res: AxiosResponse<PagedModel<EmployeeViewDto[]>>) => {
      dispatch(employeeViewListLoadSuccess(res.data.content, res.data.page));
    })
    .catch((err) => {
      dispatch(employeeViewListLoadFailure());
    });
};

export const getStorageEmployeesList = (
  storageId: string,
  queryData: Query
): any => (dispatch: StoreDispatch): any => {
  dispatch(employeeViewListLoadStart());

  const query: string = createSearchQuery(queryData);

  return axios
    .get(`employees/storage/${storageId}${query}`)
    .then((res: AxiosResponse<PagedModel<EmployeeViewDto[]>>) => {
      dispatch(employeeViewListLoadSuccess(res.data.content, res.data.page));
    })
    .catch((err) => {
      dispatch(employeeViewListLoadFailure());
    });
};

export const setEmployee = (employee: FixMeLater): SetEmployeeAction => {
  return {
    type: actionTypes.EMPLOYEE_SET_EMPLOYEE,
    employee: employee,
  };
};

export const employeeLoadStart = (): EmployeeLoadStartAction => {
  return {
    type: actionTypes.EMPLOYEE_LOAD_START,
  };
};

export const employeeLoadSuccess = (
  employeeDto: EmployeeDto
): EmployeeLoadSuccessAction => {
  return {
    type: actionTypes.EMPLOYEE_LOAD_SUCCESS,
    employee: mapEmployeeDtoToEmployee(employeeDto),
  };
};

export const employeeLoadFailure = (): EmployeeLoadFailureAction => {
  return {
    type: actionTypes.EMPLOYEE_LOAD_FAILURE,
  };
};

export const getEmployee = (employeeId: string): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(employeeLoadStart());

  return axios
    .get(`employees/${employeeId}`)
    .then((res: AxiosResponse<EmployeeDto>) => {
      dispatch(employeeLoadSuccess(res.data));
    })
    .catch((err) => {
      dispatch(employeeLoadFailure());
    });
};
