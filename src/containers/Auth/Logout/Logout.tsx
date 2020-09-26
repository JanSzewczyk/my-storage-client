import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "../../../store";
import StoreDispatch from "../../../shared/types/store/StoreDispatch";

interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = (props) => {
  const { onLogout } = props;

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
