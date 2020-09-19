import React, { useMemo } from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import Welcome from "../../components/Auth/Welcome/Welcome";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import "./Auth.scss";

const Auth = (props) => {
  const { authLoading, error, onAuth, authenticated } = props;

  const authForm = useMemo(
    () => (
      <AuthForm loading={authLoading} onAuthSubmit={onAuth} error={error} />
    ),
    [authLoading, error, onAuth]
  );

  return (
    <div className={"auth"}>{!authenticated ? authForm : <Welcome />}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    authLoading: state.authStore.authLoading,
    error: state.authStore.error,
    authenticated: Boolean(state.authStore.accessToken),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (authData) => dispatch(action.auth(authData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, [401, 400]));
