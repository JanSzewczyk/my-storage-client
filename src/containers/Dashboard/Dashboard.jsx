import React from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import AppBar from "../../components/UI/AppBar/AppBar";
import AppContent from "../../components/UI/AppContent/AppContent";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const Dashboard = (props) => {
  return (
    <Aux>
      {/* <Button clicked={() => props.logout()}>lodout</Button> */}

      <AppBar />
      <AppContent>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          elooo kiniu wunszuuuu !!!!!!!!!!!
        </div>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          sdfasdf sdf as adsa dfsa sdf a
          <br />
          fgsdfgsdf
        </div>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          sdfasdf
        </div>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          sdfasdf
        </div>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          sdfasdf
        </div>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          sdfasdf
        </div>
        <div
          style={{
            margin: "0",
            background: "#242424",
            marginRight: "8px",
            width: "20%",
          }}
        >
          sdfasdf
        </div>
      </AppContent>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (authData) => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
