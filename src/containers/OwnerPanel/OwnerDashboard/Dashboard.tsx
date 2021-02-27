import React from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import AppBar from "../../../components/UI/Layout/AppBar/AppBar";
import AppContent from "../../../components/UI/Layout/AppContent/AppContent";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import StoreDispatch from "../../../shared/types/store/StoreDispatch";
import AuthData from "../../../shared/types/auth/AuthData";

import "./Dashboard.scss";

interface BashboardProps {
  logout: (authData: AuthData) => void;
}

const Dashboard: React.FC<BashboardProps> = (props) => {
  return (
    <Aux>
      <AppBar />
      <AppContent>Owner Dashboard</AppContent>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
