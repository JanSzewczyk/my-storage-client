import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  employeeList: [],
  pageInfo: null,
  employeeListLoading: true,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_START:
      return employeeStorageListLoadStart(state, action);
    case actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_SUCCESS:
      return employeeStorageListLoadSuccess(state, action);
    case actionTypes.EMPLOYEE_STORAGE_LIST_LOAD_FAIL:
      return employeeStorageListLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
