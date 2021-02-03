import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  EmployeeActionTypes,
  EmployeeLoadFailureAction,
  EmployeeLoadStartAction,
  EmployeeLoadSuccessAction,
  EmployeeStoreState,
  EmployeeViewListLoadFailureAction,
  EmployeeViewListLoadStartAction,
  EmployeeViewListLoadSuccessAction,
  InitEmployeeStoreAction,
  SetEmployeeAction,
} from "./types";

const initialState: EmployeeStoreState = {
  employeeViewList: [],
  pageInfo: null,
  employeeViewListLoading: true,

  employee: null,
  employeeLoading: true,
};

const initEmployeeStore = (
  state: EmployeeStoreState,
  action: InitEmployeeStoreAction
): EmployeeStoreState => {
  return initialState;
};

const employeeListLoadStart = (
  state: EmployeeStoreState,
  action: EmployeeViewListLoadStartAction
): EmployeeStoreState => {
  return updateObject(state, {
    employeeViewList: [],
    pageInfo: null,
    employeeViewListLoading: true,
  });
};

const employeeListLoadSuccess = (
  state: EmployeeStoreState,
  action: EmployeeViewListLoadSuccessAction
): EmployeeStoreState => {
  return updateObject(state, {
    employeeViewList: action.employeeList,
    pageInfo: action.pageInfo,
    employeeViewListLoading: false,
  });
};

const employeeListLoadFailure = (
  state: EmployeeStoreState,
  action: EmployeeViewListLoadFailureAction
): EmployeeStoreState => {
  return updateObject(state, {
    employeeViewListLoading: false,
  });
};

const setEmployee = (
  state: EmployeeStoreState,
  action: SetEmployeeAction
): EmployeeStoreState => {
  return updateObject(state, {
    employee: action.employee,
  });
};

const employeeLoadStart = (
  state: EmployeeStoreState,
  action: EmployeeLoadStartAction
): EmployeeStoreState => {
  return updateObject(state, {
    employee: null,
    employeeLoading: true,
  });
};

const employeeLoadSuccess = (
  state: EmployeeStoreState,
  action: EmployeeLoadSuccessAction
): EmployeeStoreState => {
  return updateObject(state, {
    employee: action.employee,
    employeeLoading: false,
  });
};

const employeeLoadFailure = (
  state: EmployeeStoreState,
  action: EmployeeLoadFailureAction
): EmployeeStoreState => {
  return updateObject(state, {
    employeeLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: EmployeeActionTypes
): EmployeeStoreState => {
  switch (action.type) {
    case actionTypes.INIT_EMPLOYEE_STORE:
      return initEmployeeStore(state, action);

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
