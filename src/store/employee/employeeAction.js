import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error, success } from "../../components/UI/Notification";
import { createSearchQuery, updateObject } from "../../shared/utility";

const processEmployeeList = (employees) =>
  employees.map((employee) =>
    updateObject(employee, {
      createdAt: new Date(employee.createdAt),
      updatedAt: new Date(employee.updatedAt),
    })
  );

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
        console.log(res.data);
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
