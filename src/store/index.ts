import StoreDispatch from "../shared/types/store/StoreDispatch";
import { authLogout } from "./auth/auth.action";
import { userLogout } from "./user/user.action";

export const logout = () => (dispatch: StoreDispatch) => {
  dispatch(userLogout());
  dispatch(authLogout());
};

export {
  getStorageActionsList,
  removeAction,
  storeAction,
} from "./action/action.action";

export { auth, authCheck, authLogout } from "./auth/auth.action";

export {
  employeeStoreClear,
  getEmployeesList,
  getStorageEmployeesList,
  getEmployee,
  setEmployee,
} from "./employee/employee.action";

export { getStorageItemViewList, getStorageItemList } from "./item/item.action";

export { getProductsList } from "./product/product.action";

export { getStorageStatistics } from "./statistic/statistic.action";

export {
  clearStorageStore,
  setStorage,
  getStorageList,
  getStorage,
} from "./storage/storage.action";

export { getUserDetails } from "./user/user.action";
