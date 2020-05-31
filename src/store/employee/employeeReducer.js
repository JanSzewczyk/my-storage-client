import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  employeeList: [],
  pageInfo: null,
  employeeListLoading: true,
  employeeActionLoading: false,
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

const employeeCreateStart = (state, action) => {
  return updateObject(state, {
    employeeActionLoading: true,
  });
};

const employeeCreateSuccess = (state, action) => {
  return updateObject(state, {
    employeeActionLoading: false,
  });
};

const employeeCreateFail = (state, action) => {
  return updateObject(state, {
    employeeActionLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    case actionTypes.EMPLOYEE_CREATE_START:
      return employeeCreateStart(state, action);
    case actionTypes.EMPLOYEE_CREATE_SUCCESS:
      return employeeCreateSuccess(state, action);
    case actionTypes.EMPLOYEE_CREATE_FAIL:
      return employeeCreateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
