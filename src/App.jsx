import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "./store";

import Auth from "./containers/Auth/Auth";
import Dashboard from "./containers/OwnerPanel/Dashboard/Dashboard";
import AppLayout from "./hoc/AppLayout/AppLayout";
import Storages from "./containers/OwnerPanel/Storages/Storages";
import Storage from "./containers/OwnerPanel/Storage/Storage";
import Logout from "./containers/Auth/Logout/Logout";
import EmployeePanel from "./containers/EmployeePanel/EmployeePanel";
import EmployeeDashboard from "./containers/EmployeeDashboard/EmployeeDashboard";
import { USER_ROLES } from "./shared/constants";

import withNotificationProvider from "./hoc/withNotificationProvider";
import StorageEmployee from "./containers/OwnerPanel/StorageEmployee/StorageEmployee";
import Employee from "./containers/OwnerPanel/Employee/Employee";

const App = (props) => {
  const { authenticated, onAuthCheck, userRole } = props;

  useEffect(() => {
    onAuthCheck();
  }, [onAuthCheck]);

  return !authenticated ? (
    <Switch>
      <Route path={"/"} component={Auth} />
      <Redirect to={"/"} />
    </Switch>
  ) : (
    <AppLayout>
      {userRole === USER_ROLES.OWNER && (
        <Switch>
          <Route
            path={"/storages/:storageId/employee/:employeeId"}
            component={StorageEmployee}
          />
          <Route path={"/storages/:storageId"} component={Storage} />
          <Route path={"/storages"} component={Storages} />
          <Route path={"/employees/:employeeId"} component={Employee} />
          <Route path={"/employees"} component={EmployeePanel} />
          <Route path={"/logout"} component={Logout} />
          <Route exact path={"/"} component={Dashboard} />
          <Redirect to={"/"} />
        </Switch>
      )}
      {userRole === USER_ROLES.EMPLOYEE && (
        <Switch>
          <Route path={"/logout"} component={Logout} />
          <Route exact path={"/"} component={EmployeeDashboard} />
        </Switch>
      )}
    </AppLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated:
      state.auth.accessToken !== null && state.user.user && state.user.role,
    userRole: state.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: (authData) => dispatch(action.authCheck()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNotificationProvider(App));
