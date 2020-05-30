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
export { getStoregeEmployeesList } from "./employee/employeeAction";
export { getStoregeItemsList } from "./item/itemAction";
export {
  getStoregeList,
  getStorege,
  editStorege,
} from "./storage/storageAction";
export { getUserDetails } from "./user/userAction";
