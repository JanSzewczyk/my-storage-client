import React from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import Button from "../../components/UI/Button/Button";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const Dashboard = (props) => {
  return (
    <Aux>
      <Button clicked={() => props.logout()}>lodout</Button>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>{" "}
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      v
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      v
      <div
        style={{
          height: "400px",
          marginTop: "16px",
        }}
      >
        eloo
      </div>
      działa w chujjjjjjj
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (authData) => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
