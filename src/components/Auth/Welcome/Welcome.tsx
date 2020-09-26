import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import StoreDispatch from "../../../shared/types/store/StoreDispatch";

import Loading from "../../UI/Loading/Loading";

import "./Welcome.scss";

interface WelcomeProps {
  onGetUserDetails: () => void;
}

const Welcome: React.FC<WelcomeProps> = (props) => {
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

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetUserDetails: () => dispatch(action.getUserDetails()),
  };
};

export default connect(null, mapDispatchToProps)(Welcome);
