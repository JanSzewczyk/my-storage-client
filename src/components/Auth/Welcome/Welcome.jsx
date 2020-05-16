import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import Loading from "../../UI/Loading/Loading";

import "./Welcome.scss";

const Welcome = (props) => {
  const { onGetUserDetails } = props;

  useEffect(() => {
    onGetUserDetails();
  }, [onGetUserDetails]);

  return (
    <div className={"welcome"}>
      <Loading />
      <h1>Welcome</h1>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserDetails: () => dispatch(action.getUserDetails()),
  };
};

export default connect(null, mapDispatchToProps)(Welcome);
