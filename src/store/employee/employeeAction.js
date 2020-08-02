import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { createSearchQuery, updateObject } from "../../shared/utils/utility";
import browserHistory from "../../shared/config/history";

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
        // error(err.response ? err.response.data.message : "Server error");
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
        // error(err.response ? err.response.data.message : "Server error");
        dispatch(employeeStorageListLoadFail());
      });
  };
};

export const employeeEditStart = () => {
  return {
    type: actionTypes.EMPLOYEE_EDIT_START,
  };
};

export const employeeEditSuccess = () => {
  return {
    type: actionTypes.EMPLOYEE_EDIT_SUCCESS,
  };
};

export const employeeEditFail = () => {
  return {
    type: actionTypes.EMPLOYEE_EDIT_FAIL,
  };
};

export const editEmployee = (employeeId, updatedEmployee) => {
  return (dispatch) => {
    dispatch(employeeEditStart());
    axios
      .put(`employees/${employeeId}`, updatedEmployee)
      .then((res) => {
        // const newEmployee = res.data;
        // success(/
          // `The employee ${newEmployee.firstName} ${newEmployee.lastName} has been updated`
        // );
        dispatch(employeeEditSuccess());
        browserHistory.push("/");
        browserHistory.push("/employees");
      })
      .catch((err) => {
        dispatch(employeeEditFail());
      });
  };
};

export const employeeCreateStart = () => {
  return {
    type: actionTypes.EMPLOYEE_CREATE_START,
  };
};

export const employeeCreateSuccess = () => {
  return {
    type: actionTypes.EMPLOYEE_CREATE_SUCCESS,
  };
};

export const employeeCreateFail = () => {
  return {
    type: actionTypes.EMPLOYEE_CREATE_FAIL,
  };
};

export const createEmployee = (employee) => {
  return (dispatch) => {
    dispatch(employeeCreateStart());
    axios
      .post(`employees`, employee)
      .then((res) => {
        // const newEmployee = res.data;
        // success(
        //   `The employee ${newEmployee.firstName} ${newEmployee.lastName} has been created`
        // );
        dispatch(employeeCreateSuccess());
        browserHistory.push("/");
        browserHistory.push("/employees");
      })
      .catch((err) => {
        // error(err.response ? err.response.data.message : "Server error");
        dispatch(employeeCreateFail());
      });
  };
};

// export const employeeRemoveStart = () => {
//   return {
//     type: actionTypes.STORAGE_REMOVE_START,
//   };
// };

// export const employeeRemoveSuccess = () => {
//   return {
//     type: actionTypes.STORAGE_REMOVE_SUCCESS,
//   };
// };

// export const employeeRemoveFail = () => {
//   return {
//     type: actionTypes.STORAGE_REMOVE_FAIL,
//   };
// };

export const removeEmployee = (employeeId) => {
  return (dispatch) => {
    axios
      .delete(`employees/${employeeId}`)
      .then((res) => {
        // success(
        //   `The ${res.data.firstName} ${res.data.lastName} has been removed`
        // );
        dispatch(
          getEmployeesList({
            sort: [],
            page: 0,
            size: 20,
          })
        );
      })
      .catch((err) => {
        // error(err.response ? err.response.data.message : "Server error");
      });
  };
};
