import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "./store";

import Auth from "./containers/Auth/Auth";
import Dashboard from "./containers/OwnerPanel/OwnerDashboard/Dashboard";
import AppLayout from "./hoc/AppLayout/AppLayout";
import Storages from "./containers/OwnerPanel/Storages/Storages";
import Storage from "./containers/OwnerPanel/StoragePage/StoragePage";
import Logout from "./containers/Auth/Logout/Logout";
import Employees from "./containers/OwnerPanel/Employees/Employees";
import EmployeeDashboard from "./containers/EmployeeDashboard/EmployeeDashboard";
import { UserRole } from "./shared/constants";

import withNotificationProvider from "./hoc/withNotificationProvider";
import Employee from "./containers/OwnerPanel/Employee/EmployeePage";
import StoreDispatch from "./shared/types/store/StoreDispatch";
import StoreState from "./shared/types/store/StoreState";

interface AppProps {
  authenticated: boolean;
  userRole: keyof typeof UserRole | null;
  onAuthCheck: () => void;
}

const App: React.FC<AppProps> = (props) => {
  const { authenticated, onAuthCheck, userRole } = props;

  useEffect(() => {
    onAuthCheck();
  }, [onAuthCheck]);


  return !authenticated ? (
    <Switch>
      <Route path={"/test"} component={Dashboard} />
      <Route path={"/"} component={Auth} />
      <Redirect to={"/"} />
    </Switch>
  ) : (
    <AppLayout>
      {userRole && userRole === UserRole.OWNER && (
        <Switch>
          <Route
            path={"/storages/:storageId/employee/:employeeId"}
            component={Employee}
          />
          <Route path={"/storages/:storageId"} component={Storage} />
          <Route path={"/storages"} component={Storages} />
          <Route path={"/employees/:employeeId"} component={Employee} />
          <Route path={"/employees"} component={Employees} />
          <Route path={"/logout"} component={Logout} />
          <Route exact path={"/"} component={Dashboard} />
          <Redirect to={"/"} />
        </Switch>
      )}
      {userRole && userRole === UserRole.EMPLOYEE && (
        <Switch>
          <Route path={"/logout"} component={Logout} />
          <Route exact path={"/"} component={EmployeeDashboard} />
        </Switch>
      )}
    </AppLayout>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    authenticated:
      state.authStore.accessToken !== null &&
      state.userStore.user !== null &&
      state.userStore.role !== null,
    userRole: state.userStore.role
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onAuthCheck: () => dispatch(action.authCheck())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNotificationProvider<AppProps>(App));
