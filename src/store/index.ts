import StoreDispatch from "../shared/types/store/StoreDispatch";
import { authLogout } from "./auth/auth.action";
import { userLogout } from "./user/user.action";

export const logout = (): any => (dispatch: StoreDispatch) => {
  dispatch(userLogout());
  dispatch(authLogout());
};

export {
  initActionStore,
  getStorageActionList,
  getEmployeeActionList,
  removeAction,
  storeAction,
} from "./action/action.action";

export { auth, authCheck, authLogout } from "./auth/auth.action";

export {
  initEmployeeStore,
  getEmployeesList,
  getStorageEmployeesList,
  getEmployee,
  setEmployee,
} from "./employee/employee.action";

export {
  initItemStore,
  getStorageItemViewList,
  getStorageItemList,
} from "./item/item.action";

export { getProductsList } from "./product/product.action";

export {
  initStatisticStore,
  getStorageStatistics,
} from "./statistic/statistic.action";

export {
  initStorageStore,
  setStorage,
  getStorageList,
  getStorage,
} from "./storage/storage.action";

export { getUserDetails } from "./user/user.action";
