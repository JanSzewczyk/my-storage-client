import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../store";

import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import Welcome from "../../components/Auth/Welcome/Welcome";

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

Auth.propTypes = {};

const mapStateToProps = (state) => {
  return {
    authLoading: state.auth.authLoading,
    error: state.auth.error,
    authenticated: Boolean(state.auth.accessToken),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (authData) => dispatch(action.auth(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
