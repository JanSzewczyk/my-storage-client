import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error, success } from "../../components/UI/Notification";
import { createSearchQuery, updateObject } from "../../shared/utils/utility";

const processEmployeeList = (employees) =>
  employees.map((employee) =>
    updateObject(employee, {
      createdAt: new Date(employee.createdAt),
      updatedAt: new Date(employee.updatedAt),
    })
  );

export const employeeListLoadStart = () => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_START,
  };
};

export const employeeListLoadSuccess = (employees, pageInfo) => {
  return {
    type: actionTypes.EMPLOYEE_LIST_LOAD_SUCCESS,
    employeeList: processEmployeeList(employees),
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
        error(err.response ? err.response.data.message : "Server error");
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
    employeeList: processEmployeeList(employees),
    pageInfo: pageInfo,
  };
};

export const employeeStorageListLoadFail = () => {
  return {
    type: actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_FAIL,
  };
};

export const getStoregeEmployeesList = (storageId, queryData) => {
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
        error(err.response ? err.response.data.message : "Server error");
        dispatch(employeeStorageListLoadFail());
      });
  };
};
