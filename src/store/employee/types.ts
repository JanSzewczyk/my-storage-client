import PageInfo from "../../shared/types/common/PageInfo";
import Employee from "../../shared/types/employee/Employee";
import EmployeeView from "../../shared/types/employee/EmployeeView";
import * as actionTypes from "../actionTypes";

export interface EmployeeStoreState {
  employeeViewList: EmployeeView[];
  pageInfo: PageInfo | null;
  employeeViewListLoading: boolean;
  employee: Employee | null;
  employeeLoading: boolean;
}

export interface InitEmployeeStoreAction {
  type: typeof actionTypes.INIT_EMPLOYEE_STORE;
}

export interface EmployeeViewListLoadStartAction {
  type: typeof actionTypes.EMPLOYEE_LIST_LOAD_START;
}

export interface EmployeeViewListLoadSuccessAction {
  type: typeof actionTypes.EMPLOYEE_LIST_LOAD_SUCCESS;
  employeeList: EmployeeView[];
  pageInfo: PageInfo;
}

export interface EmployeeViewListLoadFailureAction {
  type: typeof actionTypes.EMPLOYEE_LIST_LOAD_FAILURE;
}

export interface SetEmployeeAction {
  type: typeof actionTypes.EMPLOYEE_SET_EMPLOYEE;
  employee: Employee;
}

export interface EmployeeLoadStartAction {
  type: typeof actionTypes.EMPLOYEE_LOAD_START;
}

export interface EmployeeLoadSuccessAction {
  type: typeof actionTypes.EMPLOYEE_LOAD_SUCCESS;
  employee: Employee;
}

export interface EmployeeLoadFailureAction {
  type: typeof actionTypes.EMPLOYEE_LOAD_FAILURE;
}

export type EmployeeActionTypes =
  | InitEmployeeStoreAction
  | EmployeeViewListLoadStartAction
  | EmployeeViewListLoadSuccessAction
  | EmployeeViewListLoadFailureAction
  | SetEmployeeAction
  | EmployeeLoadStartAction
  | EmployeeLoadSuccessAction
  | EmployeeLoadFailureAction;
