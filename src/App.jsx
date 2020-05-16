import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "./store";

import Auth from "./containers/Auth/Auth";

const App = (props) => {
  const { isAuth, onAuthCheck } = props;

  useEffect(() => {
    onAuthCheck();
  }, [onAuthCheck]);

  return true ? (
    <Switch>
      <Route path={"/"} component={Auth} />
      <Redirect to={"/"} />
    </Switch>
  ) : (
    <Switch>
      <Route path={"/"}>fdasdfasd </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.accessToken === null, // authenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: (authData) => dispatch(action.authCheck()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
