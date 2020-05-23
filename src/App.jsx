import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "./store";

import Auth from "./containers/Auth/Auth";
import Dashboard from "./containers/Dashboard/Dashboard";
import AppLayout from "./hoc/AppLayout/AppLayout";
import Storages from "./containers/Storages/Storages";
import Storage from "./containers/Storages/Storage/Storage";
import Logout from "./containers/Auth/Logout/Logout";

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
      <Switch>
        {/* {userRole === "OWNER" && (
          <Aux> */}
        <Route path={"/storages/:storageId"} component={Storage} />
        <Route path={"/storages"} component={Storages} />
        <Route path={"/logout"} component={Logout} />
        <Route exact path={"/"} component={Dashboard} />
        {/* <Redirect to={"/"} /> */}
        {/* </Aux>
        )}
        {/* {userRole === "EMPLOYEE" && (
          <Aux>
            <Route path={"/"} component={Dashboard} />
            <Route path={"/"} component={Dashboard} />
          </Aux>
        )} */}
        {/*  */}
        <Route path={"/"} component={Dashboard} exact /> */}
        {/* <Redirect to={"/"} /> */}
      </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
