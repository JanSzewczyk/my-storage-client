import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  EmployeeActionTypes,
  EmployeeLoadFailureAction,
  EmployeeLoadStartAction,
  EmployeeLoadSuccessAction,
  EmployeeState,
  EmployeeStoreClearAction,
  EmployeeViewListLoadFailureAction,
  EmployeeViewListLoadStartAction,
  EmployeeViewListLoadSuccessAction,
  SetEmployeeAction,
} from "./types";

const initialState: EmployeeState = {
  employeeViewList: [],
  pageInfo: null,
  employeeViewListLoading: true,
  employee: null,
  employeeLoading: true,
};

const employeeStoreClear = (
  state: EmployeeState,
  action: EmployeeStoreClearAction
): EmployeeState => {
  return updateObject(state, initialState);
};

const employeeListLoadStart = (
  state: EmployeeState,
  action: EmployeeViewListLoadStartAction
): EmployeeState => {
  return updateObject(state, {
    employeeViewList: [],
    pageInfo: null,
    employeeViewListLoading: true,
  });
};

const employeeListLoadSuccess = (
  state: EmployeeState,
  action: EmployeeViewListLoadSuccessAction
): EmployeeState => {
  return updateObject(state, {
    employeeViewList: action.employeeList,
    pageInfo: action.pageInfo,
    employeeViewListLoading: false,
  });
};

const employeeListLoadFailure = (
  state: EmployeeState,
  action: EmployeeViewListLoadFailureAction
): EmployeeState => {
  return updateObject(state, {
    employeeViewListLoading: false,
  });
};

const setEmployee = (
  state: EmployeeState,
  action: SetEmployeeAction
): EmployeeState => {
  return updateObject(state, {
    employee: action.employee,
  });
};

const employeeLoadStart = (
  state: EmployeeState,
  action: EmployeeLoadStartAction
): EmployeeState => {
  return updateObject(state, {
    employee: null,
    employeeLoading: true,
  });
};

const employeeLoadSuccess = (
  state: EmployeeState,
  action: EmployeeLoadSuccessAction
): EmployeeState => {
  return updateObject(state, {
    employee: action.employee,
    employeeLoading: false,
  });
};

const employeeLoadFailure = (
  state: EmployeeState,
  action: EmployeeLoadFailureAction
): EmployeeState => {
  return updateObject(state, {
    employeeLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: EmployeeActionTypes
): EmployeeState => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_STORE_CLEAR:
      return employeeStoreClear(state, action);

    case actionTypes.EMPLOYEE_LIST_LOAD_START:
      return employeeListLoadStart(state, action);
    case actionTypes.EMPLOYEE_LIST_LOAD_SUCCESS:
      return employeeListLoadSuccess(state, action);
    case actionTypes.EMPLOYEE_LIST_LOAD_FAILURE:
      return employeeListLoadFailure(state, action);

    case actionTypes.EMPLOYEE_SET_EMPLOYEE:
      return setEmployee(state, action);
    case actionTypes.EMPLOYEE_LOAD_START:
      return employeeLoadStart(state, action);
    case actionTypes.EMPLOYEE_LOAD_SUCCESS:
      return employeeLoadSuccess(state, action);
    case actionTypes.EMPLOYEE_LOAD_FAILURE:
      return employeeLoadFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
