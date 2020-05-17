import { authLogout } from "./auth/authAction";
import { userLogout } from "./user/userAction";

export const logout = () => {
  return (dispatch) => {
    dispatch(userLogout());
    dispatch(authLogout());
  };
};

export { auth, authCheck, authLogout } from "./auth/authAction";
export { getStoregeList } from "./storage/storageAction";
export { getUserDetails } from "./user/userAction";
