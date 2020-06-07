import { authLogout } from "./auth/authAction";
import { userLogout } from "./user/userAction";

export const logout = () => {
  return (dispatch) => {
    dispatch(userLogout());
    dispatch(authLogout());
  };
};

export {
  getStoregeActionsList,
  removeAction,
  storeAction,
} from "./action/actionAction";
export { auth, authCheck, authLogout } from "./auth/authAction";
export {
  getEmployeesList,
  getStoregeEmployeesList,
  createEmployee,
  editEmployee,
  removeEmployee,
} from "./employee/employeeAction";
export {
  getStoregeItemsList,
  getStoregeItemsEmployee,
} from "./item/itemAction";
export { getProductsList } from "./product/productAction";
export { getStorageStatistics } from "./statistic/statisticAction";
export {
  getStoregeList,
  getStorege,
  editStorege,
  createStorege,
  removeStorege,
} from "./storage/storageAction";
export { getUserDetails } from "./user/userAction";
