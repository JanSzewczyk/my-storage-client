import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { createSearchQuery } from "../../shared/utils/utility";
import {
  mapEmployeeDtoToEmployee,
  mapEmployeeViewDtoToEmployeeView,
} from "../../shared/dataUtils/employeeUtils";

export const employeeStoreClear = () => {
  return {
    type: actionTypes.EMPLOYEE_STORE_CLEAR,
  };
};

export const setEmployee = (employee) => {
  return {
    type: actionTypes.EMPLOYEE_SET_EMPLOYEE,
    employee: employee,
  };
};

export const employeeListLoadStart = () => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_START,
  };
};

export const employeeListLoadSuccess = (employees, pageInfo) => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_SUCCESS,
    employeeList: employees.map(mapEmployeeViewDtoToEmployeeView),
    pageInfo: pageInfo,
  };
};

export const employeeListLoadFail = () => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_FAIL,
  };
};

export const getEmployeesList = (queryData) => {
  return (dispatch) => {
    dispatch(employeeListLoadStart());

    const query = createSearchQuery(queryData);

    axios
      .get(`employees${query}`)
      .then((res) => {
        dispatch(employeeListLoadSuccess(res.data.content, res.data.page));
      })
      .catch((err) => {
        dispatch(employeeListLoadFail());
      });
  };
};

export const employeeStorageListLoadStart = () => {
  return {
    type: actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_START,
  };
};

export const employeeStorageListLoadSuccess = (employees, pageInfo) => {
  return {
    type: actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_SUCCESS,
    employeeList: employees.map((employee) =>
      mapEmployeeViewDtoToEmployeeView(employee)
    ),
    pageInfo: pageInfo,
  };
};

export const employeeStorageListLoadFail = () => {
  return {
    type: actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_FAIL,
  };
};

export const getStorageEmployeesList = (storageId, queryData) => {
  return (dispatch) => {
    dispatch(employeeStorageListLoadStart());

    const query = createSearchQuery(queryData);

    axios
      .get(`employees/storage/${storageId}${query}`)
      .then((res) => {
        dispatch(
          employeeStorageListLoadSuccess(res.data.content, res.data.page)
        );
      })
      .catch((err) => {
        dispatch(employeeStorageListLoadFail());
      });
  };
};

export const employeeLoadStart = () => {
  return {
    type: actionTypes.EMPLOYEE_LOAD_START,
  };
};

export const employeeLoadSuccess = (employeeData) => {
  return {
    type: actionTypes.EMPLOYEE_LOAD_SUCCESS,
    employee: mapEmployeeDtoToEmployee(employeeData),
  };
};

export const employeeLoadFail = () => {
  return {
    type: actionTypes.EMPLOYEE_LOAD_FAIL,
  };
};

export const getEmployee = (employeeId) => {
  return (dispatch) => {
    dispatch(employeeLoadStart());

    axios
      .get(`employees/${employeeId}`)
      .then((res) => {
        dispatch(employeeLoadSuccess(res.data));
      })
      .catch((err) => {
        dispatch(employeeLoadFail());
      });
  };
};
