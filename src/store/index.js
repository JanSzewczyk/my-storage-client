import { authLogout } from "./auth/authAction";
import { userLogout } from "./user/userAction";

export const logout = () => {
  return (dispatch) => {
    dispatch(userLogout());
    dispatch(authLogout());
  };
};

export { auth, authCheck, authLogout } from "./auth/authAction";

export { getUserDetails } from "./user/userAction";
