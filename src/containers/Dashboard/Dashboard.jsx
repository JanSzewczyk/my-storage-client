import React from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import Button from "../../components/UI/Button/Button";

const Dashboard = (props) => {
  return (
    <div>
      <Button clicked={() => props.logout()}>lodout</Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (authData) => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
