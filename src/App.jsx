import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "./store";

import Auth from "./containers/Auth/Auth";
import Dashboard from "./containers/Dashboard/Dashboard";

const App = (props) => {
  const { authenticated, onAuthCheck } = props;

  useEffect(() => {
    onAuthCheck();
  }, [onAuthCheck]);

  return !authenticated ? (
    <Switch>
      <Route path={"/"} component={Auth} />
      <Redirect to={"/"} />
    </Switch>
  ) : (
    <Switch>
      <Route path={"/"} component={Dashboard} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated:
      state.auth.accessToken !== null && state.user.user && state.user.role, // authenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: (authData) => dispatch(action.authCheck()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
