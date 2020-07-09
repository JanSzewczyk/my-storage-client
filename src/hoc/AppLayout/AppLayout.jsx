import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../store";

import Aux from "../Auxiliary/Auxiliary";
import Header from "../../components/Header/Header";

import "./AppLayout.scss";

const AppLayout = (props) => {
  const { children, user, userRole, onLogout } = props;
  return (
    <Aux>
      <Header user={user} userRole={userRole} onLogout={onLogout} />
      <main className={"app-layout"}>{children}</main>
    </Aux>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    userRole: state.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
