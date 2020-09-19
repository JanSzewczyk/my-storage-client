import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  employeeList: [],
  pageInfo: null,
  employeeListLoading: true,
  employee: null,
  employeeLoading: true,
};

const employeeStoreClear = (state, action) => {
  return updateObject(state, initialState);
};

const setEmployee = (state, action) => {
  return updateObject(state, {
    employee: action.employee,
  });
};

const employeeListLoadStart = (state, action) => {
  return updateObject(state, {
    employeeList: [],
    pageInfo: null,
    employeeListLoading: true,
  });
};

const employeeListLoadSuccess = (state, action) => {
  return updateObject(state, {
    employeeList: action.employeeList,
    pageInfo: action.pageInfo,
    employeeListLoading: false,
  });
};

const employeeListLoadFail = (state, action) => {
  return updateObject(state, {
    employeeListLoading: false,
  });
};

const employeeStorageListLoadStart = (state, action) => {
  return updateObject(state, {
    employeeList: [],
    pageInfo: null,
    employeeListLoading: true,
  });
};

const employeeStorageListLoadSuccess = (state, action) => {
  return updateObject(state, {
    employeeList: action.employeeList,
    pageInfo: action.pageInfo,
    employeeListLoading: false,
  });
};

const employeeStorageListLoadFail = (state, action) => {
  return updateObject(state, {
    employeeListLoading: false,
  });
};

// GET EMPLOYEE
const employeeLoadStart = (state, action) => {
  return updateObject(state, {
    employee: null,
    employeeLoading: true,
  });
};

const employeeLoadSuccess = (state, action) => {
  return updateObject(state, {
    employee: action.employee,
    employeeLoading: false,
  });
};

const employeeLoadFail = (state, action) => {
  return updateObject(state, {
    employeeLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_STORE_CLEAR:
      return employeeStoreClear(state, action);
    case actionTypes.EMPLOYEE_SET_EMPLOYEE:
      return setEmployee(state, action);

    case actionTypes.EMPLOYEE_LIST_LOAD_START:
      return employeeListLoadStart(state, action);
    case actionTypes.EMPLOYEE_LIST_LOAD_SUCCESS:
      return employeeListLoadSuccess(state, action);
    case actionTypes.EMPLOYEE_LIST_LOAD_FAIL:
      return employeeListLoadFail(state, action);

    case actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_START:
      return employeeStorageListLoadStart(state, action);
    case actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_SUCCESS:
      return employeeStorageListLoadSuccess(state, action);
    case actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_FAIL:
      return employeeStorageListLoadFail(state, action);

    case actionTypes.EMPLOYEE_LOAD_START:
      return employeeLoadStart(state, action);
    case actionTypes.EMPLOYEE_LOAD_SUCCESS:
      return employeeLoadSuccess(state, action);
    case actionTypes.EMPLOYEE_LOAD_FAIL:
      return employeeLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
