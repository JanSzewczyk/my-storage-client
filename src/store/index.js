import { authLogout } from "./auth/authAction";
import { userLogout } from "./user/userAction";

export const logout = () => {
  return (dispatch) => {
    dispatch(userLogout());
    dispatch(authLogout());
  };
};

export { getStoregeActionsList } from "./action/actionAction";
export { auth, authCheck, authLogout } from "./auth/authAction";
export {
  getEmployeesList,
  getStoregeEmployeesList,
  createEmployee,
} from "./employee/employeeAction";
export { getStoregeItemsList } from "./item/itemAction";
export { getStorageStatistics } from "./statistic/statisticAction";
export {
  getStoregeList,
  getStorege,
  editStorege,
  createStorege,
  removeStorege,
} from "./storage/storageAction";
export { getUserDetails } from "./user/userAction";
