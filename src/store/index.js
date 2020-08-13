import { authLogout } from "./auth/authAction";
import { userLogout } from "./user/userAction";

export const logout = () => {
  return (dispatch) => {
    dispatch(userLogout());
    dispatch(authLogout());
  };
};

export {
  getStorageActionsList,
  removeAction,
  storeAction,
} from "./action/actionAction";
export { auth, authCheck, authLogout } from "./auth/authAction";
export {
  employeeStoreClear,
  getEmployeesList,
  getStorageEmployeesList,
  createEmployee,
  editEmployee,
  removeEmployee,
  getEmployee,
  setEmployee,
} from "./employee/employeeAction";
export {
  getStorageItemsList,
  getStorageItemsEmployee,
} from "./item/itemAction";
export { getProductsList } from "./product/productAction";
export { getStorageStatistics } from "./statistic/statisticAction";
export {
  getStorageList,
  getStorage,
  editStorage,
  createStorage,
  removeStorage,
} from "./storage/storageAction";
export { getUserDetails } from "./user/userAction";
