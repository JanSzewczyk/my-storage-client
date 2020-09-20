import StoreDispatch from "../shared/types/store/StoreDispatch";
import { authLogout } from "./auth/auth.action";
import { userLogout } from "./user/userAction";

export const logout = () => (dispatch: StoreDispatch) => {
  dispatch(userLogout());
  dispatch(authLogout());
};

export {
  getStorageActionsList,
  removeAction,
  storeAction,
} from "./action/actionAction";

export { auth, authCheck, authLogout } from "./auth/auth.action";

export {
  employeeStoreClear,
  getEmployeesList,
  getStorageEmployeesList,
  getEmployee,
  setEmployee,
} from "./employee/employee.action";

export {
  getStorageItemsList,
  getStorageItemsEmployee,
} from "./item/itemAction";

export { getProductsList } from "./product/productAction";

export { getStorageStatistics } from "./statistic/statisticAction";

export {
  clearStorageStore,
  setStorage,
  getStorageList,
  getStorage,
} from "./storage/storageAction";

export { getUserDetails } from "./user/userAction";
